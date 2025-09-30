import { BasicTabs } from "@/components/common/Tabs/BasicTabs";
import { Quiz, QuizzesList } from "@/components/models/quiz/QuizzesList";
import { Input } from "@/components/ui/input";

const latestQuizzes: Quiz[] = [
  {
    id: 1,
    quizName: "Blockchain Basics",
    peopleJoined: 245,
    hoursLeftToStart: 8,
    description:
      "Introductory quiz covering blocks, consensus, transactions, and network fundamentals to build a clear foundation in blockchain technology.",
  },
  {
    id: 2,
    quizName: "Smart Contracts 101",
    peopleJoined: 189,
    hoursLeftToStart: 5,
    description:
      "Core concepts and examples of smart contracts, common patterns, vulnerabilities, and best practices for secure on-chain logic.",
  },
  {
    id: 3,
    quizName: "Web3 Security",
    peopleJoined: 167,
    hoursLeftToStart: 3,
    description:
      "Practical security scenarios for web3: threat modeling, common exploits, defensive coding, and incident response fundamentals.",
  },
];

const singlePlayerQuizzes: Quiz[] = [
  {
    id: 1,
    quizName: "Solo Crypto Challenge",
    peopleJoined: 95,
    hoursLeftToStart: 6,
    description:
      "A self-paced challenge testing diverse crypto topics from basics to advanced concepts, ideal for skill sharpening and practice.",
  },
  {
    id: 2,
    quizName: "Bitcoin Knowledge Test",
    peopleJoined: 78,
    hoursLeftToStart: 9,
    description:
      "Focused questions about Bitcoin's design, consensus, history, and protocol specifics to assess fundamental network understanding.",
  },
  {
    id: 3,
    quizName: "Ethereum Deep Dive",
    peopleJoined: 112,
    hoursLeftToStart: 14,
    description:
      "In-depth exploration of Ethereum mechanics, EVM behavior, gas economics, and advanced developer tooling and standards.",
  },
];

const contestQuizzes: Quiz[] = [
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

export function SearchQuizzesTabs() {
  const tabs = [
    {
      id: "latest",
      label: "Latest",
      component: <QuizzesList title="Latest Quizzes" quizzes={latestQuizzes} />,
    },
    {
      id: "quiz",
      label: "Quiz",
      component: (
        <QuizzesList
          title="Single Player Quizzes"
          quizzes={singlePlayerQuizzes}
        />
      ),
    },
    {
      id: "contest",
      label: "Contest",
      component: (
        <QuizzesList title="Contest Quizzes" quizzes={contestQuizzes} />
      ),
    },
    {
      id: "friends",
      label: "Friends",
      component: (
        <div className="p-4">
          <p className="text-primary-foreground">
            Friends tab content will be implemented later
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full sm:px-8 md:px-12">
      <Input
        placeholder="Search Quizzes"
        aria-label="Search quizzes"
        className="w-full rounded-2xl bg-foreground/20 backdrop-blur-md border-0 shadow-none focus:text-primary-foreground/80 placeholder:text-primary-foreground/80 p-8 focus-visible:ring-0 focus-visible:border-0 font-mono"
      />

      <div className="mt-6">
        <BasicTabs defaultActiveTab="latest" tabs={tabs} />
      </div>
    </div>
  );
}
