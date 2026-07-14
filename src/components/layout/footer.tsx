import Link from "next/link";
import { PenTool } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream/10">
                <PenTool className="h-4 w-4 text-brass" />
              </span>
              <span className="font-display text-xl">Hauslab</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-cream/60">
              Browser-based tools to plan rooms, try furniture, and lock in a
              color story. Designs can stay on your device or sync to the cloud
              database.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cream/40">
              Tools
            </h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <Link href="/studio" className="hover:text-cream">
                  Room planner
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-cream">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/palette" className="hover:text-cream">
                  Color lab
                </Link>
              </li>
              <li>
                <Link href="/moodboard" className="hover:text-cream">
                  Mood boards
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cream/40">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <Link href="/quiz" className="hover:text-cream">
                  Style match
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-cream">
                  Idea gallery
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Hauslab. Built for clear home decisions.</p>
          <p>Local storage + cloud Postgres (Prisma).</p>
        </div>
      </div>
    </footer>
  );
}
