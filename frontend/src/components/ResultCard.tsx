"use client";

import RiskBadge from "./RiskBadge";

interface ResultCardProps {
  prediction: {
    prediction: number;
    risk_level: "High" | "Low";
    probability: number;
  };
  recommendations: string;
  onStartOver: () => void;
}

export default function ResultCard({
  prediction,
  recommendations,
  onStartOver,
}: ResultCardProps) {
  const isHigh = prediction.risk_level === "High";

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Risk Badge Card */}
      <div className="bg-card rounded-2xl border border-gray-700/50 p-8 text-center">
        <RiskBadge
          riskLevel={prediction.risk_level}
          probability={prediction.probability}
        />

        {/* Probability Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Low Risk</span>
            <span>High Risk</span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isHigh
                  ? "bg-gradient-to-r from-yellow-500 to-red-500"
                  : "bg-gradient-to-r from-emerald-400 to-teal-500"
              }`}
              style={{ width: `${Math.min(prediction.probability, 100)}%` }}
            />
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            {prediction.probability.toFixed(1)}% diabetes probability
          </p>
        </div>
      </div>

      {/* AI Recommendations Card */}
      <div className="bg-card rounded-2xl border border-gray-700/50 p-8">
        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          AI Health Recommendations
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Personalized advice powered by Google Gemini AI
        </p>

        <div
          className="prose prose-invert prose-sm max-w-none 
            prose-headings:text-accent prose-headings:font-bold
            prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3
            prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-li:text-gray-300 prose-li:leading-relaxed
            prose-strong:text-white
            prose-ul:space-y-1
            text-gray-300 leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: formatMarkdown(recommendations),
          }}
        />
      </div>

      {/* Start Over Button */}
      <button
        onClick={onStartOver}
        className="w-full py-4 bg-accent hover:bg-accent-hover text-primary font-bold text-lg 
          rounded-xl transition-all duration-200 shadow-lg shadow-accent/20 
          hover:shadow-accent/40 active:scale-[0.98]"
      >
        ← Start Over
      </button>
    </div>
  );
}

// Simple markdown to HTML converter
function formatMarkdown(text: string): string {
  return (
    text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Headers
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      // List items
      .replace(/^\* (.*$)/gm, "<li>$1</li>")
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
      // Wrap consecutive <li> in <ul>
      .replace(/((<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
      // Paragraphs (lines not already wrapped)
      .replace(/^(?!<[hul])(.*\S.*)$/gm, "<p>$1</p>")
      // Line breaks
      .replace(/\n\n/g, "<br/>")
  );
}
