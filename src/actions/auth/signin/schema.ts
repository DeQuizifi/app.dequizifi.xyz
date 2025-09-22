import { z } from "zod";

export const signinSchema = z.object({
  walletAddress: z
    .string()
    .min(1, "Wallet address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address format"),
});

export type SigninInput = z.infer<typeof signinSchema>;
