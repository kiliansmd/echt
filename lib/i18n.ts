export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

const en = {
  brand: { name: "NO WAY", tagline: "Can you tell what's real?", short: "Too weird to be real?" },
  navigation: { play: "Play", friends: "Friends", ranking: "Ranking", profile: "Profile" },
  common: { settings: "Settings", next: "Next", back: "Back", share: "Share result", viewSource: "View source", xp: "XP", level: "Level" },
  home: { start: "Start playing", how: "How it works", hint: "Swipe right if it's REAL. Swipe left if it's FAKE.", daily: "Daily 10", dailySub: "Same 10. Everyone. Every day." },
  game: { real: "Real", fake: "Fake", correct: "Correct", wrong: "Wrong", actuallyReal: "It's actually real.", actuallyFake: "It's actually fake.", streak: "Your streak", progress: "Image", community: "Only {n}% got this right.", prompt: "Trust your gut" },
  result: { title: "Nice.", top: "Top 18% of players", longest: "Longest streak", average: "Average decision", again: "Play again", challenge: "Challenge a friend" },
  friends: { title: "Friends", search: "Find a friend", requests: "Requests", challenge: "Challenge", pending: "Pending challenges", rematch: "Rematch", win: "You win", accept: "Accept" },
  ranking: { title: "Ranking", friends: "Friends", country: "Country", global: "Global", today: "Today", week: "Week", all: "All time" },
  profile: { title: "Profile", accuracy: "Accuracy", games: "Games played", judged: "Images judged", current: "Current streak", best: "Best streak", total: "Total XP", achievements: "Achievements", language: "Language", first: "First 100", sharp: "Sharp eye", firstBody: "100 images judged", sharpBody: "10 correct in a row" },
  daily: { title: "Daily 10", completed: "Today's challenge is ready", players: "1,243 players", begin: "Begin challenge" },
  meta: { title: "NO WAY — Can you tell what's real?", description: "Real or fake? Swipe through unbelievable images and see if you can trust your instincts." }
} as const;

const de = {
  brand: { name: "ECHT?", tagline: "Erkennst du, was wirklich echt ist?", short: "Zu verrückt, um echt zu sein?" },
  navigation: { play: "Spielen", friends: "Freunde", ranking: "Rangliste", profile: "Profil" },
  common: { settings: "Einstellungen", next: "Weiter", back: "Zurück", share: "Ergebnis teilen", viewSource: "Quelle ansehen", xp: "XP", level: "Level" },
  home: { start: "Jetzt spielen", how: "So geht's", hint: "Nach rechts wischen für ECHT. Nach links für FAKE.", daily: "Tages-Challenge", dailySub: "Die gleichen 10. Für alle. Jeden Tag." },
  game: { real: "Echt", fake: "Fake", correct: "Richtig", wrong: "Falsch", actuallyReal: "Das ist tatsächlich echt.", actuallyFake: "Das ist tatsächlich fake.", streak: "Deine Serie", progress: "Bild", community: "Nur {n} % lagen richtig.", prompt: "Vertrau deinem Gefühl" },
  result: { title: "Stark.", top: "Top 18 % aller Spieler", longest: "Längste Serie", average: "Ø Entscheidung", again: "Nochmal spielen", challenge: "Freund herausfordern" },
  friends: { title: "Freunde", search: "Freund finden", requests: "Anfragen", challenge: "Herausfordern", pending: "Offene Duelle", rematch: "Revanche", win: "Du gewinnst", accept: "Annehmen" },
  ranking: { title: "Rangliste", friends: "Freunde", country: "Land", global: "Global", today: "Heute", week: "Woche", all: "Gesamt" },
  profile: { title: "Profil", accuracy: "Trefferquote", games: "Gespielte Runden", judged: "Bewertete Bilder", current: "Aktuelle Serie", best: "Beste Serie", total: "Gesamt-XP", achievements: "Erfolge", language: "Sprache", first: "Die ersten 100", sharp: "Scharfer Blick", firstBody: "100 Bilder bewertet", sharpBody: "10-mal in Folge richtig" },
  daily: { title: "Tages-Challenge", completed: "Die heutige Challenge wartet", players: "1.243 Spieler", begin: "Challenge starten" },
  meta: { title: "ECHT? — Erkennst du, was wirklich echt ist?", description: "Echt oder Fake? Entscheide bei unglaublichen Bildern und finde heraus, wie gut du deiner Wahrnehmung vertrauen kannst." }
};

export const dictionaries = { en, de };
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const getDictionary = (locale: Locale) => dictionaries[locale];
