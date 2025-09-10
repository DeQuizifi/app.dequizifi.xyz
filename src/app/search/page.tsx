"use client";
import SearchBar from "@/components/searchpage/SearchBar";
import BalanceCard from "@/components/dashboard/BalanceCard";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import Tab from "@/components/searchpage/Tabs";
import { useUser } from "@/context/userContext";
import { useState } from "react";

export default function SearchQuiz() {
   const { username, balance } = useUser();
   const [search, setSearch] = useState("");
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
            <WelcomeHeader name={username ?? undefined} />
            <BalanceCard amount={balance ?? 0} />
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar search={search} onChangeHandler={setSearch}/>

        <div className="bg-background h-screen rounded-t-3xl">
          {/* Tabs */}
          <Tab search={search}/>
        </div>
      </div>
    </main>
  );
}
