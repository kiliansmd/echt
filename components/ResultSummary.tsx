"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

export function ResultSummary({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [result, setResult] = useState({ score: 0, correct: 0 });
  useEffect(() => { const saved = sessionStorage.getItem("lastResult"); if (saved) setResult(JSON.parse(saved)); }, []);
  const share = async () => { const text = `${t.brand.name} — ${result.correct}/10 · ${result.score} XP`; if (navigator.share) await navigator.share({ title: t.brand.name, text }); else await navigator.clipboard.writeText(text); };
  return <section className="page result"><span className="wordmark">{t.brand.name}</span><div className="score">{result.correct}/10</div><h1 className="title">{t.result.title}</h1><b>{t.result.top}</b><div className="result-grid"><div className="stat"><b>+{result.score}</b><span>XP</span></div><div className="stat"><b>{Math.min(result.correct, 6)}</b><span>{t.result.longest}</span></div><div className="stat"><b>2.8s</b><span>{t.result.average}</span></div><div className="stat"><b>{result.correct * 10}%</b><span>{t.profile.accuracy}</span></div></div><div className="actions"><Link href={`/${locale}/play`} className="button primary full">{t.result.again}</Link><Link href={`/${locale}/friends`} className="button secondary full">{t.result.challenge}</Link><button className="button secondary full" onClick={share}>{t.common.share}</button></div></section>;
}
