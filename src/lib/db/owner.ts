import { cookies } from "next/headers";
import { auth } from "@/auth";
import { generateId } from "@/lib/utils";

const COOKIE = "hauslab_owner";

export type Identity =
  | { kind: "user"; userId: string }
  | { kind: "guest"; ownerKey: string };

async function ensureGuestKey(): Promise<string> {
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

/** Prefer logged-in user; fall back to anonymous browser cookie. */
export async function getIdentity(): Promise<Identity> {
  const session = await auth();
  if (session?.user?.id) {
    return { kind: "user", userId: session.user.id };
  }
  const ownerKey = await ensureGuestKey();
  return { kind: "guest", ownerKey };
}

/** Prisma where clause for resources owned by the current identity. */
export function ownershipWhere(identity: Identity) {
  if (identity.kind === "user") {
    return { userId: identity.userId };
  }
  return { ownerKey: identity.ownerKey, userId: null };
}

/** Fields to set when creating a resource. */
export function ownershipCreate(identity: Identity) {
  if (identity.kind === "user") {
    return { userId: identity.userId, ownerKey: null as string | null };
  }
  return { ownerKey: identity.ownerKey, userId: null as string | null };
}

/** @deprecated use getIdentity */
export async function getOwnerKey(): Promise<string> {
  const id = await getIdentity();
  if (id.kind === "guest") return id.ownerKey;
  return id.userId;
}
