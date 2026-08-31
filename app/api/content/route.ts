import { NextResponse } from "next/server";
import { gameRepository } from "@/lib/repositories/game-repository";

export async function GET() {
  const items = await gameRepository.publishedImages();
  return NextResponse.json(items.map(({ answer: _answer, explanation: _explanation, sourceUrl: _sourceUrl, stats: _stats, ...safe }) => safe));
}
