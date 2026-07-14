import type { Metadata } from "next";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Inspiration Gallery",
  description: "Browse styled room concepts across popular interior design directions.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
