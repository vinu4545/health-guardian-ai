import json

with open("data/medical_data.json") as f:
    DATA = json.load(f)

with open("data/symptom_map.json") as f:
    SYMPTOM_MAP = json.load(f)
with open("data/red_flags.json") as f:
    RED_FLAGS = json.load(f)

def normalize(symptoms):
    normalized = []
    for symptom in symptoms:
        symptom_text = symptom.strip().lower()
        normalized.append(SYMPTOM_MAP.get(symptom_text, symptom_text))
    return normalized

def analyze_symptoms(symptoms, age, gender):
    symptoms = normalize(symptoms)
    results = []

    has_red_flag = any(s in RED_FLAGS["high_risk_symptoms"] for s in symptoms)

    for disease in DATA["diseases"]:

        # AGE FILTER
        if not (disease["age_range"][0] <= age <= disease["age_range"][1]):
            continue

        # GENDER FILTER
        if disease["gender"] != "any" and disease["gender"] != gender:
            continue

        score = 0

        for s in symptoms:
            if s in disease["symptoms"]:
                score += disease["symptoms"][s]

        if score > 0:
            probability = min(score * 10, 100)

            if has_red_flag:
                probability = min(probability + 20, 100)

            risk = disease["risk"]
            if has_red_flag and risk != "High":
                risk = "High"

            results.append({
                "disease": disease["name"],
                "probability": probability,
                "risk": risk
            })

    # SORT BY BEST MATCH
    results.sort(key=lambda x: x["probability"], reverse=True)

    return results[:3] if results else [
        {"disease": "General Infection", "probability": 50, "risk": "Low"}
    ]