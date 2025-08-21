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

type QuizProps = {
  title: string;
  numberofquestions: number; // Match API response
  numberofattempts: number; // Match API response
};

export default function TrendingQuizzesList() {
  const [trending, setTrending] = useState<QuizProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrendingQuizzes = async () => {
      try {
        const res = await fetch("/api/dashboard/trendingquiz");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Something went wrong");
        } else {
          setTrending(data.result || []);
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingQuizzes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
          key={`${quiz.title}-${i}`}
          title={quiz.title}
          description={`Questions: ${quiz.numberofquestions}`}
          action={`${quiz.numberofattempts}`}
          isLast={i === trending.length - 1}
        />
      ))}
    </div>
  );
}

export function TrendingCard({
  title,
  description,
  action,
  isLast = false,
}: {
  title: string;
  description: string;
  action: string;
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
            <CardTitle className="text-lg sm:text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        <CardAction className="flex flex-col items-center font-semibold">
          <span className="text-lg">{action}</span>
          <span className="text-sm font-normal text-gray-500">Plays</span>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
