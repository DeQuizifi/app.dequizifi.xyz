type Quiz = {
  id: string;
  title: string;
  author: string;
  questions: number;
  plays: number;
  difficulty: "Easy" | "Medium" | "Hard";
  thumbnail?: string;
};

export default function QuizTab({ quizzes }: { quizzes?: Quiz[] }) {
  const placeholder: Quiz[] = [
    {
      id: "q1",
      title: "General Knowledge Blitz",
      author: "QuizMaster42",
      questions: 10,
      plays: 1245,
      difficulty: "Medium",
      thumbnail: undefined,
    },
    {
      id: "q2",
      title: "History: Famous Dates",
      author: "HistoryBuff",
      questions: 8,
      plays: 823,
      difficulty: "Easy",
    },
    {
      id: "q3",
      title: "Science Rapid Fire",
      author: "LabGuru",
      questions: 12,
      plays: 456,
      difficulty: "Hard",
    },
  ];

  const list = quizzes && quizzes.length ? quizzes : placeholder;

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-4 w-full min-w-[370px] mx-auto">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Latest Quizzes</h2>
          <div className="space-y-3">
            {list.map((q) => (
              <Card key={q.id} className="px-4 py-6 rounded-md border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-sm font-medium">
                      {q.title
                        .split(" ")
                        .slice(0, 2)
                        .map((t) => t[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{q.title}</div>
                      <div className="text-sm text-muted-foreground">
                        by {q.author} • {q.questions} questions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{q.plays} plays</div>
                    <div className="text-xs text-muted-foreground">
                      {q.difficulty}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
