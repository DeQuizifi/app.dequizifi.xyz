import { InviteCard } from "@/components/common/Cards/InviteCard";
import { QuizTrendingList } from "@/components/models/quiz/QuizTrendingList";
import { UserRecentQuiz } from "@/components/models/user/UserRecentQuizCard";

export function HomePageContainer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <QuizTrendingList />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-8">
          <UserRecentQuiz />
          <InviteCard />
        </div>
      </div>
    </div>
  );
}

