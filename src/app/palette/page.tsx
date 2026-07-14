import type { Metadata } from "next";
import { PaletteClient } from "./palette-client";

export const metadata: Metadata = {
  title: "Color Studio",
  description: "Explore curated interior palettes and build custom color schemes.",
};

export default function PalettePage() {
  return <PaletteClient />;
}
