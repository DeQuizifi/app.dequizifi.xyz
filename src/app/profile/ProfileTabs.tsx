"use client";

import Details from "@/components/profile/Details";
import Rewards from "@/components/profile/Rewards";
import Settings from "@/components/profile/Settings";
import Statistics from "@/components/profile/Statistics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/userContext";

export default function ProfileTabs() {
  const { username, address } = useUser();

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-transparent">
        <TabsTrigger value="details" className="text-sm">
          Details
        </TabsTrigger>
        <TabsTrigger value="statistics" className="text-sm">
          Statistics
        </TabsTrigger>
        <TabsTrigger value="rewards" className="text-sm">
          Rewards
        </TabsTrigger>
        <TabsTrigger value="settings" className="text-sm">
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="mt-6">
        <Details
          username={username || "User"}
          walletAddress={address ?? "Not Set"}
          joinedDate={""}
          favQuizTopic={"None"}
        />
      </TabsContent>

      <TabsContent value="statistics" className="mt-6">
        <Statistics />
      </TabsContent>

      <TabsContent value="rewards" className="mt-6">
        <Rewards />
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}
