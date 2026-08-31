import { NextResponse } from "next/server";
import { demoUserId, socialRepository } from "@/lib/repositories/social-repository";
export async function GET() { return NextResponse.json(await socialRepository.friends(demoUserId)); }
