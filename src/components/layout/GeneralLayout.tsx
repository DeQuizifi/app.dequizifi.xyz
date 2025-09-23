import { BottomNavbar } from "@/components/common/BottomNavbar/BottomNavbar";

export function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="pb-20">{children}</main>
      <BottomNavbar />
    </div>
  );
}
