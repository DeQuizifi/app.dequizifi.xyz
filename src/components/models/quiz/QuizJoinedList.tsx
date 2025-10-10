import { QuizCard } from "./QuizCard";

import { mockJoinedQuizzes } from "./mockQuizzes";

export function QuizJoinedList() {
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
}
