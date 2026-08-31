import {NextRequest,NextResponse} from "next/server";
export function proxy(request:NextRequest){const {pathname}=request.nextUrl;if(pathname!=="/")return NextResponse.next();const saved=request.cookies.get("locale")?.value;const detected=request.headers.get("accept-language")?.toLowerCase().startsWith("de")?"de":"en";return NextResponse.redirect(new URL(`/${saved==="de"||saved==="en"?saved:detected}`,request.url))}
export const config={matcher:["/"]};
