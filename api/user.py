from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import openai
import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
import certifi
import json
import logging
from waitress import serve
from flask_cors import CORS
import requests

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)
CORS(app)
logging.getLogger('flask_cors').level = logging.DEBUG

username = os.getenv("MONGO_USERNAME")
password = os.getenv("MONGO_PASSWORD")

username = quote_plus(username)
password = quote_plus(password)

connection_string = f"mongodb+srv://{username}:{password}@hh23.oxb5jub.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(connection_string, tlsCAFile=certifi.where(), tlsAllowInvalidCertificates=True)

db = client['hh23']
collection = db['AIvisor']

localhost = "http://0.0.0.0:8080"

users = {}

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')

    if username in users:
        return jsonify({'message': 'User already exists'}), 400

    users[username] = generate_password_hash(password)
    return jsonify({'message': 'User created successfully'}), 200

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # if username not in users or not check_password_hash(users[username], password):
    #     return jsonify({'message': 'Invalid username or password'}), 400

    return jsonify({'message': 'Logged in successfully'}), 200

@app.route('/form1', methods=['POST'])
def form1():
    collection.insert_one(request.get_json(force=True))
    return jsonify({'message': 'Form 1 data stored successfully'}), 200

@app.route('/form2', methods=['POST'])
def form2():
    collection.insert_one(request.get_json(force=True))
    return jsonify({'message': 'Form 2 data stored successfully'}), 200

@app.route('/form3', methods=['POST'])
def form3():
    collection.insert_one(request.get_json(force=True))
    return jsonify({'message': 'Form 3 data stored successfully'}), 200

@app.route('/form4', methods=['POST'])
def form4():
    collection.insert_one(request.get_json(force=True))
    return jsonify({'message': 'Form 4 data stored successfully'}), 200

@app.route('/read-mongo', methods=['GET'])
def read_mongodb():
    csv_files = collection.find()
    dfs={}
    for file in csv_files:
        del file['_id']
        dfs |= file

    return jsonify(dfs), 200

@app.route('/test', methods=['GET', 'POST'])
def test():
    data = requests.get('http://localhost/read-mongodb')

    return jsonify({'message': f'{data.status_code}'}), 200

@app.route('/clear', methods=['DELETE'])
def clear_mongodb():
    collection.delete_many({})
    return jsonify({'message': 'Collection cleared successfully'}), 204

@app.route('/openai', methods=['POST'])
def gpt_call():
    openai.api_key = os.getenv("OPENAI_API_KEY")
    csv_files = collection.find()
    dfs={}
    for file in csv_files:
        del file['_id']
        dfs |= file

    # Example of calling the GPT-3 API
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt="Generate a list of 10 colleges that I can get into with the below specifications along with explanations of how I can get into each college" + str(dfs),
        max_tokens = 3500
    )



    output = response.choices[0].text
    collection.delete_many({})
    return jsonify({'output': output}), 200

if __name__ == '__main__':
    serve(app, host="0.0.0.0", port=8080)