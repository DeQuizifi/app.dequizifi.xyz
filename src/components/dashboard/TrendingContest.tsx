import TrendingContestList from "./TrendingContestList";

export default function TrendingContest() {
  return (
    <div className="bg-background rounded-t-xl p-4 h-full">
      <h1 className="text-2xl font-semibold my-2">Trending Contests</h1>
      <TrendingContestList />
    </div>
  );
}
