"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  FURNITURE_CATALOG,
} from "@/lib/data/furniture";
import { useDesignStore } from "@/lib/store/design-store";
import { formatCurrency, cn } from "@/lib/utils";
import type { FurnitureCategory } from "@/types";
import { Search, Plus } from "lucide-react";

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

export function FurnitureLibrary() {
  const addFurniture = useDesignStore((s) => s.addFurniture);
  const [category, setCategory] = useState<FurnitureCategory | "all">("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    return FURNITURE_CATALOG.filter((f) => {
      if (category !== "all" && f.category !== category) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          f.name.toLowerCase().includes(q) ||
          f.tags.some((t) => t.includes(q)) ||
          f.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [category, query]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-ink/8 p-4">
        <h2 className="font-display text-lg text-ink">Pieces</h2>
        <p className="mt-0.5 text-xs text-ink/50">
          Drag into the room or tap + to place
        </p>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search furniture…"
            className="h-9 w-full rounded-xl border border-ink/10 bg-white pl-9 pr-3 text-sm outline-none ring-brass/30 placeholder:text-ink/35 focus:ring-2"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-medium transition",
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

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("furnitureId", item.id);
              e.dataTransfer.effectAllowed = "copy";
            }}
            className="group flex cursor-grab items-center gap-3 rounded-xl border border-ink/8 bg-white p-2.5 shadow-sm transition hover:border-brass/40 hover:shadow-md active:cursor-grabbing"
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-black/5"
              style={{ backgroundColor: item.color }}
            >
              <span
                className="h-5 w-5 rounded-sm opacity-70"
                style={{
                  backgroundColor: item.accentColor || "#00000020",
                  borderRadius:
                    item.shape === "round" || item.shape === "oval"
                      ? "999px"
                      : "4px",
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{item.name}</p>
              <p className="text-xs text-ink/45">
                {item.dimensions.width}&apos; × {item.dimensions.depth}&apos; ·{" "}
                {formatCurrency(item.price)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => addFurniture(item.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-ink opacity-70 transition group-hover:bg-ink group-hover:text-cream group-hover:opacity-100"
              aria-label={`Add ${item.name}`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-8 text-center text-sm text-ink/45">No matches found.</p>
        )}
      </div>
    </div>
  );
}
