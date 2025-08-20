import Image from "next/image";

export default function LatestTab() {
  const cards = [
    { title: "DEX vs CEX", description: "20 questions", plays: "1234" },
    { title: "Unstable Coin", description: "20 questions", plays: "1204" },
    { title: "DEX vs CEX", description: "20 questions", plays: "1234" },
    { title: "DEX vs CEX", description: "20 questions", plays: "1234" },
  ];

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-4 w-full min-w-[370px] mx-auto">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="w-full rounded-3xl px-5 py-4 shadow-sm bg-white border border-gray-100"
          >
            <div className="flex items-center w-full gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <Image
                  src="/cube1.svg"
                  alt="Quiz Icon"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              {/* Title + Description */}
              <div className="flex-1 min-w-0">
                <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                  {card.title}
                </p>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
              {/* Plays */}
              <div className="flex flex-col items-end justify-center flex-shrink-0">
                <span className="text-lg font-semibold text-gray-900">
                  {card.plays}
                </span>
                <span className="text-sm font-normal text-gray-500">Plays</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
