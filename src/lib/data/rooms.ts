import type { RoomConfig, RoomType } from "@/types";

export const ROOM_TEMPLATES: Record<
  RoomType,
  { label: string; default: RoomConfig; icon: string }
> = {
  living: {
    label: "Living Room",
    icon: "sofa",
    default: {
      type: "living",
      name: "Living Room",
      widthFt: 18,
      depthFt: 14,
      wallColor: "#F5F0E8",
      floorColor: "#D4C4A8",
      floorPattern: "wood",
    },
  },
  bedroom: {
    label: "Bedroom",
    icon: "bed",
    default: {
      type: "bedroom",
      name: "Primary Bedroom",
      widthFt: 14,
      depthFt: 12,
      wallColor: "#F7F5F2",
      floorColor: "#E8DCC8",
      floorPattern: "wood",
    },
  },
  kitchen: {
    label: "Kitchen",
    icon: "utensils",
    default: {
      type: "kitchen",
      name: "Kitchen",
      widthFt: 12,
      depthFt: 14,
      wallColor: "#FAFAF8",
      floorColor: "#B8B8B0",
      floorPattern: "tile",
    },
  },
  dining: {
    label: "Dining Room",
    icon: "utensils-crossed",
    default: {
      type: "dining",
      name: "Dining Room",
      widthFt: 12,
      depthFt: 12,
      wallColor: "#F5F0E8",
      floorColor: "#C4A574",
      floorPattern: "wood",
    },
  },
  office: {
    label: "Home Office",
    icon: "briefcase",
    default: {
      type: "office",
      name: "Home Office",
      widthFt: 12,
      depthFt: 10,
      wallColor: "#F0EDE8",
      floorColor: "#D4C4A8",
      floorPattern: "wood",
    },
  },
  bathroom: {
    label: "Bathroom",
    icon: "bath",
    default: {
      type: "bathroom",
      name: "Bathroom",
      widthFt: 8,
      depthFt: 10,
      wallColor: "#F7F9FC",
      floorColor: "#F0EDE8",
      floorPattern: "tile",
    },
  },
};
