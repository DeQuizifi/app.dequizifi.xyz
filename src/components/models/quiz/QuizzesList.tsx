import { QuizCard } from "@/components/models/quiz/QuizCard";

export interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
  /** A short ~20 word description shown under the quiz title */
  description?: string;
}

interface QuizzesListProps {
  title: string;
  quizzes: Quiz[];
}

export function QuizzesList({ title, quizzes }: QuizzesListProps) {
  return (
    <div className="mt-4">
      <h3 className="mx-4 mb-4 text-lg font-semibold text-primary-foreground">
        {title}
      </h3>

      <div className="space-y-2">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
