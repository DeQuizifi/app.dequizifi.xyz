import Image from "next/image";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TrendingQuizzesList({
  cards,
}: {
  cards: { title: string; description: string; action: string }[];
}) {
  return (
    <div className="flex flex-col items-center">
      {cards.map((c, i) => (
        <TrendingCard
          key={`${c.title}-${c.action}-${i}`}
          title={c.title}
          description={c.description}
          action={c.action}
          isLast={i === cards.length - 1}
        />
      ))}
    </div>
  );
}

export function TrendingCard({
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
        isLast ? "mb-24 sm:mb-32" : ""
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
