export type RoomType =
  | "living"
  | "bedroom"
  | "kitchen"
  | "dining"
  | "office"
  | "bathroom";

export type FurnitureCategory =
  | "seating"
  | "tables"
  | "storage"
  | "beds"
  | "lighting"
  | "decor"
  | "rugs";

export type DesignStyle =
  | "minimalist"
  | "scandinavian"
  | "industrial"
  | "mid-century"
  | "bohemian"
  | "contemporary"
  | "japandi"
  | "coastal";

export interface Dimensions {
  width: number;
  depth: number;
  height?: number;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: FurnitureCategory;
  style: DesignStyle[];
  price: number;
  dimensions: Dimensions;
  color: string;
  accentColor?: string;
  shape: "rect" | "round" | "lshape" | "oval";
  description: string;
  tags: string[];
}

export interface PlacedFurniture {
  instanceId: string;
  furnitureId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  colorOverride?: string;
}

export interface RoomConfig {
  type: RoomType;
  name: string;
  widthFt: number;
  depthFt: number;
  wallColor: string;
  floorColor: string;
  floorPattern: "wood" | "tile" | "concrete" | "carpet";
}

export interface DesignProject {
  id: string;
  name: string;
  room: RoomConfig;
  furniture: PlacedFurniture[];
  updatedAt: string;
  createdAt: string;
}

export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  role: "primary" | "secondary" | "accent" | "neutral" | "surface";
}

export interface MoodBoardItem {
  id: string;
  type: "color" | "texture" | "furniture" | "note";
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  label?: string;
  rotation?: number;
}

export interface StyleProfile {
  style: DesignStyle;
  score: number;
  description: string;
  colors: string[];
  keywords: string[];
}

export interface CatalogFilters {
  category: FurnitureCategory | "all";
  style: DesignStyle | "all";
  maxPrice: number;
  search: string;
}
