"use client";

import { useState } from "react";
import { INSPIRATION_ROOMS, STYLE_LABELS } from "@/lib/data/styles";
import type { DesignStyle } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FILTERS: Array<DesignStyle | "all"> = [
  "all",
  "japandi",
  "scandinavian",
  "industrial",
  "coastal",
  "mid-century",
  "bohemian",
  "minimalist",
  "contemporary",
];

export function GalleryClient() {
  const [filter, setFilter] = useState<DesignStyle | "all">("all");

  const rooms =
    filter === "all"
      ? INSPIRATION_ROOMS
      : INSPIRATION_ROOMS.filter((r) => r.style === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">
          Ideas
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          Room gallery
        </h1>
        <p className="mt-2 text-ink/55">
          Finished concepts across styles — use any as a springboard for your
          own floor plan.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition",
              filter === f
                ? "bg-ink text-cream"
                : "bg-white text-ink/60 ring-1 ring-ink/10 hover:bg-ink/5"
            )}
          >
            {f === "all" ? "All styles" : STYLE_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <article
            key={room.id}
            className="group overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm transition hover:shadow-xl"
          >
            {/* Abstract room visual */}
            <div className="relative h-52 overflow-hidden">
              <div className="absolute inset-0 flex">
                {room.colors.map((c, i) => (
                  <div
                    key={c + i}
                    className="flex-1 transition-all duration-500 group-hover:flex-[1.05]"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              {/* Decorative furniture silhouettes */}
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <div className="relative h-24 w-4/5">
                  <div
                    className="absolute bottom-0 left-[10%] h-12 w-[55%] rounded-t-lg opacity-90 shadow-lg"
                    style={{ backgroundColor: room.colors[2] || room.colors[0] }}
                  />
                  <div
                    className="absolute bottom-0 right-[15%] h-16 w-12 rounded-t-full opacity-90 shadow-lg"
                    style={{ backgroundColor: room.colors[1] || room.colors[0] }}
                  />
                  <div
                    className="absolute bottom-2 left-[25%] h-4 w-[30%] rounded-full opacity-70"
                    style={{ backgroundColor: room.colors[3] || "#fff" }}
                  />
                </div>
              </div>
              <div className="absolute left-3 top-3">
                <Badge variant="soft">{STYLE_LABELS[room.style]}</Badge>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-ink/40">
                {room.room}
              </p>
              <h2 className="mt-1 font-display text-xl text-ink">{room.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">
                {room.description}
              </p>
              <div className="mt-4 flex gap-1.5">
                {room.colors.map((c) => (
                  <span
                    key={c}
                    className="h-6 w-6 rounded-full border border-black/10"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {rooms.length === 0 && (
        <p className="mt-12 text-center text-ink/45">No rooms for this filter.</p>
      )}

      <div className="mt-14 rounded-3xl bg-ink px-6 py-10 text-center text-cream sm:px-10">
        <h2 className="font-display text-2xl sm:text-3xl">
          Make one of these your own
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-cream/60">
          Open the studio and rebuild any vibe with real furniture and your
          room&apos;s dimensions.
        </p>
        <Link href="/studio" className="mt-6 inline-block">
          <Button className="bg-cream text-ink hover:bg-cream/90">
            Open Room Studio
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
