
import TrendingQuizzesList from "./TrendingQuizzesList";

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
      <TrendingQuizzesList/>
    </div>
  );
}
