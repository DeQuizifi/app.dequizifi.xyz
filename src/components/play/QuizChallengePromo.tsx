import { Clock, Upload } from "lucide-react";
import JoinDialog from "./JoinDialog";

type Props = {
  title?: string;
  subtitle?: string;
  timeLeft?: string;
  joined?: number;
};

export default function QuizChallengePromo({
  title = "DEX vs CEX",
  subtitle = "Think you know crypto? Test your knowledge of DEX vs CEX and see if you can spot the differences. Join now for a fun challenge and a chance to win exciting rewards!",
  timeLeft = "12 hours left",
  joined = 158,
}: Props) {
  return (
    <article
      role="region"
      aria-label={`Quiz promo: ${title}`}
      className="w-full rounded-xl p-6 mb-4 bg-card"
    >
      {/* Top row: title + actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold leading-tight text-foreground">
          {title}
        </h3>

        <div className="flex items-center gap-3">
          <button
            aria-label="Upload quiz"
            className="rounded-md p-2 flex items-center justify-center text-muted-foreground w-9 h-9"
          >
            <Upload className="h-4 w-4" />
          </button>

          <JoinDialog
            title={title}
            entryFee={"1 USDC"}
            currentPrize={"132 USDC"}
            firstPrize={"29.75 USDC"}
          />
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{subtitle}</p>

      {/* Bottom row: time left and joined */}
      <div className="mt-5 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span className="text-base font-semibold">{timeLeft}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">{joined}</span>
          <span className="text-base font-semibold">People Joined</span>
        </div>
      </div>
    </article>
  );
}
