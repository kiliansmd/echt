import "./globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
export const metadata:Metadata={title:"NO WAY",description:"Real or fake?",manifest:"/manifest.webmanifest",appleWebApp:{capable:true,title:"NO WAY",statusBarStyle:"default"},icons:{apple:"/icon.svg"}};
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#f5f3ed"};
export default async function RootLayout({children}:{children:React.ReactNode}){const locale=(await headers()).get("x-app-locale")==="de"?"de":"en";return <html lang={locale}><body>{children}</body></html>}
