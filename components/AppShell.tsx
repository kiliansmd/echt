import type {Locale} from "@/lib/i18n";import {BottomNav} from "./BottomNav";
export function AppShell({locale,children}:{locale:Locale;children:React.ReactNode}){return <main className="app">{children}<BottomNav locale={locale}/></main>}
