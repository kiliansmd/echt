import {isLocale,getDictionary} from "@/lib/i18n";import {notFound} from "next/navigation";import type {Metadata} from "next";
export function generateStaticParams(){return [{locale:"en"},{locale:"de"}]}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return {};const t=getDictionary(locale);return {title:t.meta.title,description:t.meta.description,alternates:{languages:{en:"/en",de:"/de"}}}}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <div lang={locale}>{children}</div>}
