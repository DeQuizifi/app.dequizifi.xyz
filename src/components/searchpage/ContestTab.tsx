"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../ui/Spinner";

type LatestContestProps = {
  name: string;
  timeLeftHours: number;
  createdAt: string;
  _count: {
    participants: number;
  };
};

interface ContestTabProps {
  search: string;
}

export default function ContestTab({ search }: ContestTabProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [latestContest, setLatestContest] = useState<LatestContestProps[]>([]);

  useEffect(() => {
    const fetchLastestContest = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search/latestaddedcontests${
            search ? `?search=${encodeURIComponent(search)}` : ""
          }`
        );
        const data = await res.json();

        if (!res.ok) {
          setError(
            (data && (data.error || data.message)) || "Something went wrong"
          );
          setLatestContest([]);
          return;
        }
        setLatestContest(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch contests");
      } finally {
        setLoading(false);
      }
    };
    fetchLastestContest();
  }, [search]);

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size={48} />
      </div>
    );

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-4 w-full min-w-[370px] mx-auto">
        {latestContest.map((contest) => (
          <div
            key={contest.name}
            className="w-full rounded-3xl px-5 py-4 shadow-sm bg-card border border-border"
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
                <p className="text-lg sm:text-2xl font-semibold text-foreground">
                  {contest.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {contest._count.participants} participants
                </p>
              </div>

              {/* Registration/Hours Left */}
              <div className="flex flex-col items-center font-semibold flex-shrink-0">
                <HourProgressCircle
                  hours={
                    typeof contest.timeLeftHours === "number" &&
                    !isNaN(contest.timeLeftHours)
                      ? contest.timeLeftHours
                      : 0
                  }
                />
                <span className="text-sm font-normal text-muted-foreground">
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
  // Sanitize hours to prevent NaN
  const safeHours = typeof hours === "number" && !isNaN(hours) ? hours : 0;
  let progressLevel = "low";

  if (safeHours >= 24) {
    progressLevel = "high";
  } else if (safeHours >= 20) {
    progressLevel = "medium";
  }

  const size = 48;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.max(
    0,
    Math.min(100, Math.round((safeHours / 24) * 100))
  );
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="block transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className="stroke-border"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className={`transition-[stroke-dashoffset] duration-600 ease-in-out ${
          progressLevel === "high"
            ? "stroke-primary"
            : progressLevel === "medium"
            ? "stroke-muted-foreground"
            : "stroke-destructive"
        }`}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14px"
        fontWeight="600"
        className={`transform rotate-90 origin-center ${
          progressLevel === "high"
            ? "fill-primary"
            : progressLevel === "medium"
            ? "fill-muted-foreground"
            : "fill-destructive"
        }`}
      >
        {safeHours}h
      </text>
    </svg>
  );
}
