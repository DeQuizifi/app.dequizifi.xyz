import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QuizLatestList } from "./QuizLatestList";
import { QuizMultiPlayerList } from "./QuizMultiPlayerList";
import { QuizSinglePlayerList } from "./QuizSinglePlayerList";

export function QuizSearchTab() {
  return (
    <div className="w-full px-6 sm:px-8 md:px-12">
      <Input
        placeholder="Search Quizzes"
        aria-label="Search quizzes"
        className="w-full rounded-2xl bg-foreground/30 border-0 shadow-none focus:text-primary-foreground/80 placeholder:text-primary-foreground/80 px-6 py-10 focus-visible:ring-0 focus-visible:border-0 mt-16 font-mono"
      />

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
          <QuizLatestList />
        </TabsContent>

        <TabsContent value="quiz" className="mt-4">
          <QuizSinglePlayerList />
        </TabsContent>

        <TabsContent value="contest" className="mt-4">
          <QuizMultiPlayerList />
        </TabsContent>

        <TabsContent value="friends" className="mt-4">
          <div className="p-4">
            <p className="text-primary-foreground">
              Friends tab content will be implemented later
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
