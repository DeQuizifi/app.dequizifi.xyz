import React from "react";
import { User } from "lucide-react";

interface LeaderboardListProps {
  users: Array<{
    id: string;
    rank: number;
    username: string;
    points: number;
  }>;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export default function LeaderboardList({
  users,
  onLoadMore,
  hasMore = false,
  loading = false,
}: LeaderboardListProps) {
  return (
    <div 
      className="bg-background pt-6 px-6 pb-4 relative z-10 overflow-hidden"
      style={{
        borderTopLeftRadius: '24px !important',
        borderTopRightRadius: '24px !important',
        clipPath: 'inset(0px 0px 0px 0px round 24px 24px 0px 0px)'
      }}
    >
      <div className="space-y-3">
        {/* Scrollable list container */}
        <div className="max-h-80 overflow-y-auto space-y-3 pr-2 scroll-smooth">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-all hover:bg-white/15"
              role="listitem"
              aria-label={`Rank ${user.rank}: ${user.username} with ${user.points} points`}
            >
              {/* Left side: rank and user info */}
              <div className="flex items-center space-x-4">
                {/* Rank number */}
                <div className="text-lg font-bold text-black/70 min-w-[2rem]">
                  {user.rank.toString().padStart(2, "0")}
                </div>

                {/* User avatar */}
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white/20 shadow-sm">
                  <User className="w-6 h-6 text-gray-600" aria-hidden="true" />
                </div>

                {/* Username */}
                <div className="text-base font-medium text-black/80">
                  {user.username}
                </div>
              </div>

              {/* Right side: points */}
              <div className="text-sm font-semibold text-purple-600 bg-purple-100/80 px-3 py-1 rounded-full">
                {user.points}pt
              </div>
            </div>
          ))}
        </div>

        {/* Load More button */}
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-14"
              aria-label="Load more leaderboard entries"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}

        {/* No more results message */}
        {!hasMore && users.length > 0 && (
          <div className="text-center text-purple-600 text-sm mt-4">
            You&apos;ve reached the end of the leaderboard
          </div>
        )}
      </div>
    </div>
  );
}
