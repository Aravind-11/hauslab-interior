import type { ColorSwatch } from "@/types";

export const CURATED_PALETTES: {
  id: string;
  name: string;
  style: string;
  colors: ColorSwatch[];
}[] = [
  {
    id: "warm-minimal",
    name: "Warm Minimal",
    style: "Minimalist",
    colors: [
      { id: "wm1", name: "Porcelain", hex: "#F7F5F2", role: "surface" },
      { id: "wm2", name: "Sand", hex: "#E8E0D5", role: "neutral" },
      { id: "wm3", name: "Clay", hex: "#C4B5A0", role: "primary" },
      { id: "wm4", name: "Charcoal", hex: "#2C2C2C", role: "secondary" },
      { id: "wm5", name: "Brass", hex: "#C9A66B", role: "accent" },
    ],
  },
  {
    id: "nordic-light",
    name: "Nordic Light",
    style: "Scandinavian",
    colors: [
      { id: "nl1", name: "Snow", hex: "#FAFAF8", role: "surface" },
      { id: "nl2", name: "Birch", hex: "#E8DCC8", role: "neutral" },
      { id: "nl3", name: "Sage", hex: "#A8C5B5", role: "primary" },
      { id: "nl4", name: "Honey", hex: "#D4A574", role: "secondary" },
      { id: "nl5", name: "Slate", hex: "#5A6A7A", role: "accent" },
    ],
  },
  {
    id: "urban-loft",
    name: "Urban Loft",
    style: "Industrial",
    colors: [
      { id: "ul1", name: "Concrete", hex: "#E8E0D5", role: "surface" },
      { id: "ul2", name: "Iron", hex: "#3D3D3D", role: "primary" },
      { id: "ul3", name: "Rust", hex: "#8B5A3C", role: "secondary" },
      { id: "ul4", name: "Steel", hex: "#A8A8A8", role: "neutral" },
      { id: "ul5", name: "Copper", hex: "#B87333", role: "accent" },
    ],
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    style: "Coastal",
    colors: [
      { id: "ob1", name: "Foam", hex: "#F7F9FC", role: "surface" },
      { id: "ob2", name: "Driftwood", hex: "#E8DCC8", role: "neutral" },
      { id: "ob3", name: "Seafoam", hex: "#A8C5D4", role: "primary" },
      { id: "ob4", name: "Deep Tide", hex: "#5B8FA8", role: "secondary" },
      { id: "ob5", name: "Coral Soft", hex: "#E8B4A0", role: "accent" },
    ],
  },
  {
    id: "earth-ritual",
    name: "Earth Ritual",
    style: "Japandi",
    colors: [
      { id: "er1", name: "Rice Paper", hex: "#F5F0E8", role: "surface" },
      { id: "er2", name: "Washi", hex: "#EDE6DB", role: "neutral" },
      { id: "er3", name: "Stone", hex: "#8B7E6A", role: "primary" },
      { id: "er4", name: "Ink", hex: "#2C2C2C", role: "secondary" },
      { id: "er5", name: "Matcha", hex: "#7A8B6A", role: "accent" },
    ],
  },
  {
    id: "retro-glow",
    name: "Retro Glow",
    style: "Mid-Century",
    colors: [
      { id: "rg1", name: "Cream", hex: "#F4E8D0", role: "surface" },
      { id: "rg2", name: "Teak", hex: "#D4A574", role: "primary" },
      { id: "rg3", name: "Navy", hex: "#2C3E50", role: "secondary" },
      { id: "rg4", name: "Terracotta", hex: "#E07A5F", role: "accent" },
      { id: "rg5", name: "Mustard", hex: "#C9A227", role: "neutral" },
    ],
  },
];

export const WALL_PRESETS = [
  { name: "Gallery White", hex: "#FAFAF8" },
  { name: "Warm Ivory", hex: "#F5F0E8" },
  { name: "Soft Greige", hex: "#E8E0D5" },
  { name: "Sage Whisper", hex: "#D4DDD4" },
  { name: "Dusty Blue", hex: "#C5D4E0" },
  { name: "Blush Clay", hex: "#E8D5C8" },
  { name: "Deep Charcoal", hex: "#3A3A3A" },
  { name: "Forest Night", hex: "#2D3A2D" },
];

export const FLOOR_PRESETS = [
  { name: "Light Oak", hex: "#D4C4A8", pattern: "wood" as const },
  { name: "Walnut", hex: "#6B4E31", pattern: "wood" as const },
  { name: "Honey Pine", hex: "#C4A574", pattern: "wood" as const },
  { name: "White Oak", hex: "#E8DCC8", pattern: "wood" as const },
  { name: "Grey Tile", hex: "#B8B8B0", pattern: "tile" as const },
  { name: "Marble Cream", hex: "#F0EDE8", pattern: "tile" as const },
  { name: "Polished Concrete", hex: "#A8A8A0", pattern: "concrete" as const },
  { name: "Soft Carpet", hex: "#C4B5A0", pattern: "carpet" as const },
];
