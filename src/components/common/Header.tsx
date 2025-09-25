import { UserNameBalance } from "@/components/models/user/UserNameBalanceCard";

export function Header() {
  return (
    <header className="absolute top-0 w-full z-10">
      <UserNameBalance />
    </header>
  );
}
