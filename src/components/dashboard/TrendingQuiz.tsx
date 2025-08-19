import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function TrendingQuiz() {
  const cards: { title: string; description: string; action: string }[] = [
    { title: "DEX vs CEX", description: "20 questions", action: "1234" },
    { title: "Unstable Coin", description: "20 questions", action: "1204" },
    { title: "Layer 2 Trivia", description: "15 questions", action: "984" },
    {
      title: "Smart Contract Basics",
      description: "10 questions",
      action: "762",
    },
    { title: "Market Mechanics", description: "25 questions", action: "2041" },
  ];

  return (
    <div className="border border-gray-200 bg-white rounded-t-xl p-4 shadow-sm">
      <h1 className="text-2xl font-semibold mx-2 my-2">Trending Quizzes</h1>
      {/* center the card list so each card can use mx-auto / max-w on small screens */}
      <div className="flex flex-col items-center">
        {cards.map((c, i) => (
          <ReusableCard
            key={`${c.title}-${c.action}-${i}`}
            title={c.title}
            description={c.description}
            action={c.action}
            isLast={i === cards.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export function ReusableCard({
  title,
  description,
  action,
  isLast = false,
}: {
  title: string;
  description: string;
  action: string;
  isLast?: boolean;
}) {
  return (
    <Card
      className={`my-2 w-full max-w-[370px] h-[110px] mx-auto ${
        isLast ? "mb-24 sm:mb-30" : ""
      }`}
    >
      <CardHeader className="flex items-center justify-between h-full">
        <div className="flex items-start gap-3">
          <Image
            src="/cube1.svg"
            alt="cube"
            width={48}
            height={38}
            className="rounded"
          />
          <div>
            <CardTitle className="text-lg sm:text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        <CardAction className="flex flex-col items-center font-semibold">
          <span className="text-lg">{action}</span>
          <span className="text-sm font-normal text-gray-500">Plays</span>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
