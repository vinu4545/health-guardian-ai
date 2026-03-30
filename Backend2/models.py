from pydantic import BaseModel
from typing import List

class SymptomRequest(BaseModel):
    symptoms: List[str]
    age: int
    gender: str

class Prediction(BaseModel):
    disease: str
    probability: int
    risk: str