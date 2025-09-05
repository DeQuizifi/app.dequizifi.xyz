import React from "react";
import Image from "next/image";

type Contest = {
  id: number;
  name: string;
  category: string;
  registrationEndTime: string;
  participantCount: number;
  hoursLeft: number;
};

const mockContests: Contest[] = [
  {
    id: 1,
    name: "Math Mania",
    category: "Math",
    registrationEndTime: "2025-09-10T18:00:00Z",
    participantCount: 120,
    hoursLeft: 12,
  },
  {
    id: 2,
    name: "Science Sprint",
    category: "Science",
    registrationEndTime: "2025-09-12T20:00:00Z",
    participantCount: 95,
    hoursLeft: 22,
  },
  {
    id: 3,
    name: "History Hunt",
    category: "History",
    registrationEndTime: "2025-09-15T15:00:00Z",
    participantCount: 60,
    hoursLeft: 5,
  },
];

export default function ContestTab() {
  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-4 w-full min-w-[370px] mx-auto">
        {mockContests.map((contest) => (
          <div
            key={contest.id}
            className="w-full rounded-3xl px-5 py-4 shadow-sm bg-white border border-gray-100"
          >
            <div className="flex items-center w-full gap-4">
              {/* Icon */}
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

              {/* Title + Description */}
              <div className="flex-1 min-w-0">
                <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                  {contest.name}
                </p>
                <p className="text-sm text-gray-500">
                  {contest.participantCount} participants
                </p>
              </div>

              {/* Registration/Hours Left */}
              <div className="flex flex-col items-center font-semibold flex-shrink-0">
                <HourProgressCircle hours={contest.hoursLeft} />
                <span className="text-sm font-normal text-gray-500">
                  Hours left
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HourProgressCircle({ hours }: { hours: number }) {
  let circleColor = "var(--progress-low)";
  let textColor = "var(--progress-low)";

  if (hours >= 24) {
    circleColor = "var(--progress-high)";
    textColor = "var(--progress-high)";
  } else if (hours >= 20) {
    circleColor = "var(--progress-medium)";
    textColor = "var(--progress-medium)";
  } else {
    circleColor = "var(--progress-low)";
    textColor = "var(--progress-low)";
  }

  const size = 48;
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
