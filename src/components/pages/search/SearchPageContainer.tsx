import { QuizSearchTab } from "@/components/models/quiz/QuizSearchTab";
import { UserNameBalance } from "@/components/models/user/UserNameBalanceCard";

export function SearchPageContainer() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/dashboard.svg')]">
        <UserNameBalance />
        <QuizSearchTab/>
    </div>
  );
}
