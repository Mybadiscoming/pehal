import os
from dotenv import load_dotenv
from adaption import Adaption
load_dotenv()
client = Adaption(api_key=os.getenv("API-Key"))
question= input("Enter your question: ")
response = client.responses.create(
    model = "qwen3.5-397b",
    input = question)
print(response.output_text)