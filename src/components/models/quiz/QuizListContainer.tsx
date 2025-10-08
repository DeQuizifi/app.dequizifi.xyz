import { QuizCard } from "./QuizCard";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
  description?: string;
}

interface QuizListContainerProps {
  title: string;
  quizzes: Quiz[];
}

export function QuizListContainer({ title, quizzes }: QuizListContainerProps) {
  const handlePlayNow = (id: number) => {
    console.log(`Playing quiz with ID: ${id}`);
    // Implement navigation or other logic here
  };

  return (
    <div className="mt-4">
      <h3 className="mx-4 mb-4 text-lg font-semibold text-primary-foreground">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onButtonClick={handlePlayNow} />
        ))}
      </div>
    </div>
  );
}
