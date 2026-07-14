import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerKey } from "@/lib/db/owner";
import { projectToDesign } from "@/lib/db/mappers";
import type { DesignProject } from "@/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const ownerKey = await getOwnerKey();
    const rows = await prisma.project.findMany({
      where: { ownerKey },
      include: { furniture: true },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({
      projects: rows.map(projectToDesign),
    });
  } catch (err) {
    console.error("GET /api/projects", err);
    return NextResponse.json(
      { error: "Failed to load projects", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ownerKey = await getOwnerKey();
    const body = (await req.json()) as { project: DesignProject };
    const p = body.project;
    if (!p?.name || !p?.room) {
      return NextResponse.json({ error: "Invalid project payload" }, { status: 400 });
    }

    const existing = p.id
      ? await prisma.project.findFirst({ where: { id: p.id, ownerKey } })
      : null;

    if (existing) {
      await prisma.placedFurniture.deleteMany({ where: { projectId: existing.id } });
      const updated = await prisma.project.update({
        where: { id: existing.id },
        data: {
          name: p.name,
          roomType: p.room.type,
          roomName: p.room.name,
          widthFt: p.room.widthFt,
          depthFt: p.room.depthFt,
          wallColor: p.room.wallColor,
          floorColor: p.room.floorColor,
          floorPattern: p.room.floorPattern,
          furniture: {
            create: p.furniture.map((f) => ({
              furnitureId: f.furnitureId,
              x: f.x,
              y: f.y,
              rotation: f.rotation,
              scale: f.scale,
              colorOverride: f.colorOverride ?? null,
            })),
          },
        },
        include: { furniture: true },
      });
      return NextResponse.json({ project: projectToDesign(updated) });
    }

    const created = await prisma.project.create({
      data: {
        name: p.name,
        roomType: p.room.type,
        roomName: p.room.name,
        widthFt: p.room.widthFt,
        depthFt: p.room.depthFt,
        wallColor: p.room.wallColor,
        floorColor: p.room.floorColor,
        floorPattern: p.room.floorPattern,
        ownerKey,
        furniture: {
          create: p.furniture.map((f) => ({
            furnitureId: f.furnitureId,
            x: f.x,
            y: f.y,
            rotation: f.rotation,
            scale: f.scale,
            colorOverride: f.colorOverride ?? null,
          })),
        },
      },
      include: { furniture: true },
    });

    return NextResponse.json({ project: projectToDesign(created) }, { status: 201 });
  } catch (err) {
    console.error("POST /api/projects", err);
    return NextResponse.json(
      { error: "Failed to save project", detail: String(err) },
      { status: 500 }
    );
  }
}
