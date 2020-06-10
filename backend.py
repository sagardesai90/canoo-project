import json
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

data = {}

data['rooms'] = {}
data['thermostat'] = {}

data['rooms'].update({
    'Kitchen': 'on',
})

data['rooms'].update({
    'LivingRoom': 'off',
})

data['rooms'].update({
    'Bedroom': 'off',
})

data['thermostat'].update({
    'temperature': "45°"
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
def getData():
    with open('data.json', 'w') as outfile:
        json.dump(data, outfile, indent=4, ensure_ascii=False)
    return data


@app.route('/add_light', methods=['GET'])
def add():
    add_light("Patio")
    with open('data.json', 'w') as outfile:
        json.dump(data, outfile, indent=4, ensure_ascii=False)
    return data


@app.route('/light_switch', methods=["GET", "POST"])
def switch():
    light_switch("Patio")
    with open('data.json', 'w') as outfile:
        json.dump(data, outfile, indent=4, ensure_ascii=False)
    return data


@app.route('/adjust_temp', methods=["GET", "POST"])
def temp():
    adjust_temp("35°")
    with open('data.json', 'w') as outfile:
        json.dump(data, outfile, indent=4, ensure_ascii=False)
    return data
