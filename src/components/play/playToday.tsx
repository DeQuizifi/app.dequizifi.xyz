import Image from "next/image";
import { PlayTodayQuiz } from "@/lib/data/mockData";

interface PlayTodayProps {
  quizzes: PlayTodayQuiz[];
}

export default function PlayToday({ quizzes }: PlayTodayProps) {
  return (
    <div className="space-y-4">
      {/* Section Title */}
      <h2
        className="text-2xl font-bold px-6"
        style={{ color: "var(--card-foreground)" }}
      >
        What would you like to play <br /> today?
      </h2>

      {/* Horizontally Scrollable Quiz Cards */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-6">
        {quizzes.map((quiz, index) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            isLast={index === quizzes.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function QuizCard({ quiz, isLast }: { quiz: PlayTodayQuiz; isLast: boolean }) {
  return (
    <div className={`flex-shrink-0 w-52 h-44 relative ${isLast ? "mr-6" : ""}`}>
      {/* Card Container with Background and Border */}
      <div
        className="w-full h-full rounded-lg relative overflow-hidden"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(0, 0, 0, 0.23)",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/playQuizImage.svg"
            alt="Quiz background"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          {/* Quiz Title */}
          <h3 className="text-white text-xl font-bold leading-tight">
            {quiz.title}
          </h3>

          {/* Bottom Content */}
          <div className="space-y-1">
            {/* Questions Count */}
            <p className="text-white text-base font-bold">
              {quiz.questions} Questions
            </p>

            {/* Time Left */}
            <p className="text-white text-base font-bold opacity-90">
              {quiz.hoursLeft} Hours Left
            </p>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white bg-opacity-20 rounded-full mt-2">
              <div
                className="h-full rounded-full"
                style={{
                  width: "75%",
                  backgroundColor: "var(--progress-bar-playtoday)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
