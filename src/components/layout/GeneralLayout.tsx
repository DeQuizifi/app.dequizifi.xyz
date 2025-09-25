import { BottomNavbar } from "@/components/common/BottomNavbar/BottomNavbar";
import { Header } from "../common/Header";

export function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main>{children}</main>
      <BottomNavbar />
    </div>
  );
}
