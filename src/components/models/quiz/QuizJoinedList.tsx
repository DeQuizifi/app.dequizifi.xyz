import { QuizzesList } from "./QuizzesList";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
  description?: string;
}

const mockJoinedQuizzes: Quiz[] = [
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

export function QuizJoinedList() {
  return (
    <QuizzesList title="Contests You have Joined" quizzes={mockJoinedQuizzes} />
  );
}
