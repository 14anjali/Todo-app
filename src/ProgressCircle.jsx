import React, { useState, useMemo } from "react";

function ProgressBar({
  completed = 0,
  total = 0,
  size = 250,
  strokeWidth = 18,
}) {
  const [hovered, setHovered] = useState(false);

  //  Safety checks
  const safeTotal = Math.max(total, 0);
  const progress =
    safeTotal === 0 ? 0 : Math.min(Math.max(completed / safeTotal, 0), 1);
  const percentage = Math.round(progress * 100);

  //  Calculate circle dimensions
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const offset = circumference * (1 - progress);

  //  Unique gradient ID
  const gradId = useMemo(
    () => `grad-${Math.random().toString(36).substr(2, 8)}`,
    []
  );

  return (
    <div
      className="relative inline-block mt-12 mb-10 transition-transform duration-300 ease-in-out"
      style={{
        width: size,
        height: size,
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* SVG */}
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          {/* Purple gradient */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />   {/* Purple */}
            <stop offset="50%" stopColor="#C084FC" />  {/* Light Purple */}
            <stop offset="100%" stopColor="#D946EF" /> {/* Pink */}
          </linearGradient>

          {/* Soft glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
            filter: "url(#glow)",
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        {hovered ? (
          <span className="text-xl font-semibold text-purple-300 drop-shadow-[0_0_6px_#C084FC]">
            {percentage}%
          </span>
        ) : (
          <span className="text-base font-medium text-gray-300">
            {completed}/{safeTotal}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
