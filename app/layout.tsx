import "./globals.css";
import type { Metadata, Viewport } from "next";
export const metadata:Metadata={title:"NO WAY",description:"Real or fake?",manifest:"/manifest.webmanifest",appleWebApp:{capable:true,title:"NO WAY",statusBarStyle:"default"},icons:{apple:"/icon.svg"}};
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#f5f3ed"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html><body>{children}</body></html>}
