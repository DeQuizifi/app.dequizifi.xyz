"use client";

// ...existing code...
import { User } from "lucide-react";

interface ProfileWelcomeHeaderProps {
  name?: string;
  walletaddress: string;
}

export default function ProfileWelcomeHeader({
  name = "User",
  walletaddress,
}: ProfileWelcomeHeaderProps) {
  return (
    <div className="flex-1">
      <div className="flex space-y-1">
        <User
          width={60}
          height={60}
          className="rounded-full mr-3 bg-background p-2"
        />
        <div className="flex flex-col justify-center">
          <h1
            className="text-welcome-foreground text-2xl font-bold"
            aria-label={`Welcome ${name}`}
          >
            {name}
          </h1>
          <p className="text-welcome-foreground-90 text-sm">{walletaddress}</p>
        </div>
      </div>
    </div>
  );
}
