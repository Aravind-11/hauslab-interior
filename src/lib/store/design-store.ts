"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  DesignProject,
  MoodBoardItem,
  PlacedFurniture,
  RoomConfig,
  RoomType,
} from "@/types";
import { ROOM_TEMPLATES } from "@/lib/data/rooms";
import { generateId } from "@/lib/utils";

interface DesignState {
  project: DesignProject;
  selectedId: string | null;
  scale: number; // pixels per foot
  showGrid: boolean;
  snapToGrid: boolean;
  moodBoard: MoodBoardItem[];
  savedProjects: DesignProject[];

  // Room actions
  setRoomType: (type: RoomType) => void;
  updateRoom: (partial: Partial<RoomConfig>) => void;
  renameProject: (name: string) => void;

  // Furniture actions
  addFurniture: (furnitureId: string, x?: number, y?: number) => void;
  updateFurniture: (instanceId: string, partial: Partial<PlacedFurniture>) => void;
  removeFurniture: (instanceId: string) => void;
  selectFurniture: (instanceId: string | null) => void;
  rotateFurniture: (instanceId: string, delta?: number) => void;
  clearFurniture: () => void;

  // View
  setScale: (scale: number) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;

  // Project
  newProject: (type?: RoomType) => void;
  saveProject: () => void;
  loadProject: (id: string) => void;
  deleteSavedProject: (id: string) => void;
  importProject: (project: DesignProject) => void;

  // Mood board
  addMoodItem: (item: Omit<MoodBoardItem, "id">) => void;
  updateMoodItem: (id: string, partial: Partial<MoodBoardItem>) => void;
  removeMoodItem: (id: string) => void;
  clearMoodBoard: () => void;
}

function createDefaultProject(type: RoomType = "living"): DesignProject {
  const now = new Date().toISOString();
  return {
    id: generateId("proj"),
    name: "Untitled Design",
    room: { ...ROOM_TEMPLATES[type].default },
    furniture: [],
    createdAt: now,
    updatedAt: now,
  };
}

export const useDesignStore = create<DesignState>()(
  persist(
    (set, get) => ({
      project: createDefaultProject(),
      selectedId: null,
      scale: 36,
      showGrid: true,
      snapToGrid: true,
      moodBoard: [],
      savedProjects: [],

      setRoomType: (type) =>
        set((s) => ({
          project: {
            ...s.project,
            room: { ...ROOM_TEMPLATES[type].default, name: s.project.room.name || ROOM_TEMPLATES[type].default.name },
            furniture: [],
            updatedAt: new Date().toISOString(),
          },
          selectedId: null,
        })),

      updateRoom: (partial) =>
        set((s) => ({
          project: {
            ...s.project,
            room: { ...s.project.room, ...partial },
            updatedAt: new Date().toISOString(),
          },
        })),

      renameProject: (name) =>
        set((s) => ({
          project: { ...s.project, name, updatedAt: new Date().toISOString() },
        })),

      addFurniture: (furnitureId, x, y) => {
        const { project, scale, snapToGrid } = get();
        const roomW = project.room.widthFt * scale;
        const roomD = project.room.depthFt * scale;
        let px = x ?? roomW / 2 - 40;
        let py = y ?? roomD / 2 - 40;
        if (snapToGrid) {
          const g = scale / 2;
          px = Math.round(px / g) * g;
          py = Math.round(py / g) * g;
        }
        const item: PlacedFurniture = {
          instanceId: generateId("furn"),
          furnitureId,
          x: px,
          y: py,
          rotation: 0,
          scale: 1,
        };
        set({
          project: {
            ...project,
            furniture: [...project.furniture, item],
            updatedAt: new Date().toISOString(),
          },
          selectedId: item.instanceId,
        });
      },

      updateFurniture: (instanceId, partial) =>
        set((s) => ({
          project: {
            ...s.project,
            furniture: s.project.furniture.map((f) =>
              f.instanceId === instanceId ? { ...f, ...partial } : f
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      removeFurniture: (instanceId) =>
        set((s) => ({
          project: {
            ...s.project,
            furniture: s.project.furniture.filter((f) => f.instanceId !== instanceId),
            updatedAt: new Date().toISOString(),
          },
          selectedId: s.selectedId === instanceId ? null : s.selectedId,
        })),

      selectFurniture: (instanceId) => set({ selectedId: instanceId }),

      rotateFurniture: (instanceId, delta = 45) =>
        set((s) => ({
          project: {
            ...s.project,
            furniture: s.project.furniture.map((f) =>
              f.instanceId === instanceId
                ? { ...f, rotation: (f.rotation + delta) % 360 }
                : f
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      clearFurniture: () =>
        set((s) => ({
          project: {
            ...s.project,
            furniture: [],
            updatedAt: new Date().toISOString(),
          },
          selectedId: null,
        })),

      setScale: (scale) => set({ scale }),
      toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
      toggleSnap: () => set((s) => ({ snapToGrid: !s.snapToGrid })),

      newProject: (type = "living") =>
        set({
          project: createDefaultProject(type),
          selectedId: null,
        }),

      saveProject: () => {
        const { project, savedProjects } = get();
        const updated = {
          ...project,
          updatedAt: new Date().toISOString(),
        };
        const existing = savedProjects.findIndex((p) => p.id === updated.id);
        const next =
          existing >= 0
            ? savedProjects.map((p, i) => (i === existing ? updated : p))
            : [...savedProjects, updated];
        set({ project: updated, savedProjects: next });
      },

      loadProject: (id) => {
        const found = get().savedProjects.find((p) => p.id === id);
        if (found) {
          set({
            project: JSON.parse(JSON.stringify(found)),
            selectedId: null,
          });
        }
      },

      deleteSavedProject: (id) =>
        set((s) => ({
          savedProjects: s.savedProjects.filter((p) => p.id !== id),
        })),

      importProject: (project) =>
        set({
          project: { ...project, id: generateId("proj") },
          selectedId: null,
        }),

      addMoodItem: (item) =>
        set((s) => ({
          moodBoard: [...s.moodBoard, { ...item, id: generateId("mood") }],
        })),

      updateMoodItem: (id, partial) =>
        set((s) => ({
          moodBoard: s.moodBoard.map((m) => (m.id === id ? { ...m, ...partial } : m)),
        })),

      removeMoodItem: (id) =>
        set((s) => ({
          moodBoard: s.moodBoard.filter((m) => m.id !== id),
        })),

      clearMoodBoard: () => set({ moodBoard: [] }),
    }),
    {
      name: "interior-studio-v1",
      partialize: (s) => ({
        project: s.project,
        moodBoard: s.moodBoard,
        savedProjects: s.savedProjects,
        showGrid: s.showGrid,
        snapToGrid: s.snapToGrid,
        scale: s.scale,
      }),
    }
  )
);
