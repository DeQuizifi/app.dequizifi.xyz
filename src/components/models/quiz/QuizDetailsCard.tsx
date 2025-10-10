import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
  description?: string;
}

export function QuizDetailsCard() {
  const quizInfo: Quiz = {
    id: 1,
    quizName: "Blockchain Basics",
    peopleJoined: 245,
    hoursLeftToStart: 8,
    description:
      "Introductory quiz covering blocks, consensus, transactions, and network fundamentals to build a clear foundation in blockchain technology.",
  } as Quiz;

  return (
    <div className="bg-foreground/20 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 mb-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-bold text-primary-foreground text-xl">
          {quizInfo.quizName}
        </h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Share">
            <Share2 className="h-5 w-5 text-primary-foreground" />
          </Button>
          <Button size="lg">
            Join
          </Button>
        </div>
      </div>

      {quizInfo.description && (
        <p className="text-primary-foreground text-sm leading-relaxed mb-6">
          {quizInfo.description}
        </p>
      )}

      <div className="flex items-center gap-6">
        <div className="text-primary-foreground">
          <span className="text-xl font-semibold">
            {quizInfo.hoursLeftToStart}
          </span>
          <span className="text-sm ml-2">hours left</span>
        </div>
        <div className="text-primary-foreground">
          <span className="text-xl font-semibold">{quizInfo.peopleJoined}</span>
          <span className="text-sm ml-2">People Joined</span>
        </div>
      </div>
    </div>
  );
}
