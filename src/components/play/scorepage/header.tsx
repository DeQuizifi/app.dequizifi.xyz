import { Card } from "@/components/ui/card";

export default function ScoreHeader() {
  // Mock score data
  const mockScore = 87.5;

  return (
    <div className="flex justify-center items-center min-h-[400px] p-2 w-full font-sans">
      <Card className="w-full max-w-md h-96 rounded-t-3xl rounded-b-[60px] bg-circular-bg flex items-center justify-center shadow-2xl">
        <div className="relative w-56 h-56 -mt-24">
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full bg-[var(--score-outer)] flex items-center justify-center">
            {/* Middle circle */}
            <div className="w-46 h-46 rounded-full bg-[var(--score-middle)] flex items-center justify-center">
              {/* Inner circle */}
              <div className="w-36 h-36 rounded-full bg-background flex flex-col items-center justify-center italic">
                <p className="text-md font-medium text-foreground mb-1">
                  Your Score
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {mockScore}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
