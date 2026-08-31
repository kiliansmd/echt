import { NextResponse } from "next/server";
import { gameRepository } from "@/lib/repositories/game-repository";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await gameRepository.session((await params).id);
  return session ? NextResponse.json(session) : NextResponse.json({ error: "SESSION_NOT_FOUND" }, { status: 404 });
}
