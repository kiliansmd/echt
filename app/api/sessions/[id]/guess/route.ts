import { NextRequest, NextResponse } from "next/server";
import { gameRepository } from "@/lib/repositories/game-repository";
import type { Answer } from "@/types";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json() as { imageId?: string; answer?: Answer; responseTimeMs?: number };
  if (!body.imageId || !body.answer || !["REAL", "FAKE"].includes(body.answer) || typeof body.responseTimeMs !== "number") {
    return NextResponse.json({ error: "INVALID_GUESS" }, { status: 400 });
  }
  try {
    const guess = await gameRepository.submitGuess(id, body.imageId, body.answer, Math.max(0, body.responseTimeMs));
    const item = (await gameRepository.publishedImages()).find((candidate) => candidate.id === body.imageId)!;
    const correctVotes = item.answer === "REAL" ? item.stats.realVotes : item.stats.fakeVotes;
    const correctPercentage = Math.round(correctVotes / item.stats.timesShown * 100);
    return NextResponse.json({ guess, canonicalAnswer: item.answer, explanation: item.explanation, sourceUrl: item.sourceUrl, correctPercentage });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    return NextResponse.json({ error: code }, { status: code === "SESSION_NOT_FOUND" ? 404 : 409 });
  }
}
