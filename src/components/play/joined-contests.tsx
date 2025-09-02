"use client";
import Image from "next/image";
import React from "react";

interface JoinedContest {
  name: string;
  participants: number;
  timeleftinhours: number;
}

// Dummy data for UI preview
const joinedContests: JoinedContest[] = [
  {
    name: "DEX vs CEX",
    participants: 158,
    timeleftinhours: 12,
  },
  {
    name: "Unstable Coin",
    participants: 20,
    timeleftinhours: 12,
  },
  {
    name: "DEX vs CEX",
    participants: 20,
    timeleftinhours: 24,
  },
  {
    name: "DEX vs CEX",
    participants: 20,
    timeleftinhours: 20,
  },
];

export default function JoinedContests() {
  return (
    <div className="px-6 mt-8 pb-24">
      <h3
        className="text-lg font-semibold mb-4 font-sans"
        style={{ color: "var(--card-foreground)" }}
      >
        Contests you have joined
      </h3>
      <div className="space-y-4">
        {joinedContests.map((contest, idx) => (
          <div
            key={idx}
            className="flex items-center rounded-xl px-4 py-4 shadow-sm min-h-[80px]"
            style={{
              backgroundColor: "var(--quiz-card-bg)",
              border: "1px solid var(--quiz-card-border)",
            }}
          >
            {/* Left Icon */}
            <div className="flex-shrink-0">
              <Image
                src="/cube1.svg"
                alt="Contest Icon"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            {/* Contest Info */}
            <div className="flex-1 ml-4">
              <div
                className="text-lg font-bold"
                style={{ color: "var(--quiz-title-color)" }}
              >
                {contest.name}
              </div>
              <div
                className="text-sm"
                style={{ color: "var(--quiz-subtitle-color)" }}
              >
                {contest.participants} people joined
              </div>
            </div>
            {/* Progress Circle for hours left */}
            <div className="flex-shrink-0 ml-4">
              <HourProgressCircle hours={contest.timeleftinhours} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HourProgressCircle({ hours }: { hours: number }) {
  // Normalize and color logic
  let circleColor = "var(--progress-low)";
  let textColor = "var(--progress-low)";

  if (hours >= 24) {
    circleColor = "var(--progress-high)"; // Green
    textColor = "var(--progress-high)";
  } else if (hours >= 20) {
    circleColor = "var(--progress-medium)"; // Orange
    textColor = "var(--progress-medium)";
  } else {
    circleColor = "var(--progress-low)"; // Purple
    textColor = "var(--progress-low)";
  }

  // For the circle, treat max as 24h
  const size = 52;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.max(0, Math.min(100, Math.round((hours / 24) * 100)));
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="block transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--progress-bg)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={circleColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease-in-out" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14px"
        fontWeight="600"
        fill={textColor}
        className="transform rotate-90"
        style={{ transformOrigin: "center" }}
      >
        {hours}h
      </text>
    </svg>
  );
}
