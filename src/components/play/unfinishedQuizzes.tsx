import Image from "next/image";
import React from "react";

interface UnfinishedQuiz {
  id: string;
  title: string;
  questions: number;
  progress: number; // percentage (0-100)
}

interface UnfinishedQuizzesProps {
  quizzes: UnfinishedQuiz[];
}

export default function UnfinishedQuizzes({ quizzes }: UnfinishedQuizzesProps) {
  return (
    <div className="px-6 mt-8 pb-24">
      <h3
        className="text-base font-semibold mb-4"
        style={{ color: "var(--card-foreground)" }}
      >
        Your Unfinished Quizzes
      </h3>
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
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
                alt="Quiz Icon"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            {/* Quiz Info */}
            <div className="flex-1 ml-4">
              <div
                className="text-lg font-bold"
                style={{ color: "var(--quiz-title-color)" }}
              >
                {quiz.title}
              </div>
              <div
                className="text-sm"
                style={{ color: "var(--quiz-subtitle-color)" }}
              >
                {quiz.questions} questions
              </div>
            </div>
            {/* Progress Circle */}
            <div className="flex-shrink-0 ml-4">
              <ProgressCircle percent={quiz.progress} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressCircle({ percent }: { percent: number }) {
  // Set colors based on progress percentage using CSS variables
  let circleColor = "var(--progress-low)"; // Purple for lower progress
  let textColor = "var(--progress-low)";

  if (percent >= 95) {
    circleColor = "var(--progress-high)"; // Green for high progress (99%)
    textColor = "var(--progress-high)";
  } else if (percent >= 80) {
    circleColor = "var(--progress-medium)"; // Orange for medium-high progress
    textColor = "var(--progress-medium)";
  } else {
    circleColor = "var(--progress-low)"; // Purple for lower progress (60%)
    textColor = "var(--progress-low)";
  }

  const size = 52;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
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
        {percent}%
      </text>
    </svg>
  );
}
