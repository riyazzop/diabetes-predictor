import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes.predict import router as predict_router
from routes.recommend import router as recommend_router

# Load environment variables
load_dotenv()

app = FastAPI(
    title="AI Diabetes Analyzer API",
    description="Predict diabetes risk and get AI-powered health recommendations",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://diabetes-predictor-livid.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(predict_router, prefix="/api")
app.include_router(recommend_router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "AI Diabetes Analyzer API is running"}
