from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import SymptomRequest
from logic import analyze_symptoms

app = FastAPI()

# CORS (mandatory)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
def analyze(data: SymptomRequest):
    return analyze_symptoms(data.symptoms, data.age, data.gender)