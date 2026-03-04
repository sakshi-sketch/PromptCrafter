import os
from flask import Blueprint, jsonify, request
import  google.generativeai as genai

suggest_bp = Blueprint("suggest_bp", __name__)

model = genai.GenerativeModel("gemini-2.5-flash")

@suggest_bp.route("/suggest",methods = ["POST"])

def suggest_prompt() :
    data = request.json
    topic = data.get("topic","")

    if not topic:
        return jsonify({"error" : "Topic is required"}),400
    
    ai_prompt = f"""
    You are PromptCrafter, an AI that creates high-quality prompts.
    Generate 5 unique, creative prompt ideas based on this topic: {topic}.
    The prompts must be detailed and help users write better prompts.
    Return ONLY the list, each on a new line.   
    """

    response = model.generate_content(ai_prompt)
 
    suggestion = [
        line.strip("- ").strip()
        for line in response.text.split("\n")
        if line.strip()
    ]

    return jsonify({"suggestions": suggestions})




