import type { DesignProject, MoodBoardItem, PlacedFurniture, RoomType } from "@/types";

type ProjectRow = {
  id: string;
  name: string;
  roomType: string;
  roomName: string;
  widthFt: number;
  depthFt: number;
  wallColor: string;
  floorColor: string;
  floorPattern: string;
  createdAt: Date;
  updatedAt: Date;
  furniture: {
    id: string;
    furnitureId: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    colorOverride: string | null;
  }[];
};

export function projectToDesign(row: ProjectRow): DesignProject {
  return {
    id: row.id,
    name: row.name,
    room: {
      type: row.roomType as RoomType,
      name: row.roomName,
      widthFt: row.widthFt,
      depthFt: row.depthFt,
      wallColor: row.wallColor,
      floorColor: row.floorColor,
      floorPattern: row.floorPattern as DesignProject["room"]["floorPattern"],
    },
    furniture: row.furniture.map(
      (f): PlacedFurniture => ({
        instanceId: f.id,
        furnitureId: f.furnitureId,
        x: f.x,
        y: f.y,
        rotation: f.rotation,
        scale: f.scale,
        colorOverride: f.colorOverride ?? undefined,
      })
    ),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export type MoodItemRow = {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  label: string | null;
  rotation: number;
};

export function rowToMoodItem(row: MoodItemRow): MoodBoardItem {
  return {
    id: row.id,
    type: row.type as MoodBoardItem["type"],
    x: row.x,
    y: row.y,
    width: row.width,
    height: row.height,
    content: row.content,
    label: row.label ?? undefined,
    rotation: row.rotation,
  };
}
