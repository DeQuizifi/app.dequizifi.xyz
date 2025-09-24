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
    quizName: "Solo Crypto Challenge",
    peopleJoined: 95,
    hoursLeftToStart: 6,
  },
  {
    id: 2,
    quizName: "Bitcoin Knowledge Test",
    peopleJoined: 78,
    hoursLeftToStart: 9,
  },
  {
    id: 3,
    quizName: "Ethereum Deep Dive",
    peopleJoined: 112,
    hoursLeftToStart: 14,
  },
];

export function QuizSinglePlayerList() {
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold text-primary-foreground">
        Single Player Quizzes
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
