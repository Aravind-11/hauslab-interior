"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Compass,
  LayoutGrid,
  Palette,
  PenTool,
  Sparkles,
  Menu,
  X,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/auth/user-menu";

const NAV = [
  { href: "/studio", label: "Planner", icon: PenTool },
  { href: "/catalog", label: "Furniture", icon: LayoutGrid },
  { href: "/palette", label: "Colors", icon: Palette },
  { href: "/moodboard", label: "Boards", icon: Layers },
  { href: "/quiz", label: "Style Match", icon: Sparkles },
  { href: "/gallery", label: "Ideas", icon: Compass },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-cream shadow-sm transition group-hover:bg-brass">
            <PenTool className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight text-ink">
              Hauslab
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
              Home design tools
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-ink/8 text-ink"
                    : "text-ink/55 hover:bg-ink/5 hover:text-ink"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <UserMenu />
          <Link href="/studio" className="hidden md:block">
            <Button size="sm">Open planner</Button>
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/8 bg-cream px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                    active ? "bg-ink text-cream" : "text-ink/70 hover:bg-ink/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl px-3 py-3 text-sm font-medium text-ink/70 hover:bg-ink/5"
            >
              Log in / Sign up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
