import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

export default function TrendingQuiz() {
  return (
    <div className="border border-gray-200 bg-white rounded-t-xl p-4 shadow-sm">
      <h1 className="text-2xl font-semibold mx-2 my-2">Trending Quizzes</h1>
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
    </div>
  )
}

export function ReusableCard({ title, description, action }: { title: string; description: string; action: string }) {
  return (
    <Card className="my-2">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          
         <Image
            src="/cube1.svg"
            alt="cube"
            width={48}
            height={38}
            className="rounded"
          />
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        <CardAction className="flex flex-col items-center font-semibold">
          <span className="text-lg">{action}</span>
          <span className="text-sm font-normal text-gray-500">Plays</span>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

