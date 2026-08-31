import type { Locale } from "@/lib/i18n";
export type Answer = "REAL" | "FAKE";
export interface LocalizedText { en: string; de: string }
export interface ImageItem { id:string; imageUrl:string; thumbnailUrl:string; title:LocalizedText; explanation:LocalizedText; optionalFact?:LocalizedText; answer:Answer; category:"ANIMALS"|"NATURE"|"ARCHITECTURE"|"WEIRD_WORLD"|"AI"; difficulty:"EASY"|"MEDIUM"|"HARD"; sourceUrl?:string; sourceLabel?:string; tags:string[]; status:"DRAFT"|"PUBLISHED"|"ARCHIVED"; moderationStatus:"APPROVED"|"PENDING"; createdAt:string; publishedAt?:string; stats:{timesShown:number;realVotes:number;fakeVotes:number;averageResponseTime:number} }
export interface Guess { id:string; sessionId:string; imageId:string; answer:Answer; correct:boolean; responseTimeMs:number; points:number; streak:number; createdAt:string }
export interface GameSession { id:string; userId?:string; mode:"STANDARD"|"DAILY"|"CHALLENGE"; imageIds:string[]; guesses:Guess[]; score:number; startedAt:string; completedAt?:string }
export interface User { id:string; username:string; locale:Locale; totalXp:number; createdAt:string }
export interface Challenge { id:string; creatorUserId:string; opponentUserId:string; imageSet:string[]; creatorScore?:number; opponentScore?:number; status:"PENDING"|"ACCEPTED"|"IN_PROGRESS"|"COMPLETED"; createdAt:string; completedAt?:string }
export interface LeaderboardEntry { rank:number; userId:string; username:string; xp:number; accuracy:number }
export interface DailyChallenge { id:string; date:string; imageIds:string[]; participantCount:number }
export interface FriendRequest { id:string;senderUserId:string;receiverUserId:string;status:"PENDING"|"ACCEPTED"|"DECLINED";createdAt:string }
export interface Friendship { id:string;userIds:[string,string];createdAt:string }
export interface Achievement { id:string;key:string;title:LocalizedText;description:LocalizedText;threshold:number }
export interface ChallengeParticipant { challengeId:string;userId:string;sessionId?:string;score?:number;completedAt?:string }
export interface Submission { id:string;userId:string;imageUrl:string;claimedAnswer:Answer;proofUrl?:string;status:"PENDING"|"APPROVED"|"REJECTED";createdAt:string }
