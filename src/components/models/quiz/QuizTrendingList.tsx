import { QuizzesList } from "./QuizzesList";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
}

const mockQuizzes: Quiz[] = [
  {
    id: 1,
    quizName: "DEX vs CEX",
    peopleJoined: 158,
    hoursLeftToStart: 12,
  },
  {
    id: 2,
    quizName: "DeFi Arena",
    peopleJoined: 158,
    hoursLeftToStart: 12,
  },
  {
    id: 3,
    quizName: "NFT Fundamentals",
    peopleJoined: 142,
    hoursLeftToStart: 12,
  },
  {
    id: 4,
    quizName: "Price Prediction Showdown",
    peopleJoined: 190,
    hoursLeftToStart: 10,
  },
  {
    id: 5,
    quizName: "Crypto Mining Mastery",
    peopleJoined: 167,
    hoursLeftToStart: 1,
  },
];

export function QuizTrendingList() {
  return <QuizzesList title="Trending Contests" quizzes={mockQuizzes} />;
}
