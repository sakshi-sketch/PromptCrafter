import google.generativeai as genai

genai.configure(api_key="AIzaSyB4nt2z8yaM7gDfSw9wx3M7wRVAKsusI1A")

model = genai.GenerativeModel("gemini-2.5-flash")
response = model.generate_content("Explain how AI works in a few words")
print(response.text)