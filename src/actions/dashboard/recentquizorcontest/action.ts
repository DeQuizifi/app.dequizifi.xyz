"use server";

import { authActionClient } from "@/lib/action";
import { getRecentQuizOrContest } from "./logic";
import { getRecentQuizOrContestSchema } from "./schema";

export const getRecentQuizOrContestAction = authActionClient
  .inputSchema(getRecentQuizOrContestSchema)
  .metadata({ actionName: "getRecentQuizOrContest" })
  .action(async ({ parsedInput, ctx }) => {
    const userId = ctx.user.id;
    try {
      const recentActivityResult = await getRecentQuizOrContest(
        parsedInput,
        userId
      );

      if (recentActivityResult.success) {
        return recentActivityResult.data;
      }

      throw new Error(recentActivityResult.error);
    } catch (error) {
      console.error("Recent quiz or contest fetch error:", error, { userId });
      throw new Error("Something went wrong", { cause: error });
    }
  });
