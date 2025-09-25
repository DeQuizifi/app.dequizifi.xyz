import { QuizNotJoinedTrendingCard } from "./QuizNotJoinedTrendingCard";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
}

const mockNotJoinedQuizzes: Quiz[] = [
  {
    id: 201,
    quizName: "Algorithmic Stablecoins",
    peopleJoined: 20,
    hoursLeftToStart: 18,
  },
  {
    id: 202,
    quizName: "Layer 2 Scaling",
    peopleJoined: 278,
    hoursLeftToStart: 8,
  },
  {
    id: 203,
    quizName: "Cross-Chain Mechanics",
    peopleJoined: 199,
    hoursLeftToStart: 2,
  },
  {
    id: 204,
    quizName: "NFT Valuation",
    peopleJoined: 144,
    hoursLeftToStart: 16,
  },
  {
    id: 205,
    quizName: "Advanced DeFi Strategies",
    peopleJoined: 320,
    hoursLeftToStart: 4,
  },
];

export function QuizNotJoinedTrendingList() {
  return (
    <div className="mt-4">
      <h3 className="mx-4 mb-4 text-lg font-semibold text-primary-foreground">
        What would you like to play today?
      </h3>

      {/* Horizontal scrollable container */}
      <div className="px-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {mockNotJoinedQuizzes.map((quiz) => (
            <QuizNotJoinedTrendingCard
              key={quiz.id}
              quizName={quiz.quizName}
              peopleJoined={quiz.peopleJoined}
              hoursLeftToStart={quiz.hoursLeftToStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
