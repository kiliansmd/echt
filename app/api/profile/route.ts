import { NextRequest, NextResponse } from "next/server";
import { demoUserId, socialRepository } from "@/lib/repositories/social-repository";
export async function GET() { return NextResponse.json(await socialRepository.profile(demoUserId)); }
export async function PATCH(request: NextRequest) { const { locale } = await request.json() as { locale?: string }; if (locale !== "en" && locale !== "de") return NextResponse.json({ error: "INVALID_LOCALE" }, { status: 400 }); return NextResponse.json(await socialRepository.setLocale(demoUserId, locale)); }
