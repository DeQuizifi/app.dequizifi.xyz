import {
  ChartColumnIncreasing,
  Gamepad2,
  House,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
              aria-label={`Navigate to ${item.label}`}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={
                  "inline-flex items-center justify-center p-4 rounded-full " +
                  (active ? "bg-primary" : "")
                }
              >
                <Icon
                  className={
                    "h-6 w-6 " + (active ? "text-primary" : "text-foreground")
                  }
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
