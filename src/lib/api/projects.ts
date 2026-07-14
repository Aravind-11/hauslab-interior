import type { DesignProject, MoodBoardItem } from "@/types";

export async function fetchCloudProjects(): Promise<DesignProject[]> {
  const res = await fetch("/api/projects", { cache: "no-store" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "Failed to load projects");
  }
  const data = await res.json();
  return data.projects as DesignProject[];
}

export async function saveCloudProject(
  project: DesignProject
): Promise<DesignProject> {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "Failed to save project");
  }
  const data = await res.json();
  return data.project as DesignProject;
}

export async function deleteCloudProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "Failed to delete project");
  }
}

export async function fetchMoodBoard(): Promise<{
  id: string;
  name: string;
  items: MoodBoardItem[];
}> {
  const res = await fetch("/api/moodboards", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load mood board");
  return res.json();
}

export async function saveMoodBoard(
  items: MoodBoardItem[],
  name?: string
): Promise<{ id: string; name: string; items: MoodBoardItem[] }> {
  const res = await fetch("/api/moodboards", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, name }),
  });
  if (!res.ok) throw new Error("Failed to save mood board");
  return res.json();
}
