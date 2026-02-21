# AI Diabetes Analyzer

An AI-powered full-stack web application for diabetes risk assessment. Uses a Random Forest ML model trained on the Pima Indians Diabetes Dataset for predictions, and Google Gemini AI for personalized health recommendations.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** FastAPI (Python)
- **ML Model:** Random Forest (scikit-learn)
- **AI Recommendations:** Google Gemini AI

## Local Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
```

1. Place `diabetes.csv` (Pima Indians Diabetes Dataset) in `backend/`
2. Add your Gemini API key to `backend/.env`:
   ```
   GEMINI_API_KEY=your_actual_key_here
   ```
3. Train the model:
   ```bash
   python model/train.py
   ```
4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment

### Backend → Render

1. Create a **New Web Service** on [Render](https://render.com)
2. Connect your GitHub repo
3. Set:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt && python model/train.py`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables:
   - `GEMINI_API_KEY` = your API key
5. Upload `diabetes.csv` to `backend/` before deploying (commit it to the repo)

### Frontend → Vercel

1. Import your GitHub repo on [Vercel](https://vercel.com)
2. Set:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-render-app.onrender.com/api`

## URLs (Local)

| Service  | URL                        |
| -------- | -------------------------- |
| Frontend | http://localhost:3000      |
| Backend  | http://localhost:8000      |
| API Docs | http://localhost:8000/docs |

## Disclaimer

This application is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
