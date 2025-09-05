"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

  type LatestAllProps =
    | {
        type: "quiz";
        title: string;
        questionsCount: number;
        attemptsCount: number;
      }
    | {
        type: "contest";
        name: string;
        createdAt: string;
        startTime: string;
        participantsCount: number;
        timeLeftHours: number;
      };
export default function LatestAll() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [latestAll, setLatestAll] = useState<LatestAllProps[]>([]);

  useEffect(() => {
    const fetchLatestAll = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/search/latestaddedall");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "No Response");
        }else{
          setError(null);
          setLatestAll(data.items);
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestAll();
  }, []);

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size={48} color="#8B5CF6" />
      </div>
    );

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-4 w-full min-w-[370px] mx-auto">
        {latestAll.map((item, idx) => (
          <div
            key={idx}
            className="w-full rounded-3xl px-5 py-4 shadow-sm bg-white border border-gray-100"
          >
            <div className="flex items-center w-full gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <Image
                  src="/cube1.svg"
                  alt="Cube Icon"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Title + Description & Stats */}
              {item.type === "quiz" ? (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.questionsCount} questions
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-center flex-shrink-0">
                    <span className="text-lg font-semibold text-gray-900">
                      {item.attemptsCount}
                    </span>
                    <span className="text-sm font-normal text-gray-500">
                      Plays
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.participantsCount} participants
                    </p>
                  </div>
                  <div className="flex flex-col items-center font-semibold flex-shrink-0">
                    <HourProgressCircle
                      hours={
                        typeof item.timeLeftHours === "number" &&
                        !isNaN(item.timeLeftHours)
                          ? item.timeLeftHours
                          : 0
                      }
                    />
                    <span className="text-sm font-normal text-gray-500">
                      Hours left
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// ContestTab's HourProgressCircle reused here
function HourProgressCircle(props: { hours: number }) {
  const hours =
    typeof props.hours === "number" && !isNaN(props.hours) ? props.hours : 0;

  let circleColor = "var(--progress-low)";
  let textColor = "var(--progress-low)";

  if (hours >= 24) {
    circleColor = "var(--progress-high)";
    textColor = "var(--progress-high)";
  } else if (hours >= 20) {
    circleColor = "var(--progress-medium)";
    textColor = "var(--progress-medium)";
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
