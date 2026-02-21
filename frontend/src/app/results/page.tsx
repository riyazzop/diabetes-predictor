"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResultCard from "@/components/ResultCard";
import { PredictionResult, DiabetesFormData } from "@/lib/api";

interface ResultData {
  prediction: PredictionResult;
  recommendations: string;
  formData: DiabetesFormData;
}

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("diabetesResult");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        router.push("/");
      }
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [router]);

  const handleStartOver = () => {
    localStorage.removeItem("diabetesResult");
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-primary flex items-center justify-center">
        <div className="spinner !w-12 !h-12" />
      </main>
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen bg-primary">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-300">
              Results
            </span>
          </h1>
          <p className="text-gray-400">
            Here&apos;s your AI-powered diabetes risk assessment
          </p>
        </div>

        {/* Results */}
        <ResultCard
          prediction={data.prediction}
          recommendations={data.recommendations}
          onStartOver={handleStartOver}
        />

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-600 mt-8 max-w-lg mx-auto">
          ⚕️ This tool is for educational purposes only. It is not a substitute
          for professional medical advice, diagnosis, or treatment.
        </p>
      </div>
    </main>
  );
}
