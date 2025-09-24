import { QuizCard } from "@/components/models/quiz/QuizCard";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
}

const mockQuizzes: Quiz[] = [
  {
    id: 1,
    quizName: "DEX vs CEX",
    peopleJoined: 158,
    hoursLeftToStart: 12,
  },
  {
    id: 2,
    quizName: "DeFi Arena",
    peopleJoined: 158,
    hoursLeftToStart: 12,
  },
  {
    id: 3,
    quizName: "NFT Fundamentals",
    peopleJoined: 142,
    hoursLeftToStart: 12,
  },
];

export function QuizTrendingList() {
  return (
    <div className="mt-6">
      <h3 className="mx-4 mb-4 text-lg font-semibold text-primary-foreground">
        Trending Contests
      </h3>

      <div className="space-y-0">
        {mockQuizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quizName={quiz.quizName}
            peopleJoined={quiz.peopleJoined}
            hoursLeftToStart={quiz.hoursLeftToStart}
          />
        ))}
      </div>
    </div>
  );
}
