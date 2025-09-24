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
    quizName: "DeFi Championship",
    peopleJoined: 320,
    hoursLeftToStart: 24,
  },
  {
    id: 2,
    quizName: "Crypto Trading Battle",
    peopleJoined: 285,
    hoursLeftToStart: 18,
  },
  {
    id: 3,
    quizName: "NFT Masters Contest",
    peopleJoined: 198,
    hoursLeftToStart: 15,
  },
];

export function QuizMultiPlayerList() {
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold text-primary-foreground">
        Contest Quizzes
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
