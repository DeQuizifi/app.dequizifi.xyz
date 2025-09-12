import { useState } from "react";
import PlayersTab from "./playersTab";

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
          className={`pb-3 text-lg font-semibold transition-colors outline-none focus:outline-none border-b-2 ${
            active === "players"
              ? "text-[var(--primary)] border-b-[var(--primary)]"
              : "text-[var(--muted-foreground)] border-b-transparent"
          }`}
        >
          Players
        </button>

        <button
          aria-pressed={active === "reward"}
          onClick={() => setActive("reward")}
          className={`pb-3 text-lg font-semibold transition-colors outline-none focus:outline-none border-b-2 ${
            active === "reward"
              ? "text-[var(--primary)] border-b-[var(--primary)]"
              : "text-[var(--muted-foreground)] border-b-transparent"
          }`}
        >
          Reward
        </button>
      </div>

      {/* Content area with spacing and card-like placeholder */}
      <div className="mt-4">
        {active === "players" ? (
          <div>
            <div className="text-sm max-w-full bg-[var(--quiz-card-bg)] text-[var(--quiz-subtitle-color)]">
              {/* PlayerTab component will be rendered here. */}
              <PlayersTab />
            </div>
          </div>
        ) : (
          <div>
            <div className="text-sm max-w-full bg-[var(--quiz-card-bg)] text-[var(--quiz-subtitle-color)]">
              {/* RewardTab component will be rendered here. */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
