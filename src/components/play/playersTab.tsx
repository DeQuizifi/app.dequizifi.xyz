import { User2 } from "lucide-react";
import mockPlayers from "./mockPlayers";

type Props = {
  className?: string;
};

// Contract: renders a simple ranked list of players with avatar, name and XP.
// Inputs: optional className; Data: uses internal mockPlayers array.
// Output: a styled list that reads color tokens from global.css.

export default function PlayersTab({ className = "" }: Props) {
  return (
    <div className={"w-full px-6 sm:px-8 " + className}>
      {/* Use vertical spacing instead of borders to avoid a table-like look */}
      <ul className="space-y-3 list-none m-0 p-0">
        {mockPlayers.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between px-0 py-3 sm:py-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 text-sm font-bold text-muted-foreground">
                {String(p.rank).padStart(2, "0")}
              </div>

              <div
                className="w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground"
                aria-hidden
              >
                <User2 size={18} />
              </div>

             <div className="text-sm font-medium text-foreground">
                {p.name}
              </div>
            </div>

             <div className="text-sm font-semibold text-foreground">
              XP {p.xp}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
