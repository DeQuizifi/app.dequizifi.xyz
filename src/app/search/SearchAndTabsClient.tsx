"use client";
import React, { useState } from "react";
import SearchBar from "@/components/searchpage/SearchBar";
import Tab from "@/components/searchpage/Tabs";

export default function SearchAndTabsClient() {
  const [search, setSearch] = useState("");
  return (
    <>
      <SearchBar search={search} onChangeHandler={setSearch} />
      <div className="bg-background h-screen rounded-t-3xl">
        <Tab search={search} />
      </div>
    </>
  );
}
