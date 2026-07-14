"use client";

import { FurnitureLibrary } from "@/components/studio/furniture-library";
import { RoomCanvas } from "@/components/studio/room-canvas";
import { StudioToolbar } from "@/components/studio/studio-toolbar";
import { useDesignStore } from "@/lib/store/design-store";
import { useEffect, useState } from "react";

export function StudioClient() {
  const [ready, setReady] = useState(false);
  const selectedId = useDesignStore((s) => s.selectedId);
  const removeFurniture = useDesignStore((s) => s.removeFurniture);
  const rotateFurniture = useDesignStore((s) => s.rotateFurniture);
  const selectFurniture = useDesignStore((s) => s.selectFurniture);

  // Avoid hydration mismatch from persisted store
  useEffect(() => setReady(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (!selectedId) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removeFurniture(selectedId);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        rotateFurniture(selectedId);
      } else if (e.key === "Escape") {
        selectFurniture(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, removeFurniture, rotateFurniture, selectFurniture]);

  if (!ready) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-pulse rounded-xl bg-ink/10" />
          <p className="mt-3 text-sm text-ink/50">Loading studio…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-ink/8">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:h-[calc(100vh-4rem)] lg:flex-row">
        {/* Left library */}
        <aside className="w-full shrink-0 border-b border-ink/8 bg-white lg:w-80 lg:border-b-0 lg:border-r lg:overflow-hidden">
          <div className="h-full max-h-[40vh] lg:max-h-none">
            <FurnitureLibrary />
          </div>
        </aside>

        {/* Center canvas */}
        <div className="flex min-h-[480px] flex-1 flex-col lg:min-h-0 lg:overflow-hidden">
          <div className="border-b border-ink/8 bg-white px-4 py-3 sm:px-6">
            <h1 className="font-display text-xl text-ink sm:text-2xl">
              Room planner
            </h1>
            <p className="text-xs text-ink/50 sm:text-sm">
              Drag pieces onto the plan · click to select · press R to rotate ·
              Del to remove
            </p>
          </div>
          <div className="flex-1 overflow-auto p-3 sm:p-4">
            <RoomCanvas />
          </div>
        </div>

        {/* Right toolbar */}
        <aside className="w-full shrink-0 border-t border-ink/8 bg-cream lg:w-80 lg:overflow-y-auto lg:border-l lg:border-t-0">
          <div className="p-4">
            <StudioToolbar />
          </div>
        </aside>
      </div>
    </div>
  );
}
