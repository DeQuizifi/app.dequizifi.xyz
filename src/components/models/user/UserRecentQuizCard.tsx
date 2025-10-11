export function UserRecentQuiz() {
  const percentage = 69; // This should ideally come from props
  const radius = 35;
  const centerX = 40;
  const centerY = 40;

  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  let progressPath = '';
  if (clampedPercentage > 0) {
    if (clampedPercentage === 100) {
      // Draw a full circle by drawing two half-circles
      // This is a common SVG trick to draw a full circle with arcs
      const startPoint = `${centerX} ${centerY - radius}`;
      const endPoint = `${centerX - 0.01} ${centerY - radius}`; // Slightly offset to make it a valid arc

      progressPath = `M ${startPoint} A ${radius} ${radius} 0 1 1 ${endPoint} A ${radius} ${radius} 0 1 1 ${startPoint} Z`;
    } else {
      // Calculate the end point of the arc for the given percentage
      const angle = (clampedPercentage / 100) * 2 * Math.PI - Math.PI / 2; // Start from top (-90 degrees)
      const endX = centerX + radius * Math.cos(angle);
      const endY = centerY + radius * Math.sin(angle);

      // Large arc flag: 1 if the arc is greater than 180 degrees
      const largeArcFlag = clampedPercentage > 50 ? 1 : 0;

      progressPath = `M ${centerX} ${centerY - radius} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} L ${centerX} ${centerY} Z`;
    }
  }

  return (
    <div className="rounded-3xl bg-card p-8 shadow-lg border border-border">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-bold text-muted-foreground tracking-widest">
            RECENT QUIZ
          </h3>
          <h4 className="text-2xl font-bold text-foreground">
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
            {clampedPercentage > 0 && (
              <path
                d={progressPath}
                fill="currentColor"
                className="text-primary"
              />
            )}
          </svg>

          {/* Percentage text in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-foreground">
              {clampedPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
