import {
  FaPaperPlane,
  FaUserAltSlash,
  FaUserCheck,
  FaUserClock,
} from "react-icons/fa";
import { Button } from "../ui/button";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return parts
    .map((p) => p[0]!)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type Friend = {
  id: string;
  name: string;
  status: "online" | "offline" | "playing";
  mutualQuizzes: number;
};

export default function FriendsTab({ friends }: { friends?: Friend[] }) {
  const placeholder: Friend[] = [
    { id: "f1", name: "John Smith", status: "online", mutualQuizzes: 4 },
    { id: "f2", name: "Emily Brown", status: "playing", mutualQuizzes: 2 },
    { id: "f3", name: "Michael Lee", status: "offline", mutualQuizzes: 7 },
    { id: "f4", name: "Sarah Johnson", status: "online", mutualQuizzes: 3 },
    { id: "f5", name: "David Miller", status: "offline", mutualQuizzes: 5 },
  ];

  const list = friends && friends.length ? friends : placeholder;

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-4 w-full min-w-[370px] mx-auto">
        {list.map((f) => (
          <div
            key={f.id}
            className="w-full rounded-3xl px-5 py-4 shadow-sm bg-card border border-border transition-all duration-200 hover:shadow-lg hover:border-primary"
          >
            <div className="flex items-center w-full gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 relative group">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-2xl font-extrabold text-primary-foreground border-4 border-card shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl">
                  {getInitials(f.name)}
                </div>
                {/* Status Ring/Badge */}
                {f.status !== "offline" && (
                  <span
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card flex items-center justify-center ${
                      f.status === "online"
                        ? "bg-primary"
                        : "bg-muted-foreground"
                    } shadow-md`}
                  >
                    {f.status === "online" && (
                      <FaUserCheck
                        className="text-card-foreground text-xs animate-pulse"
                        title="Online"
                      />
                    )}
                    {f.status === "playing" && (
                      <FaUserClock
                        className="text-card-foreground text-xs animate-bounce"
                        title="Playing"
                      />
                    )}
                  </span>
                )}
                {f.status === "offline" && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card bg-muted flex items-center justify-center shadow-md">
                    <FaUserAltSlash
                      className="text-muted-foreground text-xs"
                      title="Offline"
                    />
                  </span>
                )}
              </div>

              {/* Name + Quizzes */}
              <div className="flex-1 min-w-0">
                <p className="text-lg sm:text-2xl font-semibold text-foreground">
                  {f.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {f.mutualQuizzes} shared quizzes
                </p>
              </div>

              {/* Status + Invite */}
              <div className="flex flex-col items-end justify-center flex-shrink-0">
                <span
                  className={`text-lg font-semibold mb-1 flex items-center gap-1 ${
                    f.status === "offline"
                      ? "text-muted-foreground"
                      : f.status === "online"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                </span>
                <Button>
                  <FaPaperPlane className="group-hover:animate-bounce" /> Invite
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
