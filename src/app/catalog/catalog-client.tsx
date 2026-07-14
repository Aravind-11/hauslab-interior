"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  FURNITURE_CATALOG,
} from "@/lib/data/furniture";
import { STYLE_LABELS } from "@/lib/data/styles";
import type { DesignStyle, FurnitureCategory } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDesignStore } from "@/lib/store/design-store";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const CATS: Array<FurnitureCategory | "all"> = [
  "all",
  "seating",
  "tables",
  "storage",
  "beds",
  "lighting",
  "decor",
  "rugs",
];

const STYLES: Array<DesignStyle | "all"> = [
  "all",
  "minimalist",
  "scandinavian",
  "industrial",
  "mid-century",
  "bohemian",
  "contemporary",
  "japandi",
  "coastal",
];

export function CatalogClient() {
  const addFurniture = useDesignStore((s) => s.addFurniture);
  const [category, setCategory] = useState<FurnitureCategory | "all">("all");
  const [style, setStyle] = useState<DesignStyle | "all">("all");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [query, setQuery] = useState("");
  const [added, setAdded] = useState<string | null>(null);

  const items = useMemo(() => {
    return FURNITURE_CATALOG.filter((f) => {
      if (category !== "all" && f.category !== category) return false;
      if (style !== "all" && !f.style.includes(style)) return false;
      if (f.price > maxPrice) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.tags.some((t) => t.includes(q))
        );
      }
      return true;
    });
  }, [category, style, maxPrice, query]);

  const handleAdd = (id: string) => {
    addFurniture(id);
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">
            Library
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Furniture
          </h1>
          <p className="mt-2 max-w-xl text-ink/55">
            Scaled pieces for real rooms. Add anything straight into your floor
            plan.
          </p>
        </div>
        <Link href="/studio">
          <Button variant="outline">Open planner</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mt-8 rounded-2xl border border-ink/8 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/40">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </div>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, tag, or description…"
            className="h-11 w-full rounded-xl border border-ink/10 bg-cream pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brass/30"
          />
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs text-ink/45">Category</p>
          <div className="flex flex-wrap gap-1.5">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  category === c
                    ? "bg-ink text-cream"
                    : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                )}
              >
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs text-ink/45">Style</p>
          <div className="flex flex-wrap gap-1.5">
            {STYLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  style === s
                    ? "bg-ink text-cream"
                    : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                )}
              >
                {s === "all" ? "All styles" : STYLE_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 max-w-sm">
          <div className="mb-2 flex justify-between text-xs text-ink/45">
            <span>Max price</span>
            <span className="font-medium text-ink">{formatCurrency(maxPrice)}</span>
          </div>
          <input
            type="range"
            min={100}
            max={5000}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-ink"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/45">
        Showing {items.length} of {FURNITURE_CATALOG.length} pieces
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-sm transition hover:border-brass/35 hover:shadow-lg"
          >
            <div
              className="relative flex h-44 items-center justify-center"
              style={{
                background: `linear-gradient(145deg, ${item.color} 0%, ${item.accentColor || item.color} 100%)`,
              }}
            >
              <div
                className={cn(
                  "border border-black/10 shadow-xl",
                  item.shape === "round" || item.shape === "oval"
                    ? "h-24 w-24 rounded-full"
                    : "h-16 w-32 rounded-lg"
                )}
                style={{
                  backgroundColor: item.color,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                }}
              />
              <Badge className="absolute left-3 top-3" variant="soft">
                {CATEGORY_LABELS[item.category]}
              </Badge>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-xl text-ink">{item.name}</h2>
                <p className="shrink-0 text-sm font-semibold text-ink">
                  {formatCurrency(item.price)}
                </p>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">
                {item.description}
              </p>
              <p className="mt-3 text-xs text-ink/40">
                {item.dimensions.width}&apos;W × {item.dimensions.depth}&apos;D
                {item.dimensions.height
                  ? ` × ${item.dimensions.height}'H`
                  : ""}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.style.slice(0, 3).map((s) => (
                  <Badge key={s} variant="outline">
                    {STYLE_LABELS[s]}
                  </Badge>
                ))}
              </div>
              <Button
                className="mt-4 w-full"
                variant={added === item.id ? "secondary" : "primary"}
                onClick={() => handleAdd(item.id)}
              >
                <Plus className="h-4 w-4" />
                {added === item.id ? "Added to studio" : "Add to studio"}
              </Button>
            </div>
          </article>
        ))}
      </div>

      {items.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-ink/15 py-16 text-center">
          <p className="font-display text-xl text-ink">No pieces match</p>
          <p className="mt-1 text-sm text-ink/50">
            Try broadening your filters or clearing the search.
          </p>
        </div>
      )}
    </div>
  );
}
