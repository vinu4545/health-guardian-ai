#!/bin/bash

echo "🚀 Setting up Backend2 project..."

# Create files

touch main.py models.py logic.py **init**.py requirements.txt

# Add basic content to main.py

cat <<EOL > main.py
from fastapi import FastAPI
from Backend2.logic import process_query

app = FastAPI()

@app.get("/")
def root():
return {"message": "Backend2 is running 🚀"}

@app.post("/chat")
def chat(query: str):
response = process_query(query)
return {"response": response}
EOL

# Add basic content to models.py

cat <<EOL > models.py
from pydantic import BaseModel

class ChatRequest(BaseModel):
query: str

class ChatResponse(BaseModel):
response: str
EOL

# Add basic content to logic.py

cat <<EOL > logic.py
def process_query(query: str) -> str:
# TODO: Integrate LLM / RAG here
return f"Echo: {query}"
EOL

# Add requirements

cat <<EOL > requirements.txt
fastapi
uvicorn
pydantic
EOL

echo "✅ Setup complete!"
echo "👉 Run server using:"
echo "uvicorn main:app --reload"
