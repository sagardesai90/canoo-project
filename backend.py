import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

data = {}

data['rooms'] = {}
data['thermostat'] = {}

data['rooms'].update({
    'Kitchen': 'on',
})

data['rooms'].update({
    'Living Room': 'off',
})

data['rooms'].update({
    'Bedroom': 'off',
})

data['thermostat'].update({
    'temperature': "45"
})


def add_light(name):
    data['rooms'].update({
        name: "off",
    })


def adjust_temp(temp):
    data['thermostat'].update({
        'temperature': temp
    })


def light_switch(room):
    if data["rooms"][room] == "on":
        data["rooms"][room] = "off"
    else:
        data["rooms"][room] = "on"


@app.route('/', methods=['get'])
def get_data():
    with open('data.json', 'w') as outfile:
        json.dump(data, outfile, indent=4, ensure_ascii=False)
    return data


@app.route('/switch', methods=['PUT'])
@cross_origin(origin='*')
def switch():
    json_payload = request.json["room"][0]
    print(json_payload, "json_payload")
    # import pdb
    # pdb.set_trace()
    light_switch(json_payload)
    with open('data.json', 'w') as outfile:
        json.dump(data, outfile, indent=4, ensure_ascii=False)
    return data


@app.route('/switch', methods=['POST'])
@cross_origin(origin='*')
def add():
    json_payload = request.json["newRoom"]
    print(json_payload, "payload")
    add_light(json_payload)
    with open('data.json', 'w') as outfile:
        json.dump(data, outfile, indent=4, ensure_ascii=False)
    return data


@app.route('/adjust_temp', methods=["GET", "PUT"])
def temp():
    # adjust_temp("35°")
    json_payload = request.json
    print(request.json, "new_temp")
    adjust_temp(json_payload["newTemp"])
    with open('data.json', 'w') as outfile:
        # import pdb
        # pdb.set_trace()
        json.dump(data, outfile, indent=4, ensure_ascii=False)
    return data

# @app.route('/add_light', methods=['GET'])
# def add():
#     add_light("Patio")
#     with open('data.json', 'w') as outfile:
#         json.dump(data, outfile, indent=4, ensure_ascii=False)
#     return data


# @app.route('/light_switch', methods=["GET", "POST"])
# def switch():
#     light_switch("Patio")
#     with open('data.json', 'w') as outfile:
#         json.dump(data, outfile, indent=4, ensure_ascii=False)
#     return data
