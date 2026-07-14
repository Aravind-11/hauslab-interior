"use client";

import { useDesignStore } from "@/lib/store/design-store";
import { getFurnitureById } from "@/lib/data/furniture";
import { Button } from "@/components/ui/button";
import { formatCurrency, downloadJson, cn } from "@/lib/utils";
import { FLOOR_PRESETS, WALL_PRESETS } from "@/lib/data/colors";
import { ROOM_TEMPLATES } from "@/lib/data/rooms";
import type { RoomType } from "@/types";
import {
  Cloud,
  CloudUpload,
  Download,
  Grid3X3,
  Magnet,
  RotateCw,
  Save,
  Trash2,
  ZoomIn,
  ZoomOut,
  FilePlus,
  FolderOpen,
  Loader2,
} from "lucide-react";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { DesignProject } from "@/types";
import {
  deleteCloudProject,
  fetchCloudProjects,
  saveCloudProject,
} from "@/lib/api/projects";

export function StudioToolbar() {
  const project = useDesignStore((s) => s.project);
  const selectedId = useDesignStore((s) => s.selectedId);
  const scale = useDesignStore((s) => s.scale);
  const showGrid = useDesignStore((s) => s.showGrid);
  const snapToGrid = useDesignStore((s) => s.snapToGrid);
  const setScale = useDesignStore((s) => s.setScale);
  const toggleGrid = useDesignStore((s) => s.toggleGrid);
  const toggleSnap = useDesignStore((s) => s.toggleSnap);
  const rotateFurniture = useDesignStore((s) => s.rotateFurniture);
  const removeFurniture = useDesignStore((s) => s.removeFurniture);
  const updateRoom = useDesignStore((s) => s.updateRoom);
  const setRoomType = useDesignStore((s) => s.setRoomType);
  const renameProject = useDesignStore((s) => s.renameProject);
  const saveProject = useDesignStore((s) => s.saveProject);
  const newProject = useDesignStore((s) => s.newProject);
  const savedProjects = useDesignStore((s) => s.savedProjects);
  const loadProject = useDesignStore((s) => s.loadProject);
  const clearFurniture = useDesignStore((s) => s.clearFurniture);
  const updateFurniture = useDesignStore((s) => s.updateFurniture);

  const [showSaves, setShowSaves] = useState(false);
  const [savedToast, setSavedToast] = useState<string | null>(null);
  const [cloudProjects, setCloudProjects] = useState<DesignProject[]>([]);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudBusy, setCloudBusy] = useState(false);
  const [showCloud, setShowCloud] = useState(false);
  // keep id when loading from cloud
  const setProjectDirect = useDesignStore.setState;
  const { data: session } = useSession();

  const selected = project.furniture.find((f) => f.instanceId === selectedId);
  const selectedItem = selected ? getFurnitureById(selected.furnitureId) : null;

  const totalCost = useMemo(
    () =>
      project.furniture.reduce((sum, f) => {
        const item = getFurnitureById(f.furnitureId);
        return sum + (item?.price ?? 0);
      }, 0),
    [project.furniture]
  );

  const refreshCloud = async () => {
    setCloudLoading(true);
    try {
      const list = await fetchCloudProjects();
      setCloudProjects(list);
    } catch (e) {
      console.error(e);
      setSavedToast("Cloud load failed");
      setTimeout(() => setSavedToast(null), 2500);
    } finally {
      setCloudLoading(false);
    }
  };

  useEffect(() => {
    if (showCloud) void refreshCloud();
  }, [showCloud]);

  const handleSaveLocal = () => {
    saveProject();
    setSavedToast("Saved on this device");
    setTimeout(() => setSavedToast(null), 2000);
  };

  const handleSaveCloud = async () => {
    setCloudBusy(true);
    try {
      const saved = await saveCloudProject(project);
      // keep local store in sync with DB id + furniture instance ids
      setProjectDirect({ project: saved, selectedId: null });
      saveProject();
      setSavedToast("Saved to cloud database");
      setTimeout(() => setSavedToast(null), 2500);
      if (showCloud) void refreshCloud();
    } catch (e) {
      console.error(e);
      setSavedToast(e instanceof Error ? e.message : "Cloud save failed");
      setTimeout(() => setSavedToast(null), 3000);
    } finally {
      setCloudBusy(false);
    }
  };

  const handleLoadCloud = (p: DesignProject) => {
    setProjectDirect({ project: p, selectedId: null });
    setShowCloud(false);
    setSavedToast(`Loaded “${p.name}” from cloud`);
    setTimeout(() => setSavedToast(null), 2000);
  };

  const handleDeleteCloud = async (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this cloud project?")) return;
    try {
      await deleteCloudProject(id);
      setCloudProjects((list) => list.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Project header */}
      <div className="rounded-2xl border border-ink/8 bg-white p-4 shadow-sm">
        <input
          value={project.name}
          onChange={(e) => renameProject(e.target.value)}
          className="w-full border-0 bg-transparent font-display text-xl text-ink outline-none"
          aria-label="Project name"
        />
        <p className="mt-1 text-xs text-ink/45">
          {project.furniture.length} pieces · {formatCurrency(totalCost)} total
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Button size="sm" onClick={handleSaveCloud} disabled={cloudBusy}>
            {cloudBusy ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CloudUpload className="h-3.5 w-3.5" />
            )}
            Save to cloud
          </Button>
          <Button size="sm" variant="outline" onClick={handleSaveLocal}>
            <Save className="h-3.5 w-3.5" />
            Local
          </Button>
          <Button size="sm" variant="outline" onClick={() => newProject(project.room.type)}>
            <FilePlus className="h-3.5 w-3.5" />
            New
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setShowCloud((v) => !v);
              setShowSaves(false);
            }}
          >
            <Cloud className="h-3.5 w-3.5" />
            Cloud
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setShowSaves((v) => !v);
              setShowCloud(false);
            }}
          >
            <FolderOpen className="h-3.5 w-3.5" />
            Device
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => downloadJson(project, `${project.name.replace(/\s+/g, "-").toLowerCase()}.json`)}
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-ink/45">
          {session?.user ? (
            <>Signed in as <span className="font-medium text-ink/70">{session.user.email}</span> — cloud saves sync to your account.</>
          ) : (
            <>
              Guest mode — cloud saves stay on this browser.{" "}
              <Link href="/login" className="font-medium text-brass-dark hover:underline">
                Log in
              </Link>{" "}
              to sync across devices.
            </>
          )}
        </p>
        {savedToast && (
          <p className="mt-2 text-xs font-medium text-emerald-700">{savedToast}</p>
        )}
        {showCloud && (
          <div className="mt-3 max-h-48 space-y-1 overflow-y-auto rounded-xl border border-ink/8 bg-cream p-2">
            {cloudLoading && (
              <p className="flex items-center gap-2 p-2 text-xs text-ink/45">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading cloud…
              </p>
            )}
            {!cloudLoading && cloudProjects.length === 0 && (
              <p className="p-2 text-xs text-ink/45">No cloud projects yet. Hit Save to cloud.</p>
            )}
            {cloudProjects.map((p) => (
              <div
                key={p.id}
                className="flex w-full items-center gap-1 rounded-lg px-2 py-2 text-left text-xs hover:bg-white"
              >
                <button
                  type="button"
                  onClick={() => handleLoadCloud(p)}
                  className="min-w-0 flex-1 text-left"
                >
                  <span className="block truncate font-medium text-ink">{p.name}</span>
                  <span className="text-ink/40">
                    {new Date(p.updatedAt).toLocaleString()} · {p.furniture.length} pcs
                  </span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDeleteCloud(p.id, e)}
                  className="rounded p-1 text-ink/30 hover:bg-ink/5 hover:text-ink"
                  aria-label="Delete cloud project"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        {showSaves && (
          <div className="mt-3 max-h-40 space-y-1 overflow-y-auto rounded-xl border border-ink/8 bg-cream p-2">
            {savedProjects.length === 0 && (
              <p className="p-2 text-xs text-ink/45">No device saves yet.</p>
            )}
            {savedProjects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  loadProject(p.id);
                  setShowSaves(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-xs hover:bg-white"
              >
                <span className="font-medium text-ink">{p.name}</span>
                <span className="text-ink/40">
                  {new Date(p.updatedAt).toLocaleDateString()}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Room type & size */}
      <div className="rounded-2xl border border-ink/8 bg-white p-4 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/40">
          Room
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(Object.keys(ROOM_TEMPLATES) as RoomType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setRoomType(type)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-medium transition",
                project.room.type === type
                  ? "bg-ink text-cream"
                  : "bg-ink/5 text-ink/60 hover:bg-ink/10"
              )}
            >
              {ROOM_TEMPLATES[type].label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="text-xs text-ink/50">
            Width (ft)
            <input
              type="number"
              min={6}
              max={40}
              value={project.room.widthFt}
              onChange={(e) =>
                updateRoom({ widthFt: Math.max(6, Math.min(40, Number(e.target.value) || 6)) })
              }
              className="mt-1 h-9 w-full rounded-lg border border-ink/10 px-2 text-sm outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>
          <label className="text-xs text-ink/50">
            Depth (ft)
            <input
              type="number"
              min={6}
              max={40}
              value={project.room.depthFt}
              onChange={(e) =>
                updateRoom({ depthFt: Math.max(6, Math.min(40, Number(e.target.value) || 6)) })
              }
              className="mt-1 h-9 w-full rounded-lg border border-ink/10 px-2 text-sm outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>
        </div>
      </div>

      {/* Surfaces */}
      <div className="rounded-2xl border border-ink/8 bg-white p-4 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/40">
          Walls
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {WALL_PRESETS.map((w) => (
            <button
              key={w.hex}
              type="button"
              title={w.name}
              onClick={() => updateRoom({ wallColor: w.hex })}
              className={cn(
                "h-7 w-7 rounded-full border-2 transition",
                project.room.wallColor === w.hex
                  ? "border-brass scale-110"
                  : "border-black/10 hover:scale-105"
              )}
              style={{ backgroundColor: w.hex }}
            />
          ))}
          <input
            type="color"
            value={project.room.wallColor}
            onChange={(e) => updateRoom({ wallColor: e.target.value })}
            className="h-7 w-7 cursor-pointer rounded-full border-0 bg-transparent p-0"
            title="Custom wall color"
          />
        </div>
        <h3 className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink/40">
          Floor
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {FLOOR_PRESETS.map((f) => (
            <button
              key={f.name}
              type="button"
              title={f.name}
              onClick={() =>
                updateRoom({ floorColor: f.hex, floorPattern: f.pattern })
              }
              className={cn(
                "h-7 w-7 rounded-md border-2 transition",
                project.room.floorColor === f.hex
                  ? "border-brass scale-110"
                  : "border-black/10 hover:scale-105"
              )}
              style={{ backgroundColor: f.hex }}
            />
          ))}
        </div>
      </div>

      {/* View controls */}
      <div className="rounded-2xl border border-ink/8 bg-white p-4 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/40">
          View
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Button
            size="sm"
            variant={showGrid ? "primary" : "outline"}
            onClick={toggleGrid}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            Grid
          </Button>
          <Button
            size="sm"
            variant={snapToGrid ? "primary" : "outline"}
            onClick={toggleSnap}
          >
            <Magnet className="h-3.5 w-3.5" />
            Snap
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setScale(Math.max(20, scale - 4))}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setScale(Math.min(56, scale + 4))}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="outline" onClick={clearFurniture}>
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </div>

      {/* Selection */}
      {selected && selectedItem && (
        <div className="rounded-2xl border border-brass/30 bg-brass/5 p-4 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-brass-dark">
            Selected
          </h3>
          <p className="mt-1 font-medium text-ink">{selectedItem.name}</p>
          <p className="text-xs text-ink/50">
            {formatCurrency(selectedItem.price)} · {selectedItem.dimensions.width}&apos; ×{" "}
            {selectedItem.dimensions.depth}&apos;
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => rotateFurniture(selected.instanceId)}
            >
              <RotateCw className="h-3.5 w-3.5" />
              Rotate 45°
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeFurniture(selected.instanceId)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </Button>
          </div>
          <label className="mt-3 block text-xs text-ink/50">
            Color override
            <input
              type="color"
              value={selected.colorOverride || selectedItem.color}
              onChange={(e) =>
                updateFurniture(selected.instanceId, {
                  colorOverride: e.target.value,
                })
              }
              className="mt-1 h-9 w-full cursor-pointer rounded-lg border border-ink/10"
            />
          </label>
        </div>
      )}
    </div>
  );
}
