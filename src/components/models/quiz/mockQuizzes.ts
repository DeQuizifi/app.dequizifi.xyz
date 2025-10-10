interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
  description?: string;
}

export const mockJoinedQuizzes: Quiz[] = [
  {
    id: 101,
    quizName: "Weekly Crypto Quiz",
    peopleJoined: 42,
    hoursLeftToStart: 6,
    description:
      "Short weekly quiz covering crypto fundamentals, market trends, and practical tokenomics examples to sharpen trading and research skills.",
  },
  {
    id: 102,
    quizName: "Solidity Basics",
    peopleJoined: 28,
    hoursLeftToStart: 3,
    description:
      "Hands-on introduction to Solidity syntax, contract structure, and common pitfalls for safe smart contract development and auditing.",
  },
  {
    id: 103,
    quizName: "Tokenomics Deep Dive",
    peopleJoined: 16,
    hoursLeftToStart: 48,
    description:
      "Explore token supply mechanics, incentives, and economic models that influence project valuation and long-term network health.",
  },
];

export const mockQuizzes: Quiz[] = [
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

export const contestQuizzes: Quiz[] = [
  {
    id: 1,
    quizName: "DeFi Championship",
    peopleJoined: 320,
    hoursLeftToStart: 24,
    description:
      "Competitive timed contest on DeFi protocols, strategies, on-chain analytics, and real-world scenario problem solving skills.",
  },
  {
    id: 2,
    quizName: "Crypto Trading Battle",
    peopleJoined: 285,
    hoursLeftToStart: 18,
    description:
      "Head-to-head trading challenges focused on market concepts, risk management, and rapid decision-making under simulated conditions.",
  },
  {
    id: 3,
    quizName: "NFT Masters Contest",
    peopleJoined: 198,
    hoursLeftToStart: 15,
    description:
      "Contest on NFT ecosystems including valuation, rarity, utility mechanics, and community-driven creative strategies.",
  },
];
