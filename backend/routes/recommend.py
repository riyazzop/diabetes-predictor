import os
from fastapi import APIRouter, HTTPException
from google import genai
from schemas.user_input import RecommendInput

router = APIRouter()


@router.post("/recommend")
async def recommend(data: RecommendInput):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your_gemini_api_key_here":
        raise HTTPException(
            status_code=500,
            detail="Gemini API key not configured. Please set GEMINI_API_KEY in .env",
        )

    client = genai.Client(api_key=api_key)

    risk_status = "HIGH RISK (positive)" if data.prediction == 1 else "LOW RISK (negative)"

    prompt = f"""You are a friendly and knowledgeable health advisor. A user has just completed a diabetes risk assessment with the following results:

**Health Metrics:**
- Pregnancies: {data.pregnancies}
- Glucose Level: {data.glucose} mg/dL
- Blood Pressure: {data.blood_pressure} mm Hg
- Skin Thickness: {data.skin_thickness} mm
- Insulin Level: {data.insulin} mu U/ml
- BMI: {data.bmi} kg/m²
- Diabetes Pedigree Function: {data.diabetes_pedigree_function}
- Age: {data.age} years

**Prediction Result:** {risk_status} for diabetes (probability: {data.probability:.1f}%)

Based on these results, please provide personalized health recommendations in the following categories. Keep the tone friendly, encouraging, and easy to understand:

1. 🥗 **Diet Tips** - Specific dietary recommendations based on their metrics
2. 🏃 **Exercise Advice** - Suitable physical activities and frequency
3. 🌟 **Lifestyle Changes** - Daily habits that can help manage or prevent diabetes
4. 🏥 **When to See a Doctor** - Clear guidance on when medical attention is needed

Format your response using markdown with clear headings for each category. Be specific and actionable with your advice."""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        return {"recommendations": response.text}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get recommendations from Gemini: {str(e)}",
        )
