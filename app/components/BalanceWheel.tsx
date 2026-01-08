"use client";

import { useState } from "react";

const lifeAreas = [
  { id: "career", label: "Career", color: "#3B82F6" },
  { id: "finances", label: "Finances", color: "#6366F1" },
  { id: "health", label: "Health", color: "#14B8A6" },
  { id: "relationships", label: "Relationships", color: "#EC4899" },
  { id: "family", label: "Family", color: "#F59E0B" },
  { id: "recreation", label: "Recreation", color: "#10B981" },
  { id: "growth", label: "Personal Growth", color: "#8B5CF6" },
  { id: "environment", label: "Environment", color: "#06B6D4" },
];

export default function BalanceWheel() {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(lifeAreas.map((area) => [area.id, 5]))
  );

  const handleScoreChange = (areaId: string, value: number) => {
    setScores((prev) => ({ ...prev, [areaId]: value }));
  };

  const averageScore = Math.round(
    Object.values(scores).reduce((sum, score) => sum + score, 0) / lifeAreas.length * 10
  ) / 10;

  const getBalanceMessage = () => {
    if (averageScore >= 8) return { text: "Excellent balance! Keep up the great work.", type: "success" };
    if (averageScore >= 6) return { text: "Good balance! A few areas could use attention.", type: "good" };
    if (averageScore >= 4) return { text: "Moderate balance. Consider focusing on lower-scoring areas.", type: "moderate" };
    return { text: "Your balance needs work. Start with one area to improve.", type: "low" };
  };

  const message = getBalanceMessage();

  const generateWheelPath = (index: number, score: number) => {
    const segmentAngle = 360 / lifeAreas.length;
    const startAngle = index * segmentAngle - 90;
    const endAngle = startAngle + segmentAngle;
    const radius = (score / 10) * 120;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 150 + radius * Math.cos(startRad);
    const y1 = 150 + radius * Math.sin(startRad);
    const x2 = 150 + radius * Math.cos(endRad);
    const y2 = 150 + radius * Math.sin(endRad);

    const largeArc = segmentAngle > 180 ? 1 : 0;

    return `M 150 150 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <section
      id="balance-wheel"
      className="section-padding bg-background"
      aria-labelledby="balance-wheel-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="balance-wheel-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Your <span className="gradient-text">Balance Wheel</span>
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Rate each area of your life from 1 to 10. The wheel will visualize your current balance
            and help identify areas that need more attention.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="order-2 lg:order-1">
            <div className="bg-card-bg dark:bg-card-bg rounded-2xl p-6 md:p-8">
              <div className="relative w-full max-w-md mx-auto">
                <svg
                  viewBox="0 0 300 300"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Balance wheel visualization showing your life area scores"
                >
                  {[2, 4, 6, 8, 10].map((level) => (
                    <circle
                      key={level}
                      cx="150"
                      cy="150"
                      r={(level / 10) * 120}
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.1"
                      strokeWidth="1"
                    />
                  ))}

                  {lifeAreas.map((_, index) => {
                    const angle = (index * 360) / lifeAreas.length - 90;
                    const rad = (angle * Math.PI) / 180;
                    const x = 150 + 130 * Math.cos(rad);
                    const y = 150 + 130 * Math.sin(rad);
                    return (
                      <line
                        key={index}
                        x1="150"
                        y1="150"
                        x2={x}
                        y2={y}
                        stroke="currentColor"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {lifeAreas.map((area, index) => (
                    <path
                      key={area.id}
                      d={generateWheelPath(index, scores[area.id])}
                      fill={area.color}
                      fillOpacity="0.7"
                      stroke={area.color}
                      strokeWidth="2"
                      className="wheel-segment"
                    />
                  ))}

                  {lifeAreas.map((area, index) => {
                    const angle = (index * 360) / lifeAreas.length + 360 / lifeAreas.length / 2 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const x = 150 + 140 * Math.cos(rad);
                    const y = 150 + 140 * Math.sin(rad);
                    return (
                      <text
                        key={area.id}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[10px] md:text-xs fill-current"
                        fontWeight="500"
                      >
                        {area.label}
                      </text>
                    );
                  })}

                  <circle cx="150" cy="150" r="35" fill="white" className="dark:fill-gray-800" />
                  <text
                    x="150"
                    y="145"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold fill-current"
                  >
                    {averageScore}
                  </text>
                  <text
                    x="150"
                    y="165"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-text-muted"
                  >
                    Average
                  </text>
                </svg>
              </div>

              <div
                className={`mt-6 p-4 rounded-lg text-center ${
                  message.type === "success"
                    ? "bg-success/10 text-success"
                    : message.type === "good"
                    ? "bg-primary-blue/10 text-primary-blue"
                    : message.type === "moderate"
                    ? "bg-warning/10 text-warning"
                    : "bg-red-500/10 text-red-500"
                }`}
                role="status"
                aria-live="polite"
              >
                <p className="font-medium">{message.text}</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-card-bg dark:bg-card-bg rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">Rate Your Life Areas</h3>
              <div className="space-y-6">
                {lifeAreas.map((area) => (
                  <div key={area.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor={`slider-${area.id}`}
                        className="font-medium flex items-center gap-2"
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: area.color }}
                          aria-hidden="true"
                        />
                        {area.label}
                      </label>
                      <span className="text-lg font-semibold" style={{ color: area.color }}>
                        {scores[area.id]}
                      </span>
                    </div>
                    <input
                      type="range"
                      id={`slider-${area.id}`}
                      min="1"
                      max="10"
                      value={scores[area.id]}
                      onChange={(e) => handleScoreChange(area.id, parseInt(e.target.value))}
                      className="w-full"
                      aria-valuemin={1}
                      aria-valuemax={10}
                      aria-valuenow={scores[area.id]}
                      aria-label={`${area.label} score: ${scores[area.id]} out of 10`}
                    />
                    <div className="flex justify-between text-xs text-text-muted">
                      <span>Needs work</span>
                      <span>Thriving</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-primary-light dark:bg-primary-light/20 rounded-lg">
                <h4 className="font-semibold mb-2">Interpretation Guide</h4>
                <ul className="text-sm text-text-muted space-y-1">
                  <li><strong>1-3:</strong> This area needs immediate attention</li>
                  <li><strong>4-6:</strong> Room for improvement</li>
                  <li><strong>7-8:</strong> Good progress, maintain momentum</li>
                  <li><strong>9-10:</strong> Thriving in this area</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
