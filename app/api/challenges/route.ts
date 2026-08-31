import { NextRequest, NextResponse } from "next/server";
import { images } from "@/data/images";
import { demoUserId, socialRepository } from "@/lib/repositories/social-repository";
export async function GET() { return NextResponse.json(await socialRepository.challengesFor(demoUserId)); }
export async function POST(request: NextRequest) { const { opponentUserId } = await request.json() as { opponentUserId?: string }; if (!opponentUserId || opponentUserId === demoUserId) return NextResponse.json({ error: "INVALID_OPPONENT" }, { status: 400 }); const imageSet = Array.from({ length: 10 }, (_, i) => images[i % images.length].id); return NextResponse.json(await socialRepository.createChallenge(demoUserId, opponentUserId, imageSet), { status: 201 }); }
