import {Game} from "@/components/Game";import {isLocale} from "@/lib/i18n";import {notFound} from "next/navigation";
export default async function DailyPlay({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <Game locale={locale} daily/>}
