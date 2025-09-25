"use client";

import { ReactNode, useState } from "react";

interface Tab {
  id: string;
  label: string;
  component: ReactNode;
}

interface BasicTabsProps {
  defaultActiveTab: string;
  tabs: Tab[];
  className?: string;
}

export function BasicTabs({
  defaultActiveTab,
  tabs,
  className,
}: BasicTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="border-b border-primary/20">
        <div className="flex justify-start gap-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-1 py-2 pb-3 text-sm relative transition-all duration-300 ease-in-out ${
                  isActive
                    ? "text-primary-foreground border-b-4 border-primary-foreground font-semibold"
                    : "text-primary-foreground/60 hover:text-primary-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? "block" : "hidden"}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
}
