"use client";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

type TrendingContestProps = {
  name: string;
  registrationEndTime: string;
  hoursLeft: number | null;
  participantCount: number;
};

export default function TrendingContestList() {
  const [trending, setTrending] = useState<TrendingContestProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrendingContest = async () => {
      try {
        const res = await fetch("/api/dashboard/trendingcontest");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Something went wrong");
        } else {
          setTrending(data || []);
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingContest();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (trending.length === 0) {
    return <div>No trending quizzes available.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {trending.map((quiz, i) => (
        <TrendingCard
          key={`${quiz.name}-${i}`}
          name={quiz.name}
          participantCount={quiz.participantCount}
          hoursLeft={quiz.hoursLeft}
          isLast={i === trending.length - 1}
        />
      ))}
    </div>
  );
}

export function TrendingCard({
  name,
  participantCount,
  hoursLeft,
  isLast = false,
}: {
  name: string;
  participantCount: number;
  hoursLeft: number | null;
  isLast?: boolean;
}) {
  return (
    <Card
      className={`my-2 w-full max-w-[370px] h-[110px] mx-auto ${
        isLast ? "mb-24 sm:mb-32" : ""
      }`}
    >
      <CardHeader className="flex items-center justify-between h-full">
        <div className="flex items-start gap-3">
          <Image
            src="/cube1.svg"
            alt="cube"
            width={48}
            height={38}
            className="rounded"
          />
          <div>
            <CardTitle className="text-lg sm:text-2xl">{name}</CardTitle>
            <CardDescription>{participantCount} participants</CardDescription>
          </div>
        </div>
        <CardAction className="flex flex-col items-center font-semibold">
          {typeof hoursLeft === "number" ? (
            <HourProgressCircle hours={hoursLeft} />
          ) : (
            <span className="text-lg">--</span>
          )}
          <span className="text-sm font-normal text-gray-500">Hours left</span>
        </CardAction>
      </CardHeader>
    </Card>
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
