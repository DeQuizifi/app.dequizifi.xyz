import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <Input
        className="w-72 h-18 rounded-md bg-input/20  backdrop-blur-lg border-none placeholder:text-background placeholder:text-sm placeholder: font-mono"
        placeholder="Search Quizzes"
      />
    </div>
  );
}
