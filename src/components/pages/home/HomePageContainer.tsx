import { InviteCard } from "@/components/common/Cards/InviteCard";
import { QuizTrendingList } from "@/components/models/quiz/QuizTrendingList";
import { UserRecentQuiz } from "@/components/models/user/UserRecentQuizCard";

export function HomePageContainer() {
  return (
    <>
      <UserRecentQuiz />
      <InviteCard />
      <QuizTrendingList />
    </>
  );
}

