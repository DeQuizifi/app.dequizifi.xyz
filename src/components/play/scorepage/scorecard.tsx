import { Card, CardContent } from "@/components/ui/card";

export default function ScoreCard() {
  // Mock data
  const completion = 100;
  const total = 20;
  const correct = 19;
  const wrong = 1;

  return (
    <div className="flex justify-center w-full font-sans">
      <Card className="bg-[var(--score-outer)] rounded-xl p-10 w-[370px] h-[250px] text-background shadow-lg">
        <CardContent className="grid grid-cols-2 gap-y-2 gap-x-10 h-full">
          <div className="flex flex-col items-start justify-center h-full w-full">
            <div className="flex items-center gap-2 justify-start w-full">
              <span className="w-2 h-2 rounded-full bg-[var(--chart-2)]" />
              <span className="font-semibold text-2xl text-[var(--chart-2)]">
                {completion}%
              </span>
            </div>
            <div className="text-lg text-background mt-1 text-left w-full">
              Completion
            </div>
          </div>
          <div className="flex flex-col items-start justify-center h-full w-full">
            <div className="flex items-center gap-2 justify-start w-full">
              <span className="w-2 h-2 rounded-full bg-[var(--chart-2)]" />
              <span className="font-semibold text-2xl text-[var(--chart-2)]">
                {total}
              </span>
            </div>
            <div className="text-lg text-background mt-1 text-left w-full whitespace-nowrap">
              Total Question
            </div>
          </div>
          <div className="flex flex-col items-start justify-center h-full w-full">
            <div className="flex items-center gap-2 justify-start w-full">
              <span className="w-2 h-2 rounded-full bg-chart-1" />
              <span className="font-semibold text-2xl text-chart-1">
                {correct}
              </span>
            </div>
            <div className="text-lg text-background mt-1 text-left w-full">
              Correct
            </div>
          </div>
          <div className="flex flex-col items-start justify-center h-full w-full">
            <div className="flex items-center gap-2 justify-start w-full">
              <span className="w-2 h-2 rounded-full bg-[var(--destructive)]" />
              <span className="font-semibold text-2xl text-destructive">
                {wrong}
              </span>
            </div>
            <div className="text-lg text-background mt-1 text-left w-full">
              Wrong
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
