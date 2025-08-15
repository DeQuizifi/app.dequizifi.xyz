import { ReusableCard } from "../dashboard/TrendingQuiz";

export default function LatestTab() {
  return (
    <div className="flex flex-col">
      <ReusableCard
        title="DEX vs CEX"
        description="20 questions"
        action="1234"
      />
      <ReusableCard
        title="Unstable Coin"
        description="20 questions"
        action="1204"
      />
      <ReusableCard
        title="DEX vs CEX"
        description="20 questions"
        action="1234"
      />
      <ReusableCard
        title="DEX vs CEX"
        description="20 questions"
        action="1234"
      />
    </div>
  );
}
