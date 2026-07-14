import type { Metadata } from "next";
import { MoodboardClient } from "./moodboard-client";

export const metadata: Metadata = {
  title: "Mood Board",
  description: "Compose freeform mood boards with colors, notes, and furniture references.",
};

export default function MoodboardPage() {
  return <MoodboardClient />;
}
