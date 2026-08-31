import { NextRequest, NextResponse } from "next/server";
import { gameRepository } from "@/lib/repositories/game-repository";

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("date");
  const date = /^\d{4}-\d{2}-\d{2}$/.test(requested ?? "") ? requested! : new Date().toISOString().slice(0, 10);
  return NextResponse.json(await gameRepository.daily(date));
}
