import { BottomNavbar } from "@/components/common/BottomNavbar/BottomNavbar";
import { Header } from "../common/Header";

export function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/dashboard.svg')]">
      <Header />
      <main className="max-h-[calc(100vh-200px)] overflow-y-auto px-2">
        {children}
      </main>
      <BottomNavbar />
    </div>
  );
}
