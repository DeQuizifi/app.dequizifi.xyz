import { UserNameBalance } from "@/components/models/user/UserNameBalanceCard";

export function Header() {
  return (
    <header className="sticky top-0 w-full z-10" aria-label="Page Header">
      <UserNameBalance />
    </header>
  );
}
