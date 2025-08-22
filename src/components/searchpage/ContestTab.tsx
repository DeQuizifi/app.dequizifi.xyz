import { Card } from "@/components/ui/card";

export type Contest = {
  id: string;
  name: string;
  prize: string;
  entrants: number;
  endsIn: string; // human readable, e.g., "2d 4h"
};

interface ContestTabProps {
  contests?: Contest[];
}

export default function ContestTab({ contests }: ContestTabProps) {
  const placeholder: Contest[] = [
    {
      id: "c1",
      name: "Weekly Winners",
      prize: "₹500",
      entrants: 342,
      endsIn: "2d 4h",
    },
    {
      id: "c2",
      name: "Rapid Fire Championship",
      prize: "Trophy",
      entrants: 128,
      endsIn: "5d",
    },
    {
      id: "c3",
      name: "Monthly Marathon",
      prize: "Amazon Voucher",
      entrants: 860,
      endsIn: "18d",
    },
  ];

  // Before:
- const list = contests && contests.length > 0 ? contests : placeholder;
  
  // After:
  const list = contests ?? placeholder;

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Live Contests</h2>
        <div className="grid gap-3">
          {list.map((c) => (
            <Card
              key={c.id}
              className="px-4 py-6 rounded-md border-0 flex flex-row items-center justify-between shadow-sm"
              aria-label={`Contest ${c.name}`}
            >
              {/* Contest Info */}
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-muted-foreground">
                  {c.entrants} entrants • ends in {c.endsIn}
                </div>
              </div>

              {/* Prize and CTA */}
              <div className="text-right flex flex-col items-end justify-center">
                <div className="font-medium">{c.prize}</div>
                <button
                  type="button"
                  className="text-xs text-muted-foreground mt-1 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                >
                  Join now
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
