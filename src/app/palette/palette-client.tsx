"use client";

import { useMemo, useState } from "react";
import { CURATED_PALETTES } from "@/lib/data/colors";
import { getContrastText, cn, generateId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Plus, Trash2, Paintbrush } from "lucide-react";
import { useDesignStore } from "@/lib/store/design-store";
import Link from "next/link";

interface CustomColor {
  id: string;
  name: string;
  hex: string;
}

export function PaletteClient() {
  const updateRoom = useDesignStore((s) => s.updateRoom);
  const [selectedPalette, setSelectedPalette] = useState(CURATED_PALETTES[0].id);
  const [custom, setCustom] = useState<CustomColor[]>([
    { id: "c1", name: "Primary", hex: "#C4B5A0" },
    { id: "c2", name: "Secondary", hex: "#2C2C2C" },
    { id: "c3", name: "Accent", hex: "#C9A66B" },
    { id: "c4", name: "Surface", hex: "#F7F3EB" },
    { id: "c5", name: "Neutral", hex: "#E8E0D5" },
  ]);
  const [copied, setCopied] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const active = useMemo(
    () => CURATED_PALETTES.find((p) => p.id === selectedPalette)!,
    [selectedPalette]
  );

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  const applyToRoom = (wall: string, floor: string) => {
    updateRoom({ wallColor: wall, floorColor: floor });
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">
          Color lab
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          Pick a palette
        </h1>
        <p className="mt-2 max-w-2xl text-ink/55">
          Browse ready-made schemes or mix your own. Push wall and floor colors
          straight into your active floor plan.
        </p>
      </div>

      {/* Curated */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">Curated palettes</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CURATED_PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPalette(p.id)}
              className={cn(
                "rounded-2xl border p-4 text-left transition",
                selectedPalette === p.id
                  ? "border-brass bg-white shadow-md ring-2 ring-brass/25"
                  : "border-ink/8 bg-white hover:border-ink/20"
              )}
            >
              <div className="flex h-14 overflow-hidden rounded-xl">
                {p.colors.map((c) => (
                  <div
                    key={c.id}
                    className="flex-1"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-ink/45">{p.style}</p>
                </div>
                {selectedPalette === p.id && (
                  <Badge variant="brass">Selected</Badge>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Active detail */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm">
          <div className="flex h-40 sm:h-52">
            {active.colors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => copyHex(c.hex)}
                className="group relative flex-1 transition hover:flex-[1.15]"
                style={{ backgroundColor: c.hex }}
              >
                <span
                  className="absolute inset-x-0 bottom-0 bg-black/20 px-2 py-2 opacity-0 transition group-hover:opacity-100 sm:opacity-100"
                  style={{ color: getContrastText(c.hex) }}
                >
                  <span className="block text-xs font-semibold">{c.name}</span>
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-80">
                    {copied === c.hex ? (
                      <>
                        <Check className="h-3 w-3" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> {c.hex}
                      </>
                    )}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-2xl text-ink">{active.name}</h3>
              <p className="text-sm text-ink/50">{active.style} direction</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  applyToRoom(
                    active.colors.find((c) => c.role === "surface")?.hex ||
                      active.colors[0].hex,
                    active.colors.find((c) => c.role === "neutral" || c.role === "primary")
                      ?.hex || active.colors[1].hex
                  )
                }
              >
                <Paintbrush className="h-4 w-4" />
                {applied ? "Applied to studio" : "Apply to room"}
              </Button>
              <Link href="/studio">
                <Button variant="outline">Open studio</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom builder */}
      <section className="mt-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl text-ink">Custom builder</h2>
            <p className="mt-1 text-sm text-ink/50">
              Mix your own scheme — names and hex values are editable.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCustom((c) => [
                ...c,
                { id: generateId("col"), name: "New", hex: "#CCCCCC" },
              ])
            }
            disabled={custom.length >= 8}
          >
            <Plus className="h-3.5 w-3.5" />
            Add swatch
          </Button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {custom.map((c, i) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white p-3 shadow-sm"
            >
              <input
                type="color"
                value={c.hex}
                onChange={(e) =>
                  setCustom((list) =>
                    list.map((x, j) =>
                      j === i ? { ...x, hex: e.target.value } : x
                    )
                  )
                }
                className="h-14 w-14 shrink-0 cursor-pointer rounded-xl border border-ink/10"
              />
              <div className="min-w-0 flex-1">
                <input
                  value={c.name}
                  onChange={(e) =>
                    setCustom((list) =>
                      list.map((x, j) =>
                        j === i ? { ...x, name: e.target.value } : x
                      )
                    )
                  }
                  className="w-full border-0 bg-transparent text-sm font-medium text-ink outline-none"
                />
                <input
                  value={c.hex}
                  onChange={(e) =>
                    setCustom((list) =>
                      list.map((x, j) =>
                        j === i ? { ...x, hex: e.target.value } : x
                      )
                    )
                  }
                  className="w-full border-0 bg-transparent font-mono text-xs text-ink/50 outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setCustom((list) => list.filter((_, j) => j !== i))}
                className="rounded-lg p-2 text-ink/30 hover:bg-ink/5 hover:text-ink"
                disabled={custom.length <= 2}
                aria-label="Remove swatch"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Live strip */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-ink/8 shadow-sm">
          <div className="flex h-24">
            {custom.map((c) => (
              <div
                key={c.id}
                className="flex flex-1 items-end justify-center pb-2"
                style={{ backgroundColor: c.hex }}
              >
                <span
                  className="text-[10px] font-medium uppercase tracking-wide"
                  style={{ color: getContrastText(c.hex) }}
                >
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={() =>
              applyToRoom(
                custom.find((c) => /surface|wall|primary/i.test(c.name))?.hex ||
                  custom[0].hex,
                custom.find((c) => /floor|neutral|secondary/i.test(c.name))?.hex ||
                  custom[1]?.hex ||
                  custom[0].hex
              )
            }
          >
            <Paintbrush className="h-4 w-4" />
            Apply custom to room
          </Button>
        </div>
      </section>
    </div>
  );
}
