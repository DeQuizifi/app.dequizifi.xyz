import { mockPrizePool, mockRewardDistribution } from "@/lib/data/mockData";

interface RewardTabProps {
  className?: string;
}

export const RewardTab: React.FC<RewardTabProps> = ({ className }) => {
  return (
    <div
      className={
        "w-full max-w-md mx-auto bg-card rounded-2xl shadow-none p-4 border-0 text-[var(--color-foreground)]" +
        (className ? ` ${className}` : "")
      }
      role="region"
      aria-label="Prize distribution"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-bold text-[var(--circular-fill)] tracking-[0.01em]">
          Total Prize Pool
        </div>

        <div className="text-sm font-semibold text-[var(--circular-fill)] tracking-[0.01em]">
          {mockPrizePool.amount} {mockPrizePool.currency}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {mockRewardDistribution.map((r, idx) => {
          const fontClasses = [
            "text-2xl",
            "text-lg",
            "text-base",
            "text-sm",
            "text-xs",
          ];
          const smallFontClasses = [
            "text-xl",
            "text-lg",
            "text-base",
            "text-sm",
            "text-xs",
          ];

          const fontClass = fontClasses[idx] ?? "text-xs";
          const smallFontClass = smallFontClasses[idx] ?? "text-xs";

          return (
            <div
              key={r.id}
              className="flex items-center justify-between py-1.5 px-0.5"
            >
              <div className="truncate">
                <div className={`${fontClass} font-medium leading-[1]`}>
                  {r.label}
                </div>
              </div>

              <div className="flex items-center justify-end min-w-[72px]">
                <div className={`${smallFontClass} font-semibold`}>
                  {r.percent}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RewardTab;
