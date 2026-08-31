"use client";
import {useRouter,usePathname} from "next/navigation";import type {Locale} from "@/lib/i18n";
export function LanguageSelect({locale,label}:{locale:Locale;label:string}){const router=useRouter(),path=usePathname();return <label className="field"><b>{label}</b><select className="select" value={locale} onChange={e=>{const next=e.target.value;document.cookie=`locale=${next};path=/;max-age=31536000;samesite=lax`;router.replace(path.replace(/^\/(en|de)/,`/${next}`))}}><option value="de">Deutsch</option><option value="en">English</option></select></label>}
