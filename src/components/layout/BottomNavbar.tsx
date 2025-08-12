"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  House,
  Search,
  Gamepad2,
  ChartColumnIncreasing,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    id: "search",
    label: "Search",
    href: "/search",
    icon: Search,
  },
  {
    id: "play",
    label: "Play",
    href: "/play",
    icon: Gamepad2,
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    href: "/leaderboard",
    icon: ChartColumnIncreasing,
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border bottom-navbar rounded-t-2xl shadow-lg "
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around gap-3 px-4 py-4 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "nav-item flex flex-col items-center justify-center min-w-0 flex-1 py-4 px-3 transition-all duration-200 rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                "hover:bg-accent hover:text-accent-foreground",
                "active:scale-95 transition-transform",
                active
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={`Navigate to ${item.label}`}
              aria-current={active ? "page" : undefined}
              style={{ minHeight: "44px", minWidth: "44px" }} // Ensure minimum tap target
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-colors duration-200",
                  active ? "text-primary" : "text-muted-foreground"
                )}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
