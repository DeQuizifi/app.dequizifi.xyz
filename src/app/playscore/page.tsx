import ScoreHeader from "@/components/play/scorepage/header";
import ScoreCard from "@/components/play/scorepage/scorecard";

export default function PlayScore() {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center justify-start pt-8">
      <div className="relative w-full flex flex-col items-center">
        <ScoreHeader />
        <div className="absolute left-1/2 top-[320px] -translate-x-1/2 z-20">
          <ScoreCard />
        </div>
      </div>
    </div>
  );
}
