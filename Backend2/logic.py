def analyze_symptoms(symptoms):
    symptoms = [s.lower() for s in symptoms]

    if "fever" in symptoms and "cough" in symptoms:
        return [
            {"disease": "Common Cold", "probability": 72, "risk": "Low"},
            {"disease": "Bronchitis", "probability": 55, "risk": "Medium"},
            {"disease": "Pneumonia", "probability": 28, "risk": "High"},
        ]

    if "chest pain" in symptoms and "shortness of breath" in symptoms:
        return [
            {"disease": "Angina", "probability": 60, "risk": "High"},
            {"disease": "Cardiac Issue", "probability": 45, "risk": "High"},
        ]

    if "headache" in symptoms:
        return [
            {"disease": "Migraine", "probability": 65, "risk": "Medium"},
            {"disease": "Stress Headache", "probability": 50, "risk": "Low"},
        ]

    return [
        {"disease": "General Infection", "probability": 55, "risk": "Low"},
        {"disease": "Stress Condition", "probability": 42, "risk": "Low"},
    ]