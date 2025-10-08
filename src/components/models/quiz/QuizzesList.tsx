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
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <h3 className="mb-4 text-2xl font-bold text-primary-foreground">
        {title}
      </h3>

      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
