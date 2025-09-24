import { Input } from "@/components/ui/input";
import { SearchTabs } from "@/components/common/Tabs/SearchTabs";

export function QuizSearchTab() {
  return (
    <div className="w-full px-6 sm:px-8 md:px-12">
      <Input
        placeholder="Search Quizzes"
        aria-label="Search quizzes"
        className="w-full rounded-2xl bg-foreground/60 border-0 shadow-none focus:text-primary-foreground/80 placeholder:text-primary-foreground/80 px-6 py-10 focus-visible:ring-0 focus-visible:border-0 mt-16 font-mono"
      />

      <SearchTabs/>
    </div>
  );
}
