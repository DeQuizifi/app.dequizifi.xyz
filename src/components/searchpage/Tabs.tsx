// import {Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LatestTab from "./LatestTab";
import QuizTab from "./QuizTab";
import ContestTab from "./ContestTab";
import FriendsTab from "./FriendsTab";

interface TabsProps {
  search: string;
}

export default function Tab({ search }: TabsProps) {
  return (
    <div>
      <div>
        <Tabs
          defaultValue="latest"
          className="flex justify-center items-center w-full mt-10 rounded-none"
        >
          <TabsList className="font-mono space-x-4 bg-background mt-2">
            <TabsTrigger value="latest" className="text-lg rounded-none">
              Latest
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-lg rounded-none">
              Quiz
            </TabsTrigger>
            <TabsTrigger value="contest" className="text-lg rounded-none">
              Contest
            </TabsTrigger>
            <TabsTrigger value="friends" className="text-lg rounded-none">
              Friends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="latest">
            <div>
              <LatestTab search={search} />
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <div>
              <QuizTab search={search} />
            </div>
          </TabsContent>

          <TabsContent value="contest">
            <div>
              <ContestTab search={search} />
            </div>
          </TabsContent>

          <TabsContent value="friends">
            <div>
              <FriendsTab />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
