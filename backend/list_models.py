import google.generativeai as genai

genai.configure(api_key="AIzaSyB4nt2z8yaM7gDfSw9wx3M7wRVAKsusI1A")

for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(model.name)