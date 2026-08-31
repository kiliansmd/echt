import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    const saved = request.cookies.get("locale")?.value;
    const detected = request.headers.get("accept-language")?.toLowerCase().startsWith("de") ? "de" : "en";
    return NextResponse.redirect(new URL(`/${saved === "de" || saved === "en" ? saved : detected}`, request.url));
  }
  const locale = pathname.match(/^\/(en|de)(?:\/|$)/)?.[1] ?? "en";
  const headers = new Headers(request.headers);
  headers.set("x-app-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|icon.svg|manifest.webmanifest).*)"] };
