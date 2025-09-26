import { BasicTabs } from "@/components/common/Tabs/BasicTabs";
import {QuizPlayerPointsList} from "@/components/models/quiz/QuizPlayerPointsList";
import {QuizRewardCard} from "@/components/models/quiz/QuizRewardCard";

export function QuizSlugTabs() {
  const tabs = [
    {
      id: "players",
      label: "Players",
      component: <QuizPlayerPointsList />,
    },
    {
      id: "reward",
      label: "Reward",
      component: <QuizRewardCard />,
    },
  ];

  return (
    <div className="w-full">
      <BasicTabs defaultActiveTab="players" tabs={tabs} />
    </div>
  );
}


