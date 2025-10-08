import React from "react";
import { User } from "lucide-react";

interface Player {
  rank: number;
  name: string;
  xp: number;
}

const players: Player[] = [
  { rank: 1, name: "Jesica", xp: 32 },
  { rank: 2, name: "Elsa", xp: 29 },
  { rank: 3, name: "Felix", xp: 28 },
  { rank: 4, name: "Jordan", xp: 22 },
  { rank: 5, name: "Holland", xp: 12 },
];

export function QuizPlayerPointsList() {
  return (
    <div className="w-full max-w-md mx-auto">
      <ul className="space-y-1">
        {players.map((p) => (
          <li
            key={p.rank}
            className="flex items-center justify-between bg-foreground/20 backdrop-blur-sm rounded-2xl px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-primary-foreground w-6">
                {String(p.rank).padStart(2, "0")}
              </div>

              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>

              <div>
                <div className="text-sm font-medium text-primary-foreground">
                  {p.name}
                </div>
              </div>
            </div>

            <div className="text-sm text-primary-foreground">XP {p.xp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


