import { images } from "@/data/images";
import type { Answer, DailyChallenge, GameSession, Guess, ImageItem } from "@/types";
import { calculateScore } from "@/lib/scoring";

export interface GameRepository {
  publishedImages(): Promise<ImageItem[]>;
  daily(date: string): Promise<DailyChallenge>;
  createSession(mode: GameSession["mode"], imageIds: string[], userId?: string): Promise<GameSession>;
  submitGuess(sessionId: string, imageId: string, answer: Answer, responseTimeMs: number): Promise<Guess>;
  session(id: string): Promise<GameSession | null>;
}

const sessions = new Map<string, GameSession>();

function uuid() {
  return crypto.randomUUID();
}

function seededOrder(date: string, items: ImageItem[]) {
  let seed = [...date].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return [...items].sort(() => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280 - 0.5;
  });
}

export class LocalGameRepository implements GameRepository {
  async publishedImages() {
    return images.filter((item) => item.status === "PUBLISHED" && item.moderationStatus === "APPROVED");
  }

  async daily(date: string) {
    const pool = await this.publishedImages();
    const ordered = seededOrder(date, pool);
    return { id: `daily-${date}`, date, imageIds: Array.from({ length: 10 }, (_, i) => ordered[i % ordered.length].id), participantCount: 1243 };
  }

  async createSession(mode: GameSession["mode"], imageIds: string[], userId?: string) {
    const session: GameSession = { id: uuid(), userId, mode, imageIds, guesses: [], score: 0, startedAt: new Date().toISOString() };
    sessions.set(session.id, session);
    return session;
  }

  async submitGuess(sessionId: string, imageId: string, answer: Answer, responseTimeMs: number) {
    const session = sessions.get(sessionId);
    if (!session) throw new Error("SESSION_NOT_FOUND");
    if (session.guesses.some((guess) => guess.imageId === imageId)) throw new Error("ALREADY_ANSWERED");
    const item = images.find((candidate) => candidate.id === imageId);
    if (!item || !session.imageIds.includes(imageId)) throw new Error("IMAGE_NOT_IN_SESSION");
    const currentStreak = session.guesses.at(-1)?.streak ?? 0;
    const result = calculateScore(item.answer === answer, responseTimeMs, currentStreak);
    const guess: Guess = { id: uuid(), sessionId, imageId, answer, correct: item.answer === answer, responseTimeMs, points: result.points, streak: result.nextStreak, createdAt: new Date().toISOString() };
    session.guesses.push(guess);
    session.score += guess.points;
    if (session.guesses.length === session.imageIds.length) session.completedAt = new Date().toISOString();
    return guess;
  }

  async session(id: string) {
    return sessions.get(id) ?? null;
  }
}

export const gameRepository: GameRepository = new LocalGameRepository();
