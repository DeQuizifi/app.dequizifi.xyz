import { QuizJoinedList } from "@/components/models/quiz/QuizJoinedList";
import { QuizNotJoinedTrendingList } from "@/components/models/quiz/QuizNotJoinedTrendingList";

export function PlayPageContainer() {
  return (
    <>
      <QuizNotJoinedTrendingList />
      <QuizJoinedList />
    </>
  );
}
