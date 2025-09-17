import HeaderClient from "./HeaderClient";
import SearchAndTabsClient from "./SearchAndTabsClient";

export default function SearchQuiz() {
  return (
    <main
      className="min-h-screen bg-background relative overflow-x-hidden"
      role="main"
      aria-label="Search"
    >
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/dashboard.svg')]" />

      {/* Content */}
      <div className="relative z-10 pb-safe-area-bottom">
        {/* Header Section with Welcome and Balance */}
        <HeaderClient />

        {/* Search Bar + Tabs (client) */}
        <SearchAndTabsClient />
      </div>
    </main>
  );
}
