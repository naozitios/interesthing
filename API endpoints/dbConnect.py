from flask import Flask, request
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


if __name__ == '__main__':
    CORS(app)
    app.run(debug=True, host='localhost', port=8080)