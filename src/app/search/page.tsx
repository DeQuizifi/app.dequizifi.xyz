import SearchBar from "@/components/custom/searchpage/SearchBar";
import BalanceCard from "@/components/dashboard/BalanceCard";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";

export default function SearchQuiz(){
    return(
        <main>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{
                backgroundImage: `url('/images/dashboard.svg')`,
            }}/>

                 {/* Content */}
                      <div className="relative z-10 pb-safe-area-bottom">
                        {/* Header Section with Welcome and Balance */}
                        <div className="px-6 pt-12 pb-8">
                          <div className="flex items-start justify-between gap-4">
                            <WelcomeHeader name="Arion Loveless" />
                            <BalanceCard amount={60.2} />
                          </div>
                        </div>

                        {/* Search Bar */}
                        <SearchBar/>
            </div>

        </main>
    )
}