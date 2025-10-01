"use server";

import { actionClient } from "@/lib/action";
import { signin } from "./logic";
import { signinSchema } from "./schema";

export const signinAction = actionClient
  .inputSchema(signinSchema)
  .metadata({ actionName: "signin" })
  .action(async ({ parsedInput }) => {
    const { walletAddress } = parsedInput;

    try {
      const result = await signin(parsedInput);

      if (result.success) {
        return result.data;
      }

        // Log the error before throwing
        console.error("Sign in error:", result.error, { walletAddress });
        // In production, replace console.error with a proper logger
        throw new Error("Sign in failed: " + result.error);
    } catch (err) {
      const error = err as Error;
      const cause = error.cause as { internal: boolean } | undefined;

      if (cause?.internal) {
        throw new Error(error.message, { cause: error });
      }

      console.error("Sign in error:", error, { walletAddress });
      throw new Error("Something went wrong");
    }
  });
