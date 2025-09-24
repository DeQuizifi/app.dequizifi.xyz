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
    quizName: "Blockchain Basics",
    peopleJoined: 245,
    hoursLeftToStart: 8,
  },
  {
    id: 2,
    quizName: "Smart Contracts 101",
    peopleJoined: 189,
    hoursLeftToStart: 5,
  },
  {
    id: 3,
    quizName: "Web3 Security",
    peopleJoined: 167,
    hoursLeftToStart: 3,
  },
];

export function QuizLatestList() {
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold text-primary-foreground">
        Latest Quizzes
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
