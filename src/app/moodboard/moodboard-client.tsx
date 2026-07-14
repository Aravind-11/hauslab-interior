"use client";

import { useEffect, useRef, useState } from "react";
import { useDesignStore } from "@/lib/store/design-store";
import { CURATED_PALETTES } from "@/lib/data/colors";
import { FURNITURE_CATALOG } from "@/lib/data/furniture";
import { getContrastText, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  StickyNote,
  Palette,
  Sofa,
  Trash2,
  Eraser,
  CloudUpload,
  CloudDownload,
  Loader2,
} from "lucide-react";
import { fetchMoodBoard, saveMoodBoard } from "@/lib/api/projects";

export function MoodboardClient() {
  const moodBoard = useDesignStore((s) => s.moodBoard);
  const addMoodItem = useDesignStore((s) => s.addMoodItem);
  const updateMoodItem = useDesignStore((s) => s.updateMoodItem);
  const removeMoodItem = useDesignStore((s) => s.removeMoodItem);
  const clearMoodBoard = useDesignStore((s) => s.clearMoodBoard);
  const [ready, setReady] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ff6b4a");
  const [cloudMsg, setCloudMsg] = useState<string | null>(null);
  const [cloudBusy, setCloudBusy] = useState(false);
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  useEffect(() => setReady(true), []);

  const handleCloudSave = async () => {
    setCloudBusy(true);
    try {
      await saveMoodBoard(moodBoard);
      setCloudMsg("Mood board saved to cloud");
    } catch {
      setCloudMsg("Cloud save failed");
    } finally {
      setCloudBusy(false);
      setTimeout(() => setCloudMsg(null), 2500);
    }
  };

  const handleCloudLoad = async () => {
    setCloudBusy(true);
    try {
      const board = await fetchMoodBoard();
      useDesignStore.setState({ moodBoard: board.items });
      setCloudMsg("Loaded from cloud");
    } catch {
      setCloudMsg("Cloud load failed");
    } finally {
      setCloudBusy(false);
      setTimeout(() => setCloudMsg(null), 2500);
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-ink/50">
        Loading mood board…
      </div>
    );
  }

  const allColors = CURATED_PALETTES.flatMap((p) => p.colors).slice(0, 24);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">
            Boards
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Mood board
          </h1>
          <p className="mt-2 max-w-xl text-ink/55">
            Pin colors, furniture chips, and notes on a free canvas. Drag to
            arrange — auto-saved on this device.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {cloudMsg && (
            <span className="text-xs font-medium text-emerald-700">{cloudMsg}</span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCloudLoad}
            disabled={cloudBusy}
          >
            {cloudBusy ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CloudDownload className="h-3.5 w-3.5" />
            )}
            Load cloud
          </Button>
          <Button size="sm" onClick={handleCloudSave} disabled={cloudBusy}>
            <CloudUpload className="h-3.5 w-3.5" />
            Save cloud
          </Button>
          <Button variant="outline" size="sm" onClick={clearMoodBoard}>
            <Eraser className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Tools */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-ink/8 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/40">
              <Palette className="h-3.5 w-3.5" />
              Add color
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {allColors.map((c) => (
                <button
                  key={c.id + c.hex}
                  type="button"
                  title={c.name}
                  onClick={() => {
                    setSelectedColor(c.hex);
                    addMoodItem({
                      type: "color",
                      x: 40 + Math.random() * 200,
                      y: 40 + Math.random() * 150,
                      width: 100,
                      height: 100,
                      content: c.hex,
                      label: c.name,
                      rotation: (Math.random() - 0.5) * 12,
                    });
                  }}
                  className={cn(
                    "h-8 w-8 rounded-lg border-2 transition hover:scale-110",
                    selectedColor === c.hex ? "border-ink" : "border-black/10"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-ink/10"
              />
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() =>
                  addMoodItem({
                    type: "color",
                    x: 60 + Math.random() * 180,
                    y: 60 + Math.random() * 120,
                    width: 100,
                    height: 100,
                    content: selectedColor,
                    label: selectedColor,
                    rotation: (Math.random() - 0.5) * 10,
                  })
                }
              >
                Add custom
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-ink/8 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/40">
              <Sofa className="h-3.5 w-3.5" />
              Furniture chips
            </h2>
            <div className="mt-3 max-h-48 space-y-1 overflow-y-auto">
              {FURNITURE_CATALOG.slice(0, 12).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() =>
                    addMoodItem({
                      type: "furniture",
                      x: 80 + Math.random() * 220,
                      y: 80 + Math.random() * 180,
                      width: 140,
                      height: 72,
                      content: f.color,
                      label: f.name,
                      rotation: (Math.random() - 0.5) * 8,
                    })
                  }
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs hover:bg-cream"
                >
                  <span
                    className="h-5 w-5 rounded border border-black/10"
                    style={{ backgroundColor: f.color }}
                  />
                  <span className="truncate text-ink/70">{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ink/8 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/40">
              <StickyNote className="h-3.5 w-3.5" />
              Note
            </h2>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Keep walls warm ivory…"
              rows={3}
              className="mt-3 w-full resize-none rounded-xl border border-ink/10 bg-cream p-3 text-sm outline-none focus:ring-2 focus:ring-brass/30"
            />
            <Button
              size="sm"
              className="mt-2 w-full"
              disabled={!noteText.trim()}
              onClick={() => {
                addMoodItem({
                  type: "note",
                  x: 100 + Math.random() * 150,
                  y: 100 + Math.random() * 100,
                  width: 160,
                  height: 100,
                  content: noteText.trim(),
                  label: "Note",
                  rotation: (Math.random() - 0.5) * 6,
                });
                setNoteText("");
              }}
            >
              Pin note
            </Button>
          </div>
        </aside>

        {/* Canvas */}
        <div
          className="relative min-h-[560px] overflow-hidden rounded-3xl border border-ink/10 shadow-inner"
          style={{
            backgroundColor: "#f0ebe3",
            backgroundImage: `
              linear-gradient(rgba(26,26,26,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26,26,26,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        >
          {moodBoard.length === 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl bg-white/70 px-6 py-4 text-center backdrop-blur-sm">
                <p className="font-display text-xl text-ink">Blank canvas</p>
                <p className="mt-1 text-sm text-ink/50">
                  Add colors, furniture, or notes from the sidebar.
                </p>
              </div>
            </div>
          )}

          {moodBoard.map((item) => (
            <div
              key={item.id}
              className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
              style={{
                left: item.x,
                top: item.y,
                width: item.width,
                height: item.height,
                transform: `rotate(${item.rotation || 0}deg)`,
                zIndex: 10,
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                dragRef.current = {
                  id: item.id,
                  startX: e.clientX,
                  startY: e.clientY,
                  origX: item.x,
                  origY: item.y,
                };
              }}
              onPointerMove={(e) => {
                if (!dragRef.current || dragRef.current.id !== item.id) return;
                const dx = e.clientX - dragRef.current.startX;
                const dy = e.clientY - dragRef.current.startY;
                updateMoodItem(item.id, {
                  x: Math.max(0, dragRef.current.origX + dx),
                  y: Math.max(0, dragRef.current.origY + dy),
                });
              }}
              onPointerUp={() => {
                dragRef.current = null;
              }}
            >
              {item.type === "color" && (
                <div
                  className="group relative h-full w-full rounded-xl border border-black/10 shadow-lg"
                  style={{ backgroundColor: item.content }}
                >
                  <span
                    className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-wide"
                    style={{ color: getContrastText(item.content) }}
                  >
                    {item.label}
                  </span>
                  <button
                    type="button"
                    className="absolute right-1 top-1 rounded bg-black/20 p-1 opacity-0 transition group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMoodItem(item.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-white" />
                  </button>
                </div>
              )}
              {item.type === "furniture" && (
                <div
                  className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-xl border border-black/10 p-2 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${item.content}, color-mix(in srgb, ${item.content} 70%, #000))`,
                  }}
                >
                  <p className="text-xs font-semibold text-white drop-shadow">
                    {item.label}
                  </p>
                  <button
                    type="button"
                    className="absolute right-1 top-1 rounded bg-black/20 p-1 opacity-0 transition group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMoodItem(item.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-white" />
                  </button>
                </div>
              )}
              {item.type === "note" && (
                <div className="group relative h-full w-full rounded-sm border border-amber-200/80 bg-[#fff8dc] p-3 shadow-md">
                  <p className="text-xs leading-relaxed text-ink/80">{item.content}</p>
                  <button
                    type="button"
                    className="absolute right-1 top-1 rounded p-1 opacity-0 transition hover:bg-black/5 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMoodItem(item.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-ink/40" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
