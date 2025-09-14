import { Input } from "@/components/ui/input";

interface SearchBarProps {
  search: string;
  onChangeHandler: (value: string) => void;
}

export default function SearchBar({ search, onChangeHandler }: SearchBarProps) {
  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <Input
        className="w-72 max-w-full h-18 rounded-md backdrop-blur-lg border-none"
        placeholder="Search Quizzes"
        value={search}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </div>
  );
}
