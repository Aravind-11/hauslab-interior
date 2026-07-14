import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(body.password ?? "");
    const name = String(body.name ?? "").trim() || null;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, name, passwordHash },
    });

    // Claim guest projects/moodboards from this browser into the new account
    const jar = await cookies();
    const ownerKey = jar.get("hauslab_owner")?.value;
    if (ownerKey) {
      await prisma.project.updateMany({
        where: { ownerKey, userId: null },
        data: { userId: user.id, ownerKey: null },
      });
      await prisma.moodBoard.updateMany({
        where: { ownerKey, userId: null },
        data: { userId: user.id, ownerKey: null },
      });
    }

    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("POST /api/auth/register", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
