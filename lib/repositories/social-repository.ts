import type { Challenge, LeaderboardEntry, User } from "@/types";

const users: User[] = [
  { id: "00000000-0000-4000-8000-000000000001", username: "youreallysure", locale: "en", totalXp: 3940, createdAt: "2026-01-01T00:00:00Z" },
  { id: "00000000-0000-4000-8000-000000000002", username: "Mila", locale: "de", totalXp: 4820, createdAt: "2026-01-02T00:00:00Z" },
  { id: "00000000-0000-4000-8000-000000000003", username: "Erik", locale: "de", totalXp: 4210, createdAt: "2026-01-03T00:00:00Z" },
  { id: "00000000-0000-4000-8000-000000000004", username: "Lea", locale: "en", totalXp: 3720, createdAt: "2026-01-04T00:00:00Z" },
];
const challenges: Challenge[] = [];

export class LocalSocialRepository {
  async profile(id: string) { return users.find((user) => user.id === id) ?? null; }
  async setLocale(id: string, locale: User["locale"]) { const user = await this.profile(id); if (!user) return null; user.locale = locale; return user; }
  async leaderboard(): Promise<LeaderboardEntry[]> { return [...users].sort((a, b) => b.totalXp - a.totalXp).map((user, index) => ({ rank: index + 1, userId: user.id, username: user.username, xp: user.totalXp, accuracy: 78 + (index % 4) * 2 })); }
  async friends(id: string) { return users.filter((user) => user.id !== id); }
  async createChallenge(creatorUserId: string, opponentUserId: string, imageSet: string[]) { const challenge: Challenge = { id: crypto.randomUUID(), creatorUserId, opponentUserId, imageSet, status: "PENDING", createdAt: new Date().toISOString() }; challenges.push(challenge); return challenge; }
  async challengesFor(id: string) { return challenges.filter((challenge) => challenge.creatorUserId === id || challenge.opponentUserId === id); }
}
export const socialRepository = new LocalSocialRepository();
export const demoUserId = users[0].id;
