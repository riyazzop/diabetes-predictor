interface RiskBadgeProps {
  riskLevel: "High" | "Low";
  probability: number;
}

export default function RiskBadge({ riskLevel, probability }: RiskBadgeProps) {
  const isHigh = riskLevel === "High";

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold tracking-wider
          ${
            isHigh
              ? "bg-red-500/15 text-red-400 border border-red-500/30"
              : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          }
          pulse-glow
        `}
        style={{
          animationName: "pulse-glow",
          // Override the glow color based on risk
          ...(isHigh
            ? {
                boxShadow: `0 0 15px rgba(239, 68, 68, 0.3)`,
              }
            : {
                boxShadow: `0 0 15px rgba(16, 185, 129, 0.3)`,
              }),
        }}
      >
        <span className="text-2xl">{isHigh ? "⚠️" : "✅"}</span>
        {isHigh ? "HIGH RISK" : "LOW RISK"}
      </div>
      <p className="text-gray-400 text-sm">
        Probability:{" "}
        <span
          className={`font-bold text-base ${isHigh ? "text-red-400" : "text-emerald-400"}`}
        >
          {probability.toFixed(1)}%
        </span>
      </p>
    </div>
  );
}
