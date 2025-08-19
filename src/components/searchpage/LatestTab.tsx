import Image from "next/image";

export default function LatestTab() {
  const cards = [
    { title: "DEX vs CEX", description: "20 questions", plays: "1234" },
    { title: "Unstable Coin", description: "20 questions", plays: "1204" },
    { title: "DEX vs CEX", description: "20 questions", plays: "1234" },
    { title: "DEX vs CEX", description: "20 questions", plays: "1234" },
  ];

  return (
    <div className=" mt-4 ">
      <div className="flex flex-col gap-4 w-full mx-auto">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="w-full rounded-xl px-6 py-5 shadow-sm transition bg-white/90 backdrop-blur-sm hover:shadow-md"
            style={{
              backgroundColor: "var(--quiz-card-bg)",
              border: "1px solid var(--quiz-card-border)",
            }}
          >
            <div className="flex items-center w-full gap-5">
              {/* Icon */}
              <div className="flex-shrink-0">
                <Image
                  src="/cube1.svg"
                  alt="Quiz Icon"
                  width={52}
                  height={52}
                  className="object-contain"
                  priority
                />
              </div>
              {/* Title + Description */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[15px] sm:text-base leading-tight text-gray-900 truncate">
                  {card.title}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {card.description}
                </p>
              </div>
              {/* Plays */}
              <div className="flex flex-col items-end justify-center flex-shrink-0 pl-2 text-right">
                <span className="font-semibold text-base leading-tight text-gray-900">
                  {card.plays}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">Plays</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
