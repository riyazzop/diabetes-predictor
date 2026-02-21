from pydantic import BaseModel, Field


class DiabetesInput(BaseModel):
    pregnancies: float = Field(..., ge=0, description="Number of pregnancies")
    glucose: float = Field(..., gt=0, description="Plasma glucose concentration")
    blood_pressure: float = Field(..., ge=0, description="Diastolic blood pressure (mm Hg)")
    skin_thickness: float = Field(..., ge=0, description="Triceps skin fold thickness (mm)")
    insulin: float = Field(..., ge=0, description="2-Hour serum insulin (mu U/ml)")
    bmi: float = Field(..., gt=0, description="Body mass index (kg/m²)")
    diabetes_pedigree_function: float = Field(..., ge=0, description="Diabetes pedigree function")
    age: float = Field(..., gt=0, description="Age in years")


class RecommendInput(BaseModel):
    pregnancies: float = Field(..., ge=0)
    glucose: float = Field(..., gt=0)
    blood_pressure: float = Field(..., ge=0)
    skin_thickness: float = Field(..., ge=0)
    insulin: float = Field(..., ge=0)
    bmi: float = Field(..., gt=0)
    diabetes_pedigree_function: float = Field(..., ge=0)
    age: float = Field(..., gt=0)
    prediction: int = Field(..., description="Prediction result (0 or 1)")
    probability: float = Field(..., description="Prediction probability percentage")
