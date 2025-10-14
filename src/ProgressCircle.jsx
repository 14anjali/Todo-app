import React, { useState, useMemo } from "react";

function ProgressBar({
  completed = 0,
  total = 0,
  size = 250,
  strokeWidth = 18,
}) {
  const [hovered, setHovered] = useState(false);

  // Safety checks
  const safeTotal = Math.max(total, 0);
  const progress =
    safeTotal === 0 ? 0 : Math.min(Math.max(completed / safeTotal, 0), 1);
  const percentage = Math.round(progress * 100);

  // Circle math
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const offset = circumference * (1 - progress);

  // Unique gradient ID
  const gradId = useMemo(
    () => `grad-${Math.random().toString(36).substr(2, 8)}`,
    []
  );

  // Motivational status text
  const statusMessage =
    percentage === 100
      ? "🎯 All tasks completed!"
      : percentage >= 70
      ? "Almost there, keep going!"
      : percentage >= 40
      ? "You're making great progress!"
      : percentage > 0
      ? "Let’s get more done!"
      : "Start your first task!";

  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-12 mb-10">
      <div
        className="relative inline-block transition-transform duration-300 ease-in-out 
                   bg-gradient-to-br from-gray-600/50 to-gray-800/30 
                   rounded-full shadow-lg hover:shadow-purple-500/30"
        style={{
          width: size,
          height: size,
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* SVG Circle (perfectly centered) */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#D946EF" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress Circle */}
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

        {/* Center Value */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          {hovered ? (
            <span className="text-2xl font-semibold text-purple-300 drop-shadow-[0_0_6px_#C084FC]">
              {percentage}%
            </span>
          ) : (
            <span className="text-lg font-medium text-gray-300 dark:text-gray-400">
              {completed}/{safeTotal}
            </span>
          )}
        </div>
      </div>

      {/* Text Under Circle */}
      <p
        className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400
                   font-medium mt-2 transition-colors duration-300"
      >
        {statusMessage}
      </p>
    </div>
  );
}

export default ProgressBar;
