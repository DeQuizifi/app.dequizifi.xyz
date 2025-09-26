import { QuizzesList } from "./QuizzesList";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
  description?: string;
}

const mockQuizzes: Quiz[] = [
  {
    id: 1,
    quizName: "DEX vs CEX",
    peopleJoined: 158,
    hoursLeftToStart: 12,
    description:
      "Compare decentralized and centralized exchanges: mechanics, custody tradeoffs, liquidity, fees, and security considerations for traders and builders.",
  },
  {
    id: 2,
    quizName: "DeFi Arena",
    peopleJoined: 158,
    hoursLeftToStart: 12,
    description:
      "Fast-paced DeFi questions testing knowledge on AMMs, lending, liquidations, and composability across modern protocols and strategies.",
  },
  {
    id: 3,
    quizName: "NFT Fundamentals",
    peopleJoined: 142,
    hoursLeftToStart: 12,
    description:
      "Understand NFT standards, metadata, marketplaces, and creative economics that drive collectible and utility use-cases in web3.",
  },
  {
    id: 4,
    quizName: "Price Prediction Showdown",
    peopleJoined: 190,
    hoursLeftToStart: 10,
    description:
      "Test your market intuition with historical data, technical indicators, and scenario-based price prediction challenges under time pressure.",
  },
  {
    id: 5,
    quizName: "Crypto Mining Mastery",
    peopleJoined: 167,
    hoursLeftToStart: 1,
    description:
      "Learn mining fundamentals: consensus algorithms, hardware tradeoffs, rewards, difficulty adjustments, and environmental impact considerations.",
  },
];

export function QuizTrendingList() {
  return <QuizzesList title="Trending Contests" quizzes={mockQuizzes} />;
}
