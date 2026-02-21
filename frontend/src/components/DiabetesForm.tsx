"use client";

import { useState } from "react";
import {
  getPrediction,
  getRecommendations,
  DiabetesFormData,
  PredictionResult,
} from "@/lib/api";

interface FormField {
  key: keyof DiabetesFormData;
  label: string;
  placeholder: string;
  icon: string;
}

const formFields: FormField[] = [
  {
    key: "pregnancies",
    label: "Pregnancies",
    placeholder: "e.g. 2",
    icon: "👶",
  },
  {
    key: "glucose",
    label: "Glucose (mg/dL)",
    placeholder: "e.g. 120",
    icon: "🩸",
  },
  {
    key: "blood_pressure",
    label: "Blood Pressure (mm Hg)",
    placeholder: "e.g. 70",
    icon: "💓",
  },
  {
    key: "skin_thickness",
    label: "Skin Thickness (mm)",
    placeholder: "e.g. 20",
    icon: "📏",
  },
  {
    key: "insulin",
    label: "Insulin (mu U/ml)",
    placeholder: "e.g. 80",
    icon: "💉",
  },
  { key: "bmi", label: "BMI (kg/m²)", placeholder: "e.g. 25.5", icon: "⚖️" },
  {
    key: "diabetes_pedigree_function",
    label: "Diabetes Pedigree Function",
    placeholder: "e.g. 0.5",
    icon: "🧬",
  },
  { key: "age", label: "Age (years)", placeholder: "e.g. 30", icon: "🎂" },
];

interface DiabetesFormProps {
  onResult: (data: {
    prediction: PredictionResult;
    recommendations: string;
    formData: DiabetesFormData;
  }) => void;
}

export default function DiabetesForm({ onResult }: DiabetesFormProps) {
  const [formData, setFormData] = useState<DiabetesFormData>({
    pregnancies: 0,
    glucose: 0,
    blood_pressure: 0,
    skin_thickness: 0,
    insulin: 0,
    bmi: 0,
    diabetes_pedigree_function: 0,
    age: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>("");

  const handleChange = (key: keyof DiabetesFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const validate = (): string | null => {
    if (formData.glucose <= 0) return "Glucose must be greater than 0";
    if (formData.bmi <= 0) return "BMI must be greater than 0";
    if (formData.age <= 0) return "Age must be greater than 0";
    if (formData.pregnancies < 0) return "Pregnancies cannot be negative";
    if (formData.blood_pressure < 0) return "Blood Pressure cannot be negative";
    if (formData.skin_thickness < 0) return "Skin Thickness cannot be negative";
    if (formData.insulin < 0) return "Insulin cannot be negative";
    if (formData.diabetes_pedigree_function < 0)
      return "Diabetes Pedigree Function cannot be negative";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      setLoadingStep("Analyzing your health data...");
      const prediction = await getPrediction(formData);

      setLoadingStep("Generating personalized recommendations...");
      const recResponse = await getRecommendations({
        ...formData,
        prediction: prediction.prediction,
        probability: prediction.probability,
      });

      onResult({
        prediction,
        recommendations: recResponse.recommendations,
        formData,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formFields.map((field) => (
          <div key={field.key} className="group">
            <label
              htmlFor={field.key}
              className="block text-sm font-medium text-gray-300 mb-1.5 group-focus-within:text-accent transition-colors"
            >
              <span className="mr-1.5">{field.icon}</span>
              {field.label}
            </label>
            <input
              id={field.key}
              type="number"
              step="any"
              min="0"
              placeholder={field.placeholder}
              value={formData[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-4 py-3 bg-primary border border-gray-700 rounded-xl text-white 
                placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 
                focus:ring-accent/50 transition-all duration-200 hover:border-gray-500"
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full py-4 bg-accent hover:bg-accent-hover text-primary font-bold text-lg 
          rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
          shadow-lg shadow-accent/20 hover:shadow-accent/40 active:scale-[0.98]"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <span className="spinner" />
            {loadingStep}
          </span>
        ) : (
          "🔍 Analyze Diabetes Risk"
        )}
      </button>
    </form>
  );
}
