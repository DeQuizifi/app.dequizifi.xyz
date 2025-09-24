import Image from "next/image";

interface QuizCardProps {
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
}

export function QuizCard({
  quizName,
  peopleJoined,
  hoursLeftToStart,
}: QuizCardProps) {
  const totalHours = 12;
  const percentage = (hoursLeftToStart / totalHours) * 100;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className=" mx-4 mb-4 rounded-2xl bg-foreground/20 backdrop-blur-sm p-4 border border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-12 h-12 flex-shrink-0">
            <Image
              src="/cube1.svg"
              alt="Quiz icon"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-semibold text-primary-foreground">
              {quizName}
            </h4>
            <p className="text-sm text-primary-foreground opacity-80">
              {peopleJoined} people joined
            </p>
          </div>
        </div>

        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 50 50">
            {/* Background circle */}
            <circle
              cx="25"
              cy="25"
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <circle
              cx="25"
              cy="25"
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-primary"
            />
          </svg>

          {/* Hours text in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">
              {hoursLeftToStart}h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
