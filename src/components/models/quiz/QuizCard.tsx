import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock } from "lucide-react";

interface QuizCardProps {
  quiz?: {
    id: number;
    quizName: string;
    peopleJoined: number;
    hoursLeftToStart: number;
    description?: string;
  };
  buttonText?: string;
  onButtonClick?: (id: number) => void;
  isLoading?: boolean;
}

export function QuizCard({ quiz, buttonText = "Play Now", onButtonClick, isLoading }: QuizCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-sm bg-gradient-to-br from-purple-600 to-indigo-800 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-pulse">
        <CardHeader>
          <div className="h-6 bg-purple-400 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-purple-300 rounded w-1/2"></div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-purple-400 rounded-full mr-2"></div>
            <div className="h-4 bg-purple-300 rounded w-2/3"></div>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-5 bg-purple-400 rounded-full mr-2"></div>
            <div className="h-4 bg-purple-300 rounded w-1/2"></div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full h-10 bg-purple-500 rounded-lg"></div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm bg-gradient-to-br from-purple-600 to-indigo-800 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{quiz!.quizName}</CardTitle>
        {quiz!.description && (
          <CardDescription className="text-purple-200 mt-2">
            {quiz!.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-purple-100">
          <Users className="mr-2 h-5 w-5" />
          <span>{quiz!.peopleJoined} People Joined</span>
        </div>
        <div className="flex items-center text-purple-100">
          <Clock className="mr-2 h-5 w-5" />
          <span>{quiz!.hoursLeftToStart} Hours Left</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-white text-indigo-800 hover:bg-gray-100 hover:text-indigo-900 font-semibold py-2 px-4 rounded-lg"
          onClick={() => onButtonClick && onButtonClick(quiz!.id)}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}