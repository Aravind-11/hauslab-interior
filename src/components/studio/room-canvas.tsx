"use client";

import { useDesignStore } from "@/lib/store/design-store";
import { getFurnitureById } from "@/lib/data/furniture";
import { FurniturePiece } from "./furniture-piece";
import { cn } from "@/lib/utils";

function floorBackground(pattern: string, color: string): string {
  switch (pattern) {
    case "wood":
      return `repeating-linear-gradient(
        90deg,
        ${color} 0px,
        ${color} 28px,
        color-mix(in srgb, ${color} 88%, #000) 28px,
        color-mix(in srgb, ${color} 88%, #000) 30px
      )`;
    case "tile":
      return `linear-gradient(to right, color-mix(in srgb, ${color} 85%, #000) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, ${color} 85%, #000) 1px, transparent 1px)`;
    case "concrete":
      return color;
    case "carpet":
      return `radial-gradient(circle at 20% 30%, color-mix(in srgb, ${color} 92%, #fff) 0%, ${color} 50%)`;
    default:
      return color;
  }
}

export function RoomCanvas() {
  const project = useDesignStore((s) => s.project);
  const scale = useDesignStore((s) => s.scale);
  const showGrid = useDesignStore((s) => s.showGrid);
  const snapToGrid = useDesignStore((s) => s.snapToGrid);
  const selectedId = useDesignStore((s) => s.selectedId);
  const selectFurniture = useDesignStore((s) => s.selectFurniture);
  const addFurniture = useDesignStore((s) => s.addFurniture);

  const { room, furniture } = project;
  const widthPx = room.widthFt * scale;
  const depthPx = room.depthFt * scale;

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const furnitureId = e.dataTransfer.getData("furnitureId");
    if (!furnitureId) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left - 30;
    const y = e.clientY - rect.top - 30;
    addFurniture(furnitureId, Math.max(0, x), Math.max(0, y));
  };

  return (
    <div className="relative flex min-h-[420px] flex-1 items-center justify-center overflow-auto rounded-2xl bg-[linear-gradient(135deg,#e8e4dc_0%,#d4cfc4_100%)] p-6 sm:p-10">
      {/* Dimension labels */}
      <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium text-cream">
        {room.widthFt}&apos; wide
      </div>
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium text-cream">
        {room.depthFt}&apos; deep
      </div>

      <div
        className={cn(
          "relative shrink-0 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/10",
          "transition-shadow"
        )}
        style={{
          width: widthPx,
          height: depthPx,
          backgroundColor: room.floorColor,
          backgroundImage: floorBackground(room.floorPattern, room.floorColor),
          backgroundSize:
            room.floorPattern === "tile" ? `${scale}px ${scale}px` : undefined,
        }}
        onClick={() => selectFurniture(null)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {/* Walls */}
        <div
          className="pointer-events-none absolute inset-0 border-[10px] shadow-inner"
          style={{ borderColor: room.wallColor }}
        />
        {/* Inner wall highlight */}
        <div
          className="pointer-events-none absolute inset-[10px] border border-black/5"
          style={{ boxShadow: `inset 0 0 40px ${room.wallColor}40` }}
        />

        {showGrid && (
          <div
            className="pointer-events-none absolute inset-[10px] opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)
              `,
              backgroundSize: `${scale}px ${scale}px`,
            }}
          />
        )}

        {/* Door mark (bottom wall) */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[10px] w-14 -translate-x-1/2 bg-[color-mix(in_srgb,var(--color-cream)_80%,transparent)]" />

        {/* Window marks */}
        <div
          className="pointer-events-none absolute left-1/4 top-0 h-[10px] w-20 -translate-x-1/2"
          style={{ backgroundColor: "color-mix(in srgb, #87CEEB 50%, transparent)" }}
        />
        <div
          className="pointer-events-none absolute right-1/4 top-0 h-[10px] w-16"
          style={{ backgroundColor: "color-mix(in srgb, #87CEEB 50%, transparent)" }}
        />

        {furniture.map((placed) => {
          const item = getFurnitureById(placed.furnitureId);
          if (!item) return null;
          return (
            <FurniturePiece
              key={placed.instanceId}
              placed={placed}
              item={item}
              selected={selectedId === placed.instanceId}
              scale={scale}
              snapToGrid={snapToGrid}
              roomWidthPx={widthPx}
              roomDepthPx={depthPx}
            />
          );
        })}

        {furniture.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8">
            <div className="rounded-2xl bg-white/70 px-6 py-4 text-center shadow-sm backdrop-blur-sm">
              <p className="font-display text-lg text-ink">Empty room</p>
              <p className="mt-1 max-w-xs text-sm text-ink/55">
                Drag furniture from the library or click an item to place it.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
