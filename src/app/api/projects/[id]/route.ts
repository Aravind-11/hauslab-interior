import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerKey } from "@/lib/db/owner";
import { projectToDesign } from "@/lib/db/mappers";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const ownerKey = await getOwnerKey();
    const row = await prisma.project.findFirst({
      where: { id, ownerKey },
      include: { furniture: true },
    });
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ project: projectToDesign(row) });
  } catch (err) {
    console.error("GET /api/projects/[id]", err);
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const ownerKey = await getOwnerKey();
    const row = await prisma.project.findFirst({ where: { id, ownerKey } });
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/projects/[id]", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
