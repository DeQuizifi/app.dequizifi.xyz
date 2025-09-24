import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QuizzesList, Quiz } from "@/components/models/quiz/QuizzesList";

const latestQuizzes: Quiz[] = [
  {
    id: 1,
    quizName: "Blockchain Basics",
    peopleJoined: 245,
    hoursLeftToStart: 8,
  },
  {
    id: 2,
    quizName: "Smart Contracts 101",
    peopleJoined: 189,
    hoursLeftToStart: 5,
  },
  {
    id: 3,
    quizName: "Web3 Security",
    peopleJoined: 167,
    hoursLeftToStart: 3,
  },
];

const singlePlayerQuizzes: Quiz[] = [
  {
    id: 1,
    quizName: "Solo Crypto Challenge",
    peopleJoined: 95,
    hoursLeftToStart: 6,
  },
  {
    id: 2,
    quizName: "Bitcoin Knowledge Test",
    peopleJoined: 78,
    hoursLeftToStart: 9,
  },
  {
    id: 3,
    quizName: "Ethereum Deep Dive",
    peopleJoined: 112,
    hoursLeftToStart: 14,
  },
];

const contestQuizzes: Quiz[] = [
  {
    id: 1,
    quizName: "DeFi Championship",
    peopleJoined: 320,
    hoursLeftToStart: 24,
  },
  {
    id: 2,
    quizName: "Crypto Trading Battle",
    peopleJoined: 285,
    hoursLeftToStart: 18,
  },
  {
    id: 3,
    quizName: "NFT Masters Contest",
    peopleJoined: 198,
    hoursLeftToStart: 15,
  },
];

export function SearchTabs() {
  return (
    <Tabs defaultValue="latest" className="w-full mt-6">
      <TabsList className="bg-transparent p-0 h-auto w-full justify-start rounded-none">
        <TabsTrigger
          value="latest"
          className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-0 border-b-4 border-transparent data-[state=active]:border-b-primary-foreground rounded-none px-4 py-2 text-primary-foreground transition-all duration-300 ease-in-out"
        >
          Latest
        </TabsTrigger>
        <TabsTrigger
          value="quiz"
          className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-0 border-b-4 border-transparent data-[state=active]:border-b-primary-foreground rounded-none px-4 py-2 text-primary-foreground transition-all duration-300 ease-in-out"
        >
          Quiz
        </TabsTrigger>
        <TabsTrigger
          value="contest"
          className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-0 border-b-4 border-transparent data-[state=active]:border-b-primary-foreground rounded-none px-4 py-2 text-primary-foreground transition-all duration-300 ease-in-out"
        >
          Contest
        </TabsTrigger>
        <TabsTrigger
          value="friends"
          className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-0 border-b-4 border-transparent data-[state=active]:border-b-primary-foreground rounded-none px-4 py-2 text-primary-foreground transition-all duration-300 ease-in-out"
        >
          Friends
        </TabsTrigger>
      </TabsList>

      <TabsContent value="latest" className="mt-4">
        <QuizzesList title="Latest Quizzes" quizzes={latestQuizzes} />
      </TabsContent>

      <TabsContent value="quiz" className="mt-4">
        <QuizzesList
          title="Single Player Quizzes"
          quizzes={singlePlayerQuizzes}
        />
      </TabsContent>

      <TabsContent value="contest" className="mt-4">
        <QuizzesList title="Contest Quizzes" quizzes={contestQuizzes} />
      </TabsContent>

      <TabsContent value="friends" className="mt-4">
        <div className="p-4">
          <p className="text-primary-foreground">
            Friends tab content will be implemented later
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
