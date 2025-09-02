import React from "react";
import { Upload, Clock } from "lucide-react";

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
      className="w-full rounded-xl p-4"
      style={{
        background: "var(--quiz-card-bg)",
        border: "1px solid var(--quiz-card-border)",
      }}
    >
      {/* Top row: title + actions */}
      <div className="flex items-center justify-between">
        <h3
          className="text-xl font-semibold leading-tight"
          style={{ color: "var(--quiz-title-color)" }}
        >
          {title}
        </h3>

        <div className="flex items-center gap-3">
          <button
            aria-label="Upload quiz"
            className="rounded-md p-2 flex items-center justify-center"
            style={{
              background: "transparent",
              color: "var(--quiz-subtitle-color)",
              width: "36px",
              height: "36px",
            }}
          >
            <Upload className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Join quiz"
            className="rounded-xl px-4 py-2 text-sm font-semibold"
            style={{
              background: "var(--progress-low)",
              color: "var(--primary-foreground)",
              boxShadow: "none",
            }}
          >
            Join
          </button>
        </div>
      </div>

      {/* Description */}
      <p
        className="mt-3 text-sm leading-6"
        style={{ color: "var(--quiz-subtitle-color)" }}
      >
        {subtitle}
      </p>

      {/* Bottom row: time left and joined */}
      <div className="mt-5 flex items-center gap-6">
        <div
          className="flex items-center gap-2"
          style={{ color: "var(--progress-bar-playtoday)" }}
        >
          <Clock className="h-5 w-5" />
          <span className="text-base font-semibold">{timeLeft}</span>
        </div>

        <div
          className="flex items-center gap-2"
          style={{ color: "var(--progress-bar-playtoday)" }}
        >
          <span className="text-base font-semibold">{joined}</span>
          <span className="text-base font-semibold">People Joined</span>
        </div>
      </div>
    </article>
  );
}
