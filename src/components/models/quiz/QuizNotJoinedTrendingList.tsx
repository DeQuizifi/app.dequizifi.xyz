import { QuizNotJoinedTrendingCard } from "./QuizNotJoinedTrendingCard";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
  description?: string;
}

const mockNotJoinedQuizzes: Quiz[] = [
  {
    id: 201,
    quizName: "Algorithmic Stablecoins",
    peopleJoined: 20,
    hoursLeftToStart: 18,
    description:
      "Explore algorithmic mechanisms that maintain stable value without centralized backing through automated monetary policy and market incentives.",
  },
  {
    id: 202,
    quizName: "Layer 2 Scaling",
    peopleJoined: 278,
    hoursLeftToStart: 8,
    description:
      "Deep dive into rollups, sidechains, and state channels that increase blockchain throughput while maintaining security and decentralization.",
  },
  {
    id: 203,
    quizName: "Cross-Chain Mechanics",
    peopleJoined: 199,
    hoursLeftToStart: 2,
    description:
      "Understanding bridges, atomic swaps, and interoperability protocols that enable seamless value transfer across different blockchain networks.",
  },
  {
    id: 204,
    quizName: "NFT Valuation",
    peopleJoined: 144,
    hoursLeftToStart: 16,
    description:
      "Analyze factors driving digital asset pricing including rarity, utility, provenance, and market sentiment in collectible ecosystems.",
  },
  {
    id: 205,
    quizName: "Advanced DeFi Strategies",
    peopleJoined: 320,
    hoursLeftToStart: 4,
    description:
      "Complex yield farming, liquidity mining, and protocol governance strategies for maximizing returns in decentralized finance ecosystems.",
  },
];

export function QuizNotJoinedTrendingList() {
  return (
    <div className="mt-4">
      <h3 className="mx-4 mb-4 text-lg font-semibold text-primary-foreground">
        What would you like to play today?
      </h3>

      {/* Horizontal scrollable container */}
      <div className="px-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {mockNotJoinedQuizzes.map((quiz) => (
            <QuizNotJoinedTrendingCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
}
