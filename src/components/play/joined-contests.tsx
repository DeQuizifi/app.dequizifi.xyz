"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Spinner from "../ui/Spinner";

interface JoinedContest {
  name: string;
  startTime: string;
  _count: {
    participants: number;
  };
  timeleftinhours: number;
}

export default function JoinedContests() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [joinedInfo, setJoinedInfo] = useState<JoinedContest[]>([]);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!address || !isConnected) {
      setError("User Is Not Connected");
      return;
    }
    const fetchUsersJoinedContests = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/play/joinedContest");
        const isJson = res.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson ? await res.json().catch(() => null) : null;
        if (!res.ok) {
          setError(
            (data && (data.error || data.message)) ||
              (res.status === 401
                ? "Please log in to view joined contests"
                : res.status === 500
                ? "Internal Server Error"
                : "Failed to fetch joined contests")
          );
          setJoinedInfo([]);
          return;
        }
        setJoinedInfo(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch joined contests");
      } finally {
        setLoading(false);
      }
    };
    fetchUsersJoinedContests();
  }, [address, isConnected]);
  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-6 mt-8 pb-24">
      <h3 className="text-lg font-semibold mb-4 font-sans text-card-foreground">
        Contests you have joined
      </h3>
      <div className="space-y-4">
        {Array.isArray(joinedInfo) && joinedInfo.length > 0 ? (
          joinedInfo.map((contest: JoinedContest, idx: number) => (
            <div
              key={idx}
              className="flex items-center rounded-xl px-4 py-4 shadow-sm min-h-[80px] border border-border"
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
                <div className="text-lg font-bold">{contest.name}</div>
                <div className="text-sm">
                  {contest._count?.participants ?? 0} people joined
                </div>
              </div>
              {/* Progress Circle for hours left */}
              <div className="flex-shrink-0 ml-4">
                <HourProgressCircle hours={contest.timeleftinhours} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground">No contests joined.</div>
        )}
      </div>
    </div>
  );
}

function HourProgressCircle({ hours }: { hours: number }) {
  // Normalize and color logic
  // Map hour levels to semantic color classes
  let colorClass = "text-chart-2";
  if (hours >= 24) {
    colorClass = "text-progress-high";
  } else if (hours >= 20) {
    colorClass = "text-progress-medium";
  } else {
    colorClass = "text-chart-2";
  }

  // For the circle, treat max as 24h
  const size = 52;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.max(0, Math.min(100, Math.round((hours / 24) * 100)));
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={`block transform -rotate-90 ${colorClass}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-muted-foreground/40"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-[600ms] ease-in-out"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14px"
        fontWeight="600"
        className="transform rotate-90 origin-center text-sm font-semibold"
      >
        {hours}h
      </text>
    </svg>
  );
}
