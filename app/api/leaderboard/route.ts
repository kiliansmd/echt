import { NextResponse } from "next/server";
import { socialRepository } from "@/lib/repositories/social-repository";
export async function GET() { return NextResponse.json(await socialRepository.leaderboard()); }
