import { NextRequest, NextResponse } from "next/server";
import { gameRepository } from "@/lib/repositories/game-repository";
import type { GameSession } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json() as { mode?: GameSession["mode"]; imageIds?: string[] };
  if (!body.mode || !["STANDARD", "DAILY", "CHALLENGE"].includes(body.mode) || !body.imageIds?.length) {
    return NextResponse.json({ error: "INVALID_SESSION" }, { status: 400 });
  }
  const published = await gameRepository.publishedImages();
  const allowed = new Set(published.map((item) => item.id));
  if (body.imageIds.some((id) => !allowed.has(id))) return NextResponse.json({ error: "UNKNOWN_IMAGE" }, { status: 400 });
  return NextResponse.json(await gameRepository.createSession(body.mode, body.imageIds), { status: 201 });
}
