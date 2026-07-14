import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  getIdentity,
  ownershipCreate,
  ownershipWhere,
} from "@/lib/db/owner";
import { rowToMoodItem } from "@/lib/db/mappers";
import type { MoodBoardItem } from "@/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const identity = await getIdentity();
    let board = await prisma.moodBoard.findFirst({
      where: ownershipWhere(identity),
      include: { items: true },
      orderBy: { updatedAt: "desc" },
    });
    if (!board) {
      board = await prisma.moodBoard.create({
        data: {
          name: "My mood board",
          ...ownershipCreate(identity),
        },
        include: { items: true },
      });
    }
    return NextResponse.json({
      id: board.id,
      name: board.name,
      items: board.items.map(rowToMoodItem),
      identity: identity.kind,
    });
  } catch (err) {
    console.error("GET /api/moodboards", err);
    return NextResponse.json({ error: "Failed to load mood board" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const identity = await getIdentity();
    const body = (await req.json()) as {
      name?: string;
      items: MoodBoardItem[];
    };

    let board = await prisma.moodBoard.findFirst({
      where: ownershipWhere(identity),
    });
    if (!board) {
      board = await prisma.moodBoard.create({
        data: {
          name: body.name ?? "My mood board",
          ...ownershipCreate(identity),
        },
      });
    } else if (body.name) {
      board = await prisma.moodBoard.update({
        where: { id: board.id },
        data: { name: body.name },
      });
    }

    await prisma.moodBoardItem.deleteMany({ where: { moodBoardId: board.id } });
    const items = body.items ?? [];
    if (items.length > 0) {
      await prisma.moodBoardItem.createMany({
        data: items.map((item) => ({
          moodBoardId: board!.id,
          type: item.type,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
          content: item.content,
          label: item.label ?? null,
          rotation: item.rotation ?? 0,
        })),
      });
    }

    const full = await prisma.moodBoard.findUniqueOrThrow({
      where: { id: board.id },
      include: { items: true },
    });

    return NextResponse.json({
      id: full.id,
      name: full.name,
      items: full.items.map(rowToMoodItem),
    });
  } catch (err) {
    console.error("PUT /api/moodboards", err);
    return NextResponse.json({ error: "Failed to save mood board" }, { status: 500 });
  }
}
