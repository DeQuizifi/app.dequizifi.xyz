import { Input } from "@/components/ui/input";

interface SearchBarProps {
  search: string;
  onChangeHandler: (value: string) => void;
}

export default function SearchBar({ search, onChangeHandler }: SearchBarProps) {
  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <Input
        style={{ backgroundColor: "var(--search-input-bg, var(--input))" }}
        className="w-72 max-w-full h-18 rounded-md backdrop-blur-lg border-none placeholder:text-white/60 placeholder:text-sm font-mono text-white caret-white transition duration-200 ease-in-out focus:ring-0 focus-visible:ring-0 focus:border-transparent focus-visible:border-transparent focus:shadow-none"
        placeholder="Search Quizzes"
        value={search}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </div>
  );
}
