import { BasicTabs } from "@/components/common/Tabs/BasicTabs";
import { QuizListContainer } from "@/components/models/quiz/QuizListContainer";
import { Input } from "@/components/ui/input";
import { latestQuizzes } from "./latestQuizzes";
import { singlePlayerQuizzes } from "./singlePlayerQuizzes";
import { contestQuizzes } from "./contestQuizzes";

export function SearchQuizzesTabs() {
  const tabs = [
    {
      id: "latest",
      label: "Latest",
      component: <QuizListContainer title="Latest Quizzes" quizzes={latestQuizzes} />,
    },
    {
      id: "quiz",
      label: "Quiz",
      component: (
        <QuizListContainer
          title="Single Player Quizzes"
          quizzes={singlePlayerQuizzes}
        />
      ),
    },
    {
      id: "contest",
      label: "Contest",
      component: (
        <QuizListContainer title="Contest Quizzes" quizzes={contestQuizzes} />
      ),
    },
    {
      id: "friends",
      label: "Friends",
      component: (
        <div className="p-4">
          <p className="text-primary-foreground">
            Friends tab content will be implemented later
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full sm:px-8 md:px-12">
      <Input
        placeholder="Search Quizzes"
        aria-label="Search quizzes"
        className="w-full rounded-2xl bg-foreground/20 backdrop-blur-md border-0 shadow-none focus:text-primary-foreground/80 placeholder:text-primary-foreground/80 p-8 focus-visible:ring-0 focus-visible:border-0 font-mono"
      />

      <div className="mt-6">
        <BasicTabs defaultActiveTab="latest" tabs={tabs} />
      </div>
    </div>
  );
}
