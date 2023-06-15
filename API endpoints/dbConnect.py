from flask import Flask, request
import json
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})


@app.route("/create-group", methods=['PUT'])
def create_group():
    data = request.get_json()
    URL = 'https://sko7gkigt1.execute-api.ap-southeast-1.amazonaws.com/prod'
    requests.put(URL, json=data)
    return "Success", 201


@app.route("/get-all-data", methods=['GET'])
def get_all_data():
    URL = 'https://sko7gkigt1.execute-api.ap-southeast-1.amazonaws.com/prod'
    db_data = requests.get(URL).json()
    return db_data


@app.route("/get-data-by-sid", methods=['GET'])
def get_data_by_sid():
    data = request.get_json()
    sid = data['sid']
    URL = 'https://sko7gkigt1.execute-api.ap-southeast-1.amazonaws.com/prod'
    db_data = requests.get(URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    new_arr = []
    for data in all_data_items:
        group_leader = data['group_leader']
        group_leader_s = group_leader['S']
        if group_leader_s == sid:
            new_arr.append(data)

    return new_arr, 201


if __name__ == '__main__':
    CORS(app)
    app.run(debug=True, host='localhost', port=8080)