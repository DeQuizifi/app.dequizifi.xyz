import { InviteCard } from "@/components/common/Cards/InviteCard";
import { UserRecentQuiz } from "@/components/models/user/UserRecentQuizCard";
import { QuizTrendingList } from "@/components/models/quiz/QuizTrendingList";

export function HomePageContainer() {
  return (
    <>
      <UserRecentQuiz />
      <InviteCard />
      <QuizTrendingList />
    </>
  );
}
