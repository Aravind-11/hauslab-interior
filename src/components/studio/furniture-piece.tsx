"use client";

import { useRef, useCallback, useState } from "react";
import type { FurnitureItem, PlacedFurniture } from "@/types";
import { cn, getContrastText } from "@/lib/utils";
import { useDesignStore } from "@/lib/store/design-store";

interface Props {
  placed: PlacedFurniture;
  item: FurnitureItem;
  selected: boolean;
  scale: number;
  snapToGrid: boolean;
  roomWidthPx: number;
  roomDepthPx: number;
}

export function FurniturePiece({
  placed,
  item,
  selected,
  scale,
  snapToGrid,
  roomWidthPx,
  roomDepthPx,
}: Props) {
  const updateFurniture = useDesignStore((s) => s.updateFurniture);
  const selectFurniture = useDesignStore((s) => s.selectFurniture);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const [dragging, setDragging] = useState(false);

  const w = item.dimensions.width * scale * placed.scale;
  const h = item.dimensions.depth * scale * placed.scale;
  const color = placed.colorOverride || item.color;
  const textColor = getContrastText(color);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      selectFurniture(placed.instanceId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: placed.x,
        origY: placed.y,
      };
      setDragging(true);
    },
    [placed.instanceId, placed.x, placed.y, selectFurniture]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      let nx = dragRef.current.origX + dx;
      let ny = dragRef.current.origY + dy;

      if (snapToGrid) {
        const g = scale / 2;
        nx = Math.round(nx / g) * g;
        ny = Math.round(ny / g) * g;
      }

      nx = Math.max(0, Math.min(nx, roomWidthPx - w));
      ny = Math.max(0, Math.min(ny, roomDepthPx - h));

      updateFurniture(placed.instanceId, { x: nx, y: ny });
    },
    [
      snapToGrid,
      scale,
      roomWidthPx,
      roomDepthPx,
      w,
      h,
      placed.instanceId,
      updateFurniture,
    ]
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
    setDragging(false);
  }, []);

  const isRug = item.category === "rugs";
  const isRound = item.shape === "round" || item.shape === "oval";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={item.name}
      className={cn(
        "absolute select-none touch-none",
        dragging ? "cursor-grabbing z-50" : "cursor-grab",
        selected ? "z-40" : isRug ? "z-10" : "z-20",
        !dragging && "transition-[box-shadow] duration-150"
      )}
      style={{
        left: placed.x,
        top: placed.y,
        width: w,
        height: h,
        transform: `rotate(${placed.rotation}deg)`,
        transformOrigin: "center center",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectFurniture(placed.instanceId);
        }
      }}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden border-2 shadow-sm",
          isRound ? "rounded-full" : "rounded-md",
          selected
            ? "border-brass ring-2 ring-brass/40 shadow-lg"
            : "border-black/10 hover:border-black/25"
        )}
        style={{
          backgroundColor: color,
          opacity: isRug ? 0.92 : 1,
        }}
      >
        {/* Texture / detail by category */}
        {item.category === "seating" && !isRound && (
          <div className="absolute inset-1 rounded border border-black/10" />
        )}
        {item.category === "tables" && isRound && (
          <div
            className="absolute inset-[18%] rounded-full border border-black/15"
            style={{ backgroundColor: item.accentColor || color }}
          />
        )}
        {item.category === "beds" && (
          <div
            className="absolute left-0 right-0 top-0 h-[22%] border-b border-black/10"
            style={{ backgroundColor: item.accentColor || "#E8E0D5" }}
          />
        )}
        {item.category === "lighting" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-1/2 w-1/2 rounded-full opacity-60"
              style={{ backgroundColor: item.accentColor || "#F5E6C8" }}
            />
          </div>
        )}
        {item.category === "rugs" && (
          <div
            className="absolute inset-2 border border-dashed opacity-40"
            style={{ borderColor: item.accentColor || "#fff" }}
          />
        )}
        {item.category === "decor" && item.id.includes("plant") && (
          <div className="absolute inset-0 flex items-center justify-center text-lg">
            🌿
          </div>
        )}

        <div
          className="absolute inset-x-0 bottom-0 truncate px-1 py-0.5 text-center text-[9px] font-semibold uppercase tracking-wide sm:text-[10px]"
          style={{ color: textColor, backgroundColor: "rgba(0,0,0,0.08)" }}
        >
          {item.name.split(" ").slice(0, 2).join(" ")}
        </div>
      </div>
    </div>
  );
}
