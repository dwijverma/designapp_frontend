// CircularProgressBar.js
import React from "react";
import "./CircularProgressBar.css";

const CircularProgressBar = ({ progress, size = 100, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="circular-progress-bar">
      <circle
        className="circular-progress-background"
        stroke="#e0e0e0"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className="circular-progress-circle"
        stroke="#76c7c0"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className="circular-progress-text"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
