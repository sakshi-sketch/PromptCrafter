from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai

#load enviroment variable from .env file
load_dotenv()
#creating flask app
app = Flask(__name__)
CORS(app) #allow cross origin request

#configure gemini api key
genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

#using post method, becoz sending data from frontend to the body(json).

@app.route("/generate", methods = ["POST"])
def generate_prompt():
    data = request.get_json()
    user_prompt = data.get("prompt") #frontend input

    if not(user_prompt) :
        return jsonify({"error" : "prompt is missing"}),400
    
    #call gemini
    response = model.generate_content(user_prompt)

    return jsonify({"output": response.text})
    
@app.route("/",methods = ["GET"])
def home():
    return jsonify({"message" : "promptcrafter backend is running"})

if __name__ == "__main__":
    app.run(port = 5000, debug = True)



    





