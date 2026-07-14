import { cookies } from "next/headers";
import { generateId } from "@/lib/utils";

const COOKIE = "hauslab_owner";

/** Stable anonymous owner key stored in an httpOnly cookie. */
export async function getOwnerKey(): Promise<string> {
  const jar = await cookies();
  const existing = jar.get(COOKIE)?.value;
  if (existing && existing.length >= 8) return existing;

  const key = generateId("owner");
  jar.set(COOKIE, key, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return key;
}
