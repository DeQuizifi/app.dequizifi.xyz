function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return parts
    .map((p) => p[0]!)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
import React from "react";
import {
  FaUserCheck,
  FaUserClock,
  FaUserAltSlash,
  FaPaperPlane,
} from "react-icons/fa";

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
            className="w-full rounded-3xl px-5 py-4 shadow-sm bg-white border border-gray-100 transition-all duration-200 hover:shadow-lg hover:border-violet-300"
          >
            <div className="flex items-center w-full gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 relative group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-900 via-indigo-800 to-purple-700 flex items-center justify-center text-2xl font-extrabold text-white border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl">
                  {getInitials(f.name)}
                </div>
                {/* Status Ring/Badge */}
                {f.status !== "offline" && (
                  <span
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                      f.status === "online" ? "bg-green-500" : "bg-yellow-400"
                    } shadow-md`}
                  >
                    {f.status === "online" && (
                      <FaUserCheck
                        className="text-white text-xs animate-pulse"
                        title="Online"
                      />
                    )}
                    {f.status === "playing" && (
                      <FaUserClock
                        className="text-white text-xs animate-bounce"
                        title="Playing"
                      />
                    )}
                  </span>
                )}
                {f.status === "offline" && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center shadow-md">
                    <FaUserAltSlash
                      className="text-white text-xs"
                      title="Offline"
                    />
                  </span>
                )}
              </div>

              {/* Name + Quizzes */}
              <div className="flex-1 min-w-0">
                <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                  {f.name}
                </p>
                <p className="text-sm text-gray-500">
                  {f.mutualQuizzes} shared quizzes
                </p>
              </div>

              {/* Status + Invite */}
              <div className="flex flex-col items-end justify-center flex-shrink-0">
                <span
                  className={`text-lg font-semibold mb-1 ${
                    f.status === "offline"
                      ? "text-gray-400"
                      : f.status === "online"
                      ? "text-green-500"
                      : "text-yellow-500"
                  } flex items-center gap-1`}
                >
                  {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                </span>
                <button className="px-4 py-1 rounded-md bg-gradient-to-br from-violet-900 via-indigo-800 to-purple-700 hover:from-violet-800 hover:via-indigo-700 hover:to-purple-600 text-white text-sm font-medium shadow transition-all duration-150 flex items-center gap-2 group">
                  <FaPaperPlane className="group-hover:animate-bounce" /> Invite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
