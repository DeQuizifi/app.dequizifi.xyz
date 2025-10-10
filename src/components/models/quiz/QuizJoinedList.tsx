import React from "react";
import { QuizCard } from "./QuizCard";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
  description?: string;
}

const mockJoinedQuizzes: Quiz[] = [
  {
    id: 101,
    quizName: "Weekly Crypto Quiz",
    peopleJoined: 42,
    hoursLeftToStart: 6,
    description:
      "Short weekly quiz covering crypto fundamentals, market trends, and practical tokenomics examples to sharpen trading and research skills.",
  },
  {
    id: 102,
    quizName: "Solidity Basics",
    peopleJoined: 28,
    hoursLeftToStart: 3,
    description:
      "Hands-on introduction to Solidity syntax, contract structure, and common pitfalls for safe smart contract development and auditing.",
  },
  {
    id: 103,
    quizName: "Tokenomics Deep Dive",
    peopleJoined: 16,
    hoursLeftToStart: 48,
    description:
      "Explore token supply mechanics, incentives, and economic models that influence project valuation and long-term network health.",
  },
];

export const QuizJoinedList = React.memo(() => {
  const handlePlayNow = (id: number) => {
    console.log(`Playing quiz with ID: ${id}`);
    // Implement navigation or other logic here
  };

  return (
    <div className="mt-4">
      <h3 className="mx-4 mb-4 text-lg font-semibold text-primary-foreground">
        Contests You have Joined
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {mockJoinedQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onButtonClick={handlePlayNow} />
        ))}
      </div>
    </div>
  );
});
