import os
import numpy as np
import pandas as pd
import joblib
from fastapi import APIRouter, HTTPException
from schemas.user_input import DiabetesInput

router = APIRouter()

# Load the trained model once at module level
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "model", "diabetes_model.pkl")

try:
    model = joblib.load(MODEL_PATH)
except Exception:
    model = None


@router.post("/predict")
async def predict(data: DiabetesInput):
    if model is None:
        raise HTTPException(
            status_code=500,
            detail="Model not found. Please run 'python model/train.py' first.",
        )

    # Build feature DataFrame with correct column names (matching training data)
    features = pd.DataFrame([[
        data.pregnancies,
        data.glucose,
        data.blood_pressure,
        data.skin_thickness,
        data.insulin,
        data.bmi,
        data.diabetes_pedigree_function,
        data.age,
    ]], columns=[
        "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
        "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
    ])

    prediction = int(model.predict(features)[0])
    probability = float(model.predict_proba(features)[0][1]) * 100

    return {
        "prediction": prediction,
        "risk_level": "High" if prediction == 1 else "Low",
        "probability": round(probability, 2),
    }
