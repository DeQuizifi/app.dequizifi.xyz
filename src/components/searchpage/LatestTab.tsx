"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

interface Quiz {
  title: string;
  questions: { length: number }[];
  attempts: Record<string, unknown>[];
}

export default function LatestTab() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("/api/search/latestaddedquizzes");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Something went wrong");
        } else {
          setQuizzes(data.quiz);
        }
      } catch (err) {
        setError("Failed to fetch quizzes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size={48} color="#8B5CF6" />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-4 w-full min-w-[370px] mx-auto">
        {quizzes.map((quiz: Quiz, idx: number) => (
          <div
            key={idx}
            className="w-full rounded-3xl px-5 py-4 shadow-sm bg-white border border-gray-100"
          >
            <div className="flex items-center w-full gap-4">
              {/* Icon */}
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
              {/* Title + Description */}
              <div className="flex-1 min-w-0">
                <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                  {quiz.title}
                </p>
                <p className="text-sm text-gray-500">
                  {quiz.questions.length} questions
                </p>
              </div>
              {/* Plays */}
              <div className="flex flex-col items-end justify-center flex-shrink-0">
                <span className="text-lg font-semibold text-gray-900">
                  {quiz.attempts.length}
                </span>
                <span className="text-sm font-normal text-gray-500">Plays</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
