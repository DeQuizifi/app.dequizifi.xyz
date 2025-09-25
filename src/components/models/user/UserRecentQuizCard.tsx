export function UserRecentQuiz() {
  const percentage = 69;
  const radius = 35;
  const centerX = 40;
  const centerY = 40;

  // Calculate the end point of the arc for the given percentage
  const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2; // Start from top (-90 degrees)
  const endX = centerX + radius * Math.cos(angle);
  const endY = centerY + radius * Math.sin(angle);

  // Large arc flag: 1 if the arc is greater than 180 degrees
  const largeArcFlag = percentage > 50 ? 1 : 0;

  return (
    <div className="rounded-2xl bg-foreground/10 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold text-primary-foreground tracking-widest">
            RECENT QUIZ
          </h3>
          <h4 className="text-xl font-semibold text-primary-foreground">
            Know Your Crypto Lingo
          </h4>
        </div>

        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20" viewBox="0 0 80 80">
            {/* Background circle (remaining percentage) */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="currentColor"
              className="text-muted/30"
            />

            {/* Progress arc (completed percentage) */}
            <path
              d={`M ${centerX} ${
                centerY - radius
              } A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} L ${centerX} ${centerY} Z`}
              fill="currentColor"
              className="text-primary"
            />
          </svg>

          {/* Percentage text in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
