import Link from "next/link";
import {
  PenTool,
  Palette,
  Layers,
  Sparkles,
  LayoutGrid,
  Compass,
  ArrowUpRight,
} from "lucide-react";

const FEATURES = [
  {
    href: "/studio",
    icon: PenTool,
    title: "Room planner",
    desc: "Real-scale floor plans with snap grid, rotate, recolor, and wall/floor finishes.",
  },
  {
    href: "/catalog",
    icon: LayoutGrid,
    title: "Furniture library",
    desc: "Twenty-five-plus pieces — seating, tables, beds, lighting — ready to drop in.",
  },
  {
    href: "/palette",
    icon: Palette,
    title: "Color lab",
    desc: "Curated schemes plus a custom mixer. Push colors straight into your plan.",
  },
  {
    href: "/moodboard",
    icon: Layers,
    title: "Mood boards",
    desc: "Pin swatches, notes, and product chips on a free canvas while you decide.",
  },
  {
    href: "/quiz",
    icon: Sparkles,
    title: "Style match",
    desc: "Six quick questions that rank design directions against your taste.",
  },
  {
    href: "/gallery",
    icon: Compass,
    title: "Idea gallery",
    desc: "Browse finished room concepts from Japandi to coastal for a head start.",
  },
];

export function Features() {
  return (
    <section className="border-t border-ink/8 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">
            Toolkit
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Everything in one workspace
          </h2>
          <p className="mt-3 text-ink/55">
            Plan, color, and compare ideas without juggling five different apps.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ href, icon: Icon, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="group relative rounded-2xl border border-ink/8 bg-cream p-6 transition hover:border-brass/50 hover:shadow-lg hover:shadow-ink/5"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-cream transition group-hover:bg-brass">
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-ink/25 transition group-hover:text-brass-dark" />
              </div>
              <h3 className="mt-4 font-display text-xl text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
