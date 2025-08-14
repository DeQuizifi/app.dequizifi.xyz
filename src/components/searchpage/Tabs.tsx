// import {Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Tab() {
  return (
   <div>
      <Tabs defaultValue="latest" className="flex justify-center items-center w-full mt-10 rounded-none">
        <TabsList className="font-mono space-x-4 bg-background mt-2">
          <TabsTrigger value="latest" className="text-lg rounded-none">Latest</TabsTrigger>
          <TabsTrigger value="quiz" className="text-lg rounded-none">Quiz</TabsTrigger>
          <TabsTrigger value="contest" className="text-lg rounded-none">Contest</TabsTrigger>
          <TabsTrigger value="friends" className="text-lg rounded-none">Friends</TabsTrigger>
        </TabsList>

      </Tabs>
    </div>
  );
}
