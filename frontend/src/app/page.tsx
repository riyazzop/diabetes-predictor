"use client";

import { useRouter } from "next/navigation";
import DiabetesForm from "@/components/DiabetesForm";
import { PredictionResult, DiabetesFormData } from "@/lib/api";

export default function Home() {
  const router = useRouter();

  const handleResult = (data: {
    prediction: PredictionResult;
    recommendations: string;
    formData: DiabetesFormData;
  }) => {
    // Save results to localStorage and navigate to results page
    localStorage.setItem("diabetesResult", JSON.stringify(data));
    router.push("/results");
  };

  return (
    <main className="min-h-screen bg-primary">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
            <span>🧠</span> Powered by AI & Machine Learning
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            AI Diabetes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-300">
              Analyzer
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Get an instant diabetes risk assessment powered by machine learning,
            with personalized health recommendations from AI.
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              ML Prediction
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              AI Recommendations
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Instant Results
            </span>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-card rounded-2xl border border-gray-700/50 p-6 sm:p-8 max-w-2xl mx-auto shadow-xl shadow-black/20">
          <h2 className="text-xl font-bold text-white mb-1">
            Enter Your Health Data
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Fill in your health metrics below for an AI-powered diabetes risk
            analysis
          </p>
          <DiabetesForm onResult={handleResult} />
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-600 mt-8 max-w-lg mx-auto">
          ⚕️ This tool is for educational purposes only. It is not a substitute
          for professional medical advice, diagnosis, or treatment. Always
          consult with a qualified healthcare provider.
        </p>
      </div>
    </main>
  );
}
