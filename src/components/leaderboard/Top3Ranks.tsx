import React from "react";
import Image from "next/image";

interface Top3RanksProps {
  top3Users: Array<{
    id: string;
    rank: number; // 1 | 2 | 3
    username: string;
    points: number;
  }>;
}

const getCrownImage = (rank: number) => {
  switch (rank) {
    case 1:
      return "/images/rank1Crown.svg"; // yellow
    case 2:
      return "/images/rank2Crown.svg"; // ash
    case 3:
      return "/images/rank3Crown.svg"; // golden
    default:
      return "/images/rank1Crown.svg";
  }
};

export default function Top3Ranks({ top3Users }: Top3RanksProps) {
  const first = top3Users.find((u) => u.rank === 1);
  const second = top3Users.find((u) => u.rank === 2);
  const third = top3Users.find((u) => u.rank === 3);

  if (!first || !second || !third) return null;

  // Positions are relative to the component; the podium sits lower, leaving space for toppers at the top
  const positions = {
    1: { left: "50%", avatarTop: "10px", pointsBottom: "14%" },
    2: { left: "18%", avatarTop: "38px", pointsBottom: "14%" },
    3: { left: "82%", avatarTop: "38px", pointsBottom: "14%" },
  } as const;

  // Extra fine-tune for points horizontal alignment
  const pointsShift = {
    1: "0px",
    2: "28px",   // move more right
    3: "-28px",  // move more left
  } as const;

  const renderTopper = (rank: 1 | 2 | 3) => (
    <div
      className="absolute z-30 -translate-x-1/2"
      style={{ left: positions[rank].left, top: positions[rank].avatarTop as string }}
      aria-hidden
    >
      <div className="relative">
        <Image src="/images/topper.svg" alt="" width={56} height={56} />
        <Image
          src={getCrownImage(rank)}
          alt=""
          width={22}
          height={22}
          className="absolute -top-2 -right-1"
        />
      </div>
    </div>
  );

  const renderPoints = (rank: 1 | 2 | 3, points: number) => (
    <div
      className="absolute z-30 -translate-x-1/2 text-white text-sm font-semibold"
      style={{
        left: `calc(${positions[rank].left} + ${pointsShift[rank]})`,
        bottom: positions[rank].pointsBottom as string,
      }}
    >
      {points}pt
    </div>
  );

  return (
    <section aria-label="Top three leaderboard podium" className="relative mx-auto w-full max-w-[560px] h-[300px]">
      {/* Avatars with crowns (top area, not overlapping the podium) */}
      {renderTopper(2)}
      {renderTopper(1)}
      {renderTopper(3)}

      {/* Single podium image anchored to bottom to sit below toppers */}
      <div className="absolute inset-x-0 bottom-0 h-[220px]">
        <Image src="/images/rankStage.svg" alt="" fill className="object-contain" priority />
      </div>

      {/* Dynamic points below each stage */}
      {renderPoints(2, second.points)}
      {renderPoints(1, first.points)}
      {renderPoints(3, third.points)}

      {/* Hidden readable labels for a11y */}
      <span className="sr-only">First: {first.username} with {first.points} points</span>
      <span className="sr-only">Second: {second.username} with {second.points} points</span>
      <span className="sr-only">Third: {third.username} with {third.points} points</span>
    </section>
  );
}
