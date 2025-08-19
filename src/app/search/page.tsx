import SearchBar from "@/components/searchpage/SearchBar";
import BalanceCard from "@/components/dashboard/BalanceCard";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import Tab from "@/components/searchpage/Tabs";
import { mockBalance } from "@/lib/data/mockData";

export default function SearchQuiz() {
  return (
    <main>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/dashboard.svg')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 pb-safe-area-bottom">
        {/* Header Section with Welcome and Balance */}
        <div className="px-6 pt-12 pb-8">
          <div className="flex items-start justify-between gap-4">
            <WelcomeHeader name="Arion Loveless" />
            <BalanceCard amount={mockBalance} />
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar />

        <div className="bg-background h-screen rounded-t-3xl">
          {/* Tabs */}
          <Tab />
        </div>
      </div>
    </main>
  );
}
