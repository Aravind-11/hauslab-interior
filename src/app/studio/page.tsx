import type { Metadata } from "next";
import { StudioClient } from "./studio-client";

export const metadata: Metadata = {
  title: "Room planner",
  description:
    "Interactive floor plan tool — place furniture, set walls and floors, save your layouts.",
};

export default function StudioPage() {
  return <StudioClient />;
}
