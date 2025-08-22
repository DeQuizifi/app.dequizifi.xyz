import { Card } from "@/components/ui/card";

type Friend = {
  id: string;
  name: string;
  status: "online" | "offline" | "playing";
  mutualQuizzes: number;
};

export default function FriendsTab({ friends }: { friends?: Friend[] }) {
  const placeholder: Friend[] = [
    { id: "f1", name: "Aisha Khan", status: "online", mutualQuizzes: 4 },
    { id: "f2", name: "Ravi Patel", status: "playing", mutualQuizzes: 2 },
    { id: "f3", name: "Meera Joshi", status: "offline", mutualQuizzes: 7 },
  ];

  const list = friends && friends.length ? friends : placeholder;

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-4 w-full min-w-[370px] mx-auto">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Friends</h2>
          <div className="space-y-2">
            {list.map((f) => (
              <Card
                key={f.id}
                className="flex flex-row items-center justify-between px-4 py-6 rounded-md border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm`}
                  >
                    {f.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{f.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {f.mutualQuizzes} shared quizzes
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm ${
                      f.status === "offline" ? "text-muted-foreground" : ""
                    }`}
                    style={{
                      color:
                        f.status === "online"
                          ? "var(--chart-1)"
                          : f.status === "playing"
                          ? "var(--chart-3)"
                          : undefined,
                    }}
                  >
                    {f.status}
                  </div>
                  <button className="mt-1 px-3 py-1 rounded-md bg-primary text-white text-sm">
                    Invite
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
