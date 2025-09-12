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
    <div className="bg-background pt-0 px-6 pb-4 relative z-10 rounded-t-2xl overflow-hidden">
      <div className="space-y-8">
        {/* Scrollable list container */}
        <div className="max-h-80 overflow-y-auto space-y-3 pr-2 scroll-smooth">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-card/8 backdrop-blur-sm rounded-xl p-4 transition-all hover:bg-card/12"
              role="listitem"
              aria-label={`Rank ${user.rank}: ${user.username} with ${user.points} points`}
            >
              {/* Left side: rank and user info */}
              <div className="flex items-center space-x-4">
                {/* Rank number */}
                <div className="text-lg font-bold text-foreground-90 min-w-[2rem]">
                  {user.rank.toString().padStart(2, "0")}
                </div>

                {/* User avatar */}
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border border-[color-mix(in_srgb,var(--color-foreground)_10%,rgba(0,0,0,0))] shadow-sm">
                  <User
                    className="w-6 h-6 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>

                {/* Username */}
                <div className="text-base font-medium text-foreground">
                  {user.username}
                </div>
              </div>

              {/* Right side: points */}
              <div className="text-sm font-semibold text-[var(--primary-foreground)] bg-[color-mix(in_srgb,var(--primary)_16%,rgba(0,0,0,0))] px-3 py-1 rounded-full">
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
              className="px-6 py-3 bg-[var(--primary)] hover:brightness-90 disabled:opacity-50 text-[var(--primary-foreground)] font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 mb-14"
              aria-label="Load more leaderboard entries"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-[color-mix(in_srgb,var(--color-foreground)_30%,rgba(0,0,0,0))] border-t-[var(--primary-foreground)] rounded-full animate-spin" />
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
          <div className="text-center text-[var(--primary)] text-sm mt-4">
            You&apos;ve reached the end of the leaderboard
          </div>
        )}
      </div>
    </div>
  );
}
