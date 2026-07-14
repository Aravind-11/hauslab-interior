import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, db: "up" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, db: "down", detail: String(err) },
      { status: 500 }
    );
  }
}
