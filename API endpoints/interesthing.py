import pandas as pd
import numpy as np
from scipy import spatial
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
import boto3
import json

app = Flask(__name__)
CORS(app)

# dynamodb
dynamodb = boto3.resource('dynamodb',
                          aws_access_key_id='AKIAUTHL2FAABMBKCLGV',
                          aws_secret_access_key='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',
                          region_name='ap-southeast-1')

table = dynamodb.Table('InteresThing')
data = table.scan()
res = json.dumps(data)
res = json.loads(res)

group_names = []
for group in res['Items']:
    group_names.append(group['group_name'].lower())
# dynamodb

embeddings_dict = {}
with open("glove.6B.300d.txt", 'r') as f:
    for line in f:
        values = line.split()
        word = values[0]
        vector = np.asarray(values[1:], "float32")
        embeddings_dict[word] = vector

hobbylist = pd.read_csv('hobbylist.csv')
hobbylist['Hobby-name'] = hobbylist['Hobby-name'].str.replace('sports', '')
hobbylist['Hobby-name'] = hobbylist['Hobby-name'].str.lower()

k = list(embeddings_dict.keys())
hobbylistdf2 = hobbylist[hobbylist['Hobby-name'].isin(k)]


@app.route("/")
def recommend():
    hobby = request.args.get("hobby").lower()
    embedding = embeddings_dict[hobby]
    mylst = list(hobbylistdf2['Hobby-name'])
    # remove duplicates from list # only return recommendations that are existing groups
    final = list(set([item for item in mylst if item in group_names]))
    lst = sorted(final,
                 key=lambda word: spatial.distance.euclidean(embeddings_dict[word], embedding))
    print(mylst)
    print(final)
    print(lst)
    return jsonify({'recommendations': lst[:3]})


if __name__ == '__main__':
    app.run(port=2100, debug=True)
