import React from "react";

interface Reward {
  label: string;
  value: string;
}

const rewards: Reward[] = [
  { label: "Rank 1", value: "25%" },
  { label: "Rank 2", value: "15%" },
  { label: "Rank 3", value: "12%" },
  { label: "Rank 4 to 10", value: "3.57%" },
  { label: "Remaining Players", value: "0.144%" },
];

export function QuizRewardCard() {
  return (
    <div className="max-w-md mx-auto bg-foreground/10 backdrop-blur-md rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="text-sm text-primary-foreground font-semibold">
          Total Prize Pool
        </div>
        <div className="text-sm text-primary-foreground font-semibold">
          132 USDC
        </div>
      </div>

      <ul className="space-y-3 px-2">
        {rewards.map((r, idx) => {
          // gradually reduce font size as index increases
          const size =
            idx === 0
              ? "text-lg"
              : idx === 1
              ? "text-base"
              : idx === 2
              ? "text-sm"
              : "text-sm";
          const labelSize = idx === 0 ? "text-base" : "text-sm";

          return (
            <li key={r.label} className="flex items-center justify-between">
              <div className={`${labelSize} text-primary-foreground`}>
                {r.label}
              </div>
              <div className={`${size} font-semibold text-primary-foreground`}>
                {r.value}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


