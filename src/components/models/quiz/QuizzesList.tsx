import { QuizCard } from "@/components/models/quiz/QuizCard";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
}

interface QuizzesListProps {
  title: string;
  quizzes: Quiz[];
}

export function QuizzesList({ title, quizzes }: QuizzesListProps) {
  return (
    <div className="mt-3">
      <h3 className="mx-4 mb-4 text-lg font-semibold text-primary-foreground">
        {title}
      </h3>

      <div className="space-y-0">
        {quizzes.map((quiz) => (
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

// Export the Quiz interface for reuse
export type { Quiz };
