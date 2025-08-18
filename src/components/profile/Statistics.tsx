import React from "react";

interface StatisticsData {
  quizzesWonThisWeek: number;
  totalQuizzesThisWeek: number;
  topCategoriesThisWeek: Array<{
    category: string;
    quizzesWon: number;
    totalQuizzes: number;
  }>;
}

interface StatisticsProps {
  data: StatisticsData;
}

function Statistics({ data }: StatisticsProps) {

  
  const { quizzesWonThisWeek, totalQuizzesThisWeek, topCategoriesThisWeek } =
    data;
  const winPercentage = (quizzesWonThisWeek / totalQuizzesThisWeek) * 100;

  // Calculate the stroke offset for the circular progress
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (winPercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-t-3xl min-h-[60vh] p-6">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Statistics
          </h2>
        </div>

        {/* Quizzes Won Section */}
        <div className="text-center space-y-6">
          <div>
            <p className="text-gray-600 text-lg mb-1">You have won a total</p>
            <p className="text-2xl font-bold">
              <span className="text-purple-500">
                {quizzesWonThisWeek} quizzes
              </span>{" "}
              <span className="text-gray-700">this week</span>
            </p>
          </div>

          {/* Circular Progress Chart */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg
                className="w-40 h-40 transform -rotate-90"
                viewBox="0 0 140 140"
              >
                {/* Background circle */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  className="transition-all duration-500 ease-in-out"
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-gray-800">
                  {quizzesWonThisWeek}/{totalQuizzesThisWeek}
                </div>
                <div className="text-sm text-gray-500">quizzes won</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories Section */}
        <div className="space-y-4 mb-20">
          <h3 className="text-lg font-semibold text-gray-800">
            Your Top Categories This Week
          </h3>

          <div className="space-y-3 ">
            {topCategoriesThisWeek.map((category, index) => {
              const categoryPercentage =
                (category.quizzesWon / category.totalQuizzes) * 100;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">
                      {category.category}
                    </h4>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${categoryPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="ml-4 text-right">
                    <span className="text-sm font-semibold text-gray-800">
                      {category.quizzesWon}/{category.totalQuizzes}
                    </span>
                    <span className="text-xs text-gray-500 block">won</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
