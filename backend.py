import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)


def add_light(name):
    with open('homeState.json', 'r') as json_file:
        light_data = json.load(json_file)
    light_data['rooms'].update({
        name: "off",
    })
    print("New light added to", name)

    with open('homeState.json', 'w') as json_file:
        json.dump(light_data, json_file, indent=4)
    with open('homeState.json', 'r') as json_file:
        light_data = json.load(json_file)
    return light_data


def delete_light_db(name):
    with open('homeState.json', 'r') as json_file:
        light_data = json.load(json_file)
    light_data['rooms'].pop(name, None)
    print("Light removed from", name)
    with open('homeState.json', 'w') as json_file:
        json.dump(light_data, json_file, indent=4)
    with open('homeState.json', 'r') as json_file:
        light_data = json.load(json_file)
    return light_data


def adjust_temp(temp):
    with open('homeState.json', 'r') as json_file:
        temp_data = json.load(json_file)

    temp_data['thermostat'].update({
        'temperature': temp
    })
    print('Temperature set to ', temp)
    with open('homeState.json', "w") as json_file:
        json.dump(temp_data, json_file, indent=4)
    with open('homeState.json', 'r') as json_file:
        temp_data = json.load(json_file)
    return temp_data


def light_switch(room):
    with open('homeState.json', 'r') as json_file:
        room_light = json.load(json_file)
    if room_light["rooms"][room] == "on":
        print(room, "light turned off.")
        room_light["rooms"][room] = "off"
    else:
        print(room, "light turned on.")
        room_light["rooms"][room] = "on"

    with open('homeState.json', 'w') as json_file:
        json.dump(room_light, json_file, indent=4)
    with open('homeState.json', 'r') as json_file:
        light_data = json.load(json_file)
    return room_light


@app.route('/', methods=['GET'])
@cross_origin(origin='*')
def get_data():
    with open('homeState.json', 'r') as outfile:
        home_state = json.load(outfile)
    return home_state


@app.route('/switch', methods=['PUT'])
@cross_origin(origin='*')
def switch():
    json_payload = request.json["room"][0]
    print(json_payload, "json_payload")
    light_switch(json_payload)
    return json_payload


@app.route('/switch', methods=['POST'])
@cross_origin(origin='*')
def add():
    json_payload = request.json["newRoom"]
    add_light(json_payload)

    return json_payload


@app.route('/switch', methods=['DELETE'])
@cross_origin(origin='*')
def delete_light():
    deleted_light = request.json["room"][0]
    delete_light_db(deleted_light)
    return deleted_light


@app.route('/adjust_temp', methods=["PUT"])
@cross_origin(origin='*')
def temp():
    json_payload = request.json
    adjust_temp(json_payload["newTemp"])

    return json_payload
