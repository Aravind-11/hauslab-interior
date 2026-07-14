"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserRound } from "lucide-react";

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="hidden h-8 w-20 animate-pulse rounded-lg bg-ink/10 sm:block" />
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-1.5">
        <Link href="/login" className="hidden sm:block">
          <Button size="sm" variant="ghost">
            Log in
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm" variant="outline">
            <LogIn className="h-3.5 w-3.5" />
            Sign up
          </Button>
        </Link>
      </div>
    );
  }

  const label = session.user.name || session.user.email || "Account";

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-[140px] truncate text-xs font-medium text-ink/60 md:inline">
        <UserRound className="mr-1 inline h-3.5 w-3.5" />
        {label}
      </span>
      <Button
        size="sm"
        variant="outline"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Log out</span>
      </Button>
    </div>
  );
}
