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
  // allow passing SVG props (style, aria-hidden, etc.) to icons
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/dashboard",
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
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-t border-border bottom-navbar rounded-t-2xl shadow-lg "
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
              // remove hover and focus visual effects for bottom nav
              className={cn(
                "nav-item flex flex-col items-center justify-center min-w-0 flex-1 py-4 px-3 transition-all duration-200 rounded-lg",
                "focus:outline-none focus-visible:outline-none focus:ring-0",
                "active:scale-95 transition-transform",
                active ? "text-primary font-medium" : "text-muted-foreground"
              )}
              aria-label={`Navigate to ${item.label}`}
              aria-current={active ? "page" : undefined}
              style={{ minHeight: "44px", minWidth: "44px", outline: "none" }} // Ensure minimum tap target
            >
              <span
                className="inline-flex items-center justify-center h-9 w-9 rounded-full"
                style={
                  active
                    ? { backgroundColor: "var(--progress-bar-playtoday)" }
                    : undefined
                }
              >
                <Icon
                  className={cn(
                    "h-6 w-6 transition-colors duration-200",
                    !active && "text-muted-foreground"
                  )}
                  style={active ? { color: "var(--foreground)" } : undefined}
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
