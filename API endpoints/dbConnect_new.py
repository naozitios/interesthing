import base64
import io
from flask import Flask, request
import json
import requests
from flask_cors import CORS
import boto3
from botocore.exceptions import NoCredentialsError


app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

GROUP_URL = 'https://sko7gkigt1.execute-api.ap-southeast-1.amazonaws.com/prod'
SESSION_URL = 'https://oay8il00wj.execute-api.ap-southeast-1.amazonaws.com/prod'
s3 = boto3.client(
        "s3",
        aws_access_key_id="AKIAUTHL2FAAGZE5ZR5R",
        aws_secret_access_key="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"
    )


# Group Functions ------------------------------------------------------------------------
@app.route("/create-group", methods=['PUT'])
def create_group():
    '''
    sample json 
    {
        "Item": 
            {
            "Group_id": "cbe79854-0b50-11ee-be56-0242ac121232" - unique | please change,
            "category": "sports",
            "description": "basketball for life",
            "group_leader": "D641038",
            "group_name": "basketball",
            "img_s3_url": "s3.url.com",
            "joined" : "false"
            }
    }
    '''
    data = request.get_json()
    req = requests.put(GROUP_URL, json=data)
    req_data = req.json()
    return json.dumps(req_data)


@app.route("/create-group-w-img", methods=['PUT'])
def create_group_w_img():
    '''
    sample json 
    {
        "Item": 
            {
            "Group_id": "cbe79854-0b50-11ee-be56-0242ac121232" - unique | please change,
            "category": "sports",
            "description": "basketball for life",
            "group_leader": "D641038",
            "group_name": "basketball",
            "img_s3_url": actual image file encoded in base64
            }
    }
    '''
    data = request.get_json()

    #s3 logic
    image = data["img_s3_url"]
    group_name = data['group_name']
    #image is base64 encoded, convert back to file
    image = io.BytesIO(base64.b64decode(image))
    image.filename = group_name + ".jpg"
    bucket_name = "interesthingphotobucket"
    try:
        s3.upload_fileobj(
            image,
            bucket_name,
            image.filename,
            ExtraArgs={"ContentType":  "image/jpeg"}
        )
    except Exception as e:
        return {"errors": str(e)}
    #s3 url 
    data["img_s3_url"] = f"https://{bucket_name}.s3.amazonaws.com/{image.filename}"

    #create group
    requests.put(GROUP_URL, json=data)
    return "Success", 201


@app.route("/get-all-data", methods=['GET'])
def get_all_data():
    db_data = requests.get(GROUP_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    return json.dumps(all_data_items), 201

# Group leader
@app.route("/get-data-by-sid", methods=['POST'])
def get_data_by_sid():
    '''
    sample json
    {
        "sid": "D641038"
    }
    '''
    data = request.get_json()
    sid = data['sid']

    db_data = requests.get(GROUP_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    new_arr = []
    for data in all_data_items:
        group_leader = data['group_leader']
        group_leader_s = group_leader['S']
        if group_leader_s == sid:
            new_arr.append(data)

    return json.dumps(new_arr), 201

# Group ID
@app.route("/get-data-by-group-id", methods=['POST'])
def get_data_by_group_id():
    '''
    sample json
    {
        "id": "664b3179-e424-4cd3-8fce-a248f37972d6"
    }
    '''
    data = request.get_json()
    sid = data['id']

    db_data = requests.get(GROUP_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    new_arr = []
    for data in all_data_items:
        group_id = data['Group_id']
        group_id_s = group_id['S']
        if group_id_s == sid:
            new_arr.append(data)

    return json.dumps(new_arr), 201

@app.route("/get-all-groups-by-group_name", methods=['POST'])
def get_all_groups_by_group_name():
    '''
    sample json
    {
        "group_names": "basketball, soccer, tennis"
    }
    '''
    data = request.get_json()
    #Logic to include ML area
    group_name = data['group_names']
    group_name_arr = group_name.split(',')

    #for each name in arr, trim and lowercase
    for i in range(len(group_name_arr)):
        group_name_arr[i] = group_name_arr[i].strip().lower()


    db_data = requests.get(GROUP_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    new_arr = []
    for data in all_data_items:
        group_name = data['group_name']
        group_name_s = group_name['S']
        if group_name_s.lower() in group_name_arr:
            new_arr.append(data)
    
    return json.dumps(new_arr), 201
    
    
@app.route("/get-all-groups-by-joined", methods=['GET'])
def get_all_groups_by_joined():
    db_data = requests.get(GROUP_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    new_arr = []
    for data in all_data_items:
        join_status = data['joined']
        print(join_status)
        try:
            join_status_s = join_status['BOOL']
            if join_status_s:
                new_arr.append(data)
        except:
            join_status_s = join_status['S']
            if join_status_s == 'true':
                new_arr.append(data)

    return json.dumps(new_arr), 201

@app.route("/update-group-join-status-by-id", methods=['PUT'])
def update_group_join_status_by_sid():
    '''
    sample json
    {
        "id": "brandon-test"
    }
    '''
    data = request.get_json()
    id = data['id']

    db_data = requests.get(GROUP_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    for data in all_data_items:
        group_id = data['Group_id']
        group_id_s = group_id['S']
        if group_id_s == id:
            data['joined'] = 'true'
            data['Group_id'] = data['Group_id']['S']
            data['group_leader'] = data['group_leader']['S']
            data['group_name'] = data['group_name']['S']
            data['img_s3_url'] = data['img_s3_url']['S']
            data['description'] = data['description']['S']
            data['category'] = data['category']['S']
            print(data)
            new_json = {}
            new_json['Item'] = data
            print(new_json)
            requests.put(GROUP_URL, json=new_json)
            return "Success", 201
    return "Failed", 400

@app.route("/leave-group-by-id", methods=['PUT'])
def leave_group_by_id():
    '''
    sample json
    {
        "id": "brandon-test"
    }
    '''
    data = request.get_json()
    id = data['id']

    db_data = requests.get(GROUP_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    for data in all_data_items:
        group_id = data['Group_id']
        group_id_s = group_id['S']
        if group_id_s == id:
            data['joined'] = 'false'
            data['Group_id'] = data['Group_id']['S']
            data['group_leader'] = data['group_leader']['S']
            data['group_name'] = data['group_name']['S']
            data['img_s3_url'] = data['img_s3_url']['S']
            data['description'] = data['description']['S']
            data['category'] = data['category']['S']
            print(data)
            new_json = {}
            new_json['Item'] = data
            print(new_json)
            requests.put(GROUP_URL, json=new_json)
            return "Success", 201
    return "Failed", 400

@app.route("/delete-group-by-id", methods=['DELETE'])
def delete_group_by_id():
    '''
    sample json
    {
        "Item":
            {
            "Group_id": "cbe79854-0b50-11ee-be56-0242ac121232"
            }
    }
    '''
    data = request.get_json()

    requests.delete(GROUP_URL, json=data)
    return "Success", 201


# Session Functions ------------------------------------------------------------------------
@app.route("/create-session", methods=['PUT'])
def create_session():
    '''
    sample json 
    {
            "Item" : {
            "session_id" : "session_id",
            "group_id" : "group_id",
            "session_start_date" : "session_start_date",
            "session_end_date" : "session_end_date",
            "session_location" : "session_location",
            "session_max_members" : 20,
            "group_name" : "group_name",
            "session_info" : "session_info",
            "img_s3_url" : "img_s3_url",
            "joined" : "false"
            }
    }
    '''
    data = request.get_json()
    #Hardcoded value for session duration
    data['session_duration'] = 1
    req = requests.put(SESSION_URL, json=data)
    req_data = req.json()
    return str(req_data['statusCode'])


@app.route("/get-all-sessions", methods=['GET'])
def get_all_session():
    db_data = requests.get(SESSION_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    return json.dumps(all_data_items), 201


@app.route("/get-all-sessions-by-group-sid", methods=['POST'])
def get_all_session_by_sid():
    '''
    sample json
    {
        "group_sid": "brandon-test"
    }
    '''
    data = request.get_json()
    g_id = data['group_sid']
    
    db_data = requests.get(SESSION_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    new_arr = []
    for data in all_data_items:
        group_id = data['group_id']
        group_id_s = group_id['S']
        if group_id_s == g_id:
            new_arr.append(data)

    return json.dumps(new_arr), 201

@app.route("/get-all-sessions-by-joined", methods=['GET'])
def get_all_session_by_joined():
    db_data = requests.get(SESSION_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    new_arr = []
    for data in all_data_items:
        join_status = data['joined']
        try:
            join_status_s = join_status['BOOL']
            if join_status_s:
                new_arr.append(data)
        except:
            join_status_s = join_status['S']
            if join_status_s == 'true':
                new_arr.append(data)

    return json.dumps(new_arr), 201


@app.route("/get-session-by-sid", methods=['POST'])
def get_session_by_sid():
    '''
    sample json
    {
        "session_id": "brandon-test"
    }
    '''
    data = request.get_json()
    sid = data['session_id']

    db_data = requests.get(SESSION_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    for data in all_data_items:
        session_id = data['session_id']
        session_id_s = session_id['S']
        if session_id_s == sid:
            return json.dumps(data), 201

    return "Not Found", 404

@app.route("/update-join-status-by-id", methods=['PUT'])
def update_join_status_by_sid():
    '''
    sample json
    {
        "id": "cde002"
    }
    '''
    data = request.get_json()
    id = data['id']

    db_data = requests.get(SESSION_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    for data in all_data_items:
        session_id = data['session_id']
        session_id_s = session_id['S']
        if session_id_s == id:
            print(data)
            data['joined'] = 'true'
            data['session_max_members'] = int(data['session_max_members']['N'])
            data['session_duration'] = int(data['session_duration']['N'])
            data['group_id'] = data['group_id']['S']
            data['session_id'] = data['session_id']['S']
            data['session_start_date'] = data['session_start_date']['S']
            data['session_end_date'] = data['session_end_date']['S']
            data['session_location'] = data['session_location']['S']
            data['group_name'] = data['group_name']['S']
            data['session_info'] = data['session_info']['S']
            data['img_s3_url'] = data['img_s3_url']['S']
            print(data)
            new_json = {}
            new_json['Item'] = data
            print(new_json)
            requests.put(SESSION_URL, json=new_json)
            return "Success", 201
       

@app.route("/leave-session-by-id", methods=['PUT'])
def leave_session_by_id():
    '''
    sample json
    {
        "id": "cde002"
    }
    '''
    data = request.get_json()
    id = data['id']

    db_data = requests.get(SESSION_URL).json()
    all_data = db_data['body']
    all_data_json = json.loads(all_data)
    all_data_items = all_data_json['Items']
    for data in all_data_items:
        session_id = data['session_id']
        session_id_s = session_id['S']
        if session_id_s == id:
            print(data)
            data['joined'] = 'false'
            data['session_max_members'] = int(data['session_max_members']['N'])
            data['session_duration'] = int(data['session_duration']['N'])
            data['group_id'] = data['group_id']['S']
            data['session_id'] = data['session_id']['S']
            data['session_start_date'] = data['session_start_date']['S']
            data['session_end_date'] = data['session_end_date']['S']
            data['session_location'] = data['session_location']['S']
            data['group_name'] = data['group_name']['S']
            data['session_info'] = data['session_info']['S']
            data['img_s3_url'] = data['img_s3_url']['S']
            print(data)
            new_json = {}
            new_json['Item'] = data
            print(new_json)
            requests.put(SESSION_URL, json=new_json)
            return "Success", 201

@app.route("/delete-session-by-id", methods=['DELETE'])
def delete_session_by_id():
    '''
    sample json
    {
        "Item":
            {
            "session_id": "cbe79854-0b50-11ee-be56-0242ac121232"
            }
    }
    '''
    data = request.get_json()

    requests.delete(GROUP_URL, json=data)
    return "Success", 201


### Function for reference ###
@app.route("/upload-img-s3-bucket", methods=['POST'])
def upload_to_s3_bucket():
    image = request.files["image"]
    bucket_name = "interesthingphotobucket"
    try:
        s3.upload_fileobj(
            image,
            bucket_name,
            image.filename,
            ExtraArgs={"ContentType": image.content_type}
        )
    except Exception as e:
        return {"errors": str(e)}

    return "success", 201


if __name__ == '__main__':
    CORS(app)
    app.run(debug=True, host='localhost', port=8080)