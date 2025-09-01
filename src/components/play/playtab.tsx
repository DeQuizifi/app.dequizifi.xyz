import React, { useState } from "react";

type TabKey = "players" | "reward";

export default function PlayTab() {
  const [active, setActive] = useState<TabKey>("players");

  return (
    // Outer container adds horizontal padding so the tab doesn't touch the screen
    <div className="px-6 sm:px-8 lg:px-12">
      {/* Tabs header */}
      <div className="flex items-end gap-6 border-b border-transparent">
        <button
          aria-pressed={active === "players"}
          onClick={() => setActive("players")}
          className={`pb-3 text-lg font-semibold transition-colors outline-none focus:outline-none ${
            active === "players"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500"
          }`}
        >
          Players
        </button>

        <button
          aria-pressed={active === "reward"}
          onClick={() => setActive("reward")}
          className={`pb-3 text-lg font-semibold transition-colors outline-none focus:outline-none ${
            active === "reward"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500"
          }`}
        >
          Reward
        </button>
      </div>

      {/* Content area with spacing and card-like placeholder */}
      <div className="mt-4">
        {active === "players" ? (
          <div>
            <div className="rounded-2xl border-2 border-gray-200 p-4 text-sm text-gray-700 bg-white max-w-full">
              {/* PlayerTab component will be rendered here. */}
            </div>
          </div>
        ) : (
          <div>
            <div className="rounded-2xl border-2 border-gray-200 p-4 text-sm text-gray-700 bg-white max-w-full">
              {/* RewardTab component will be rendered here. */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
