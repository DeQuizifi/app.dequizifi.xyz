import { QuizzesList } from "./QuizzesList";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
}

const mockJoinedQuizzes: Quiz[] = [
  {
    id: 101,
    quizName: "Weekly Crypto Quiz",
    peopleJoined: 42,
    hoursLeftToStart: 6,
  },
  {
    id: 102,
    quizName: "Solidity Basics",
    peopleJoined: 28,
    hoursLeftToStart: 3,
  },
  {
    id: 103,
    quizName: "Tokenomics Deep Dive",
    peopleJoined: 16,
    hoursLeftToStart: 48,
  },
];

export function QuizJoinedList() {
  return (
    <QuizzesList title="Contests You have Joined" quizzes={mockJoinedQuizzes} />
  );
}
