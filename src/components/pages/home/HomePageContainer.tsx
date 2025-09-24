import { UserNameBalance } from "@/components/models/user/UserNameBalanceCard";
import { InviteCard } from "@/components/common/Cards/InviteCard";
import { UserRecentQuiz } from "@/components/models/user/UserRecentQuizCard";
import { QuizTrendingList } from "@/components/models/quiz/QuizTrendingList";

export function HomePageContainer() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/dashboard.svg')]">
      <UserNameBalance />
      <UserRecentQuiz/>
      <InviteCard />
      <QuizTrendingList/>
    </div>
  );
}
