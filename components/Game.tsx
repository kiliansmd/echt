"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { triggerFeedback } from "@/lib/feedback";
import type { Answer, LocalizedText } from "@/types";
import { useRouter } from "next/navigation";

type PublicImage = {
  id: string;
  imageUrl: string;
  title: LocalizedText;
};

type Feedback = {
  correct: boolean;
  points: number;
  canonicalAnswer: Answer;
  explanation: LocalizedText;
  sourceUrl?: string;
  correctPercentage: number;
};

export function Game({ locale, daily = false }: { locale: Locale; daily?: boolean }) {
  const t = getDictionary(locale);
  const router = useRouter();
  const [items, setItems] = useState<PublicImage[]>([]);
  const [sessionId, setSessionId] = useState<string>();
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [error, setError] = useState<string>();
  const started = useRef(Date.now());
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-7, 7]);
  const leftOpacity = useTransform(x, [-120, -25], [1, 0]);
  const rightOpacity = useTransform(x, [25, 120], [0, 1]);

  useEffect(() => {
    let active = true;
    async function start() {
      try {
        const content = await fetch("/api/content").then((response) => response.json()) as PublicImage[];
        const ids = daily
          ? (await fetch("/api/daily").then((response) => response.json()) as { imageIds: string[] }).imageIds
          : Array.from({ length: 10 }, (_, position) => content[position % content.length].id);
        const ordered = ids.map((id) => content.find((item) => item.id === id)).filter(Boolean) as PublicImage[];
        const session = await fetch("/api/sessions", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ mode: daily ? "DAILY" : "STANDARD", imageIds: ids }),
        }).then((response) => response.json()) as { id: string };
        if (active) { setItems(ordered); setSessionId(session.id); }
      } catch { if (active) setError(locale === "de" ? "Das Spiel konnte nicht geladen werden." : "The game could not be loaded."); }
    }
    start();
    return () => { active = false; };
  }, [daily, locale]);

  const answer = useCallback(async (choice: Answer) => {
    const item = items[index];
    if (feedback || !sessionId || !item) return;
    try {
      const response = await fetch(`/api/sessions/${sessionId}/guess`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ imageId: item.id, answer: choice, responseTimeMs: Date.now() - started.current }),
      });
      if (!response.ok) throw new Error();
      const result = await response.json() as { guess: { correct: boolean; points: number; streak: number }; canonicalAnswer: Answer; explanation: LocalizedText; sourceUrl?: string; correctPercentage: number };
      setFeedback({ ...result.guess, canonicalAnswer: result.canonicalAnswer, explanation: result.explanation, sourceUrl: result.sourceUrl, correctPercentage: result.correctPercentage });
      setStreak(result.guess.streak);
      setScore((current) => current + result.guess.points);
      if (result.guess.correct) setCorrectCount((current) => current + 1);
      triggerFeedback(result.guess.correct ? "success" : "error");
    } catch { setError(locale === "de" ? "Antwort konnte nicht gespeichert werden." : "Your answer could not be saved."); }
  }, [feedback, index, items, locale, sessionId]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") answer("FAKE");
      if (event.key === "ArrowRight") answer("REAL");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer]);

  function next() {
    if (index === items.length - 1) {
      sessionStorage.setItem("lastResult", JSON.stringify({ sessionId, score, correct: correctCount }));
      router.push(`/${locale}/result`);
      return;
    }
    setIndex((current) => current + 1);
    setFeedback(null);
    setError(undefined);
    x.set(0);
    started.current = Date.now();
  }

  if (!items.length) return <main className="app loading"><span className="wordmark">{t.brand.name}</span><p>{error ?? (locale === "de" ? "Challenge wird geladen …" : "Loading challenge…")}</p></main>;
  const item = items[index];
  return <main className="app game-page">
    <header className="topbar"><span className="wordmark">{t.brand.name}</span><span className="streak" aria-label={`${t.game.streak}: ${streak}`}>🔥 {streak}</span></header>
    <div className="game-meta"><span>{daily ? t.daily.title : t.game.prompt}</span><span>{index + 1} / {items.length} · {score} XP</span></div>
    {error && <div className="error" role="alert">{error}</div>}
    <motion.div className="game-card" style={{ x, rotate }} drag={feedback ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.7} onDragEnd={(_, info) => { if (info.offset.x < -100) answer("FAKE"); else if (info.offset.x > 100) answer("REAL"); }}>
      <img src={item.imageUrl} alt={locale === "de" ? "Ein überraschendes Motiv zum Bewerten" : "A surprising scene to judge"} />
      {!feedback && <><motion.div className="stamp fake" style={{ opacity: leftOpacity }}>{t.game.fake}</motion.div><motion.div className="stamp real" style={{ opacity: rightOpacity }}>{t.game.real}</motion.div></>}
      {feedback && <section className="feedback" aria-live="polite">
        <h2>{feedback.correct ? t.game.correct : t.game.wrong}</h2>
        <div className="truth">{feedback.canonicalAnswer === "REAL" ? t.game.actuallyReal : t.game.actuallyFake}</div>
        <div className="points">+{feedback.points}</div>
        <p>{feedback.explanation[locale]}</p>
        <small>{t.game.community.replace("{n}", String(feedback.correctPercentage))}</small>
        <div className="feedback-footer">{feedback.sourceUrl ? <a href={feedback.sourceUrl} target="_blank" rel="noreferrer" className="muted">{t.common.viewSource}</a> : <span />}<button className="button" onClick={next}>{t.common.next}<ArrowRight size={18} /></button></div>
      </section>}
    </motion.div>
    <div className="answer-row"><button className="button answer fake" onClick={() => answer("FAKE")} disabled={!!feedback}><X /> {t.game.fake}</button><button className="button answer real" onClick={() => answer("REAL")} disabled={!!feedback}><Check /> {t.game.real}</button></div>
  </main>;
}
