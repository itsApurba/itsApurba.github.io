import { images } from "../assets/images";

// `live`, `source` or `image` set to null is a PLACEHOLDER the owner fills in;
// previews mark it as "To add" and the published site leaves it out.
// `sourceNote` explains a missing source link; set `source: false` to show
// only that note, with no "To add" marker.
//
// `demo` lists the demo accounts each project publishes in its own README;
// copy them from there, never make them up.
// Display order: projects with a live site first. The first one gets the large
// "lead" card.
export const projects = [
  {
    id: "barreplay",
    name: "BarReplay",
    eyebrow: "Currently building",
    tagline: "TradingView-style bar replay with practice trading",
    summary:
      "A free bar replay for practising on historical market data. The replay hides the future while you play, pause and step through candles at any speed and timeframe, draw with TradingView-style tools (Fibonacci, channels, volume profile, anchored VWAP, long/short positions) and place practice trades with stop-loss, take-profit and running P&L. Outside a replay the chart is live.",
    highlights: [
      "Gold, silver, FX and indices from OANDA and Binance crypto, fetched on demand with nothing stored ahead",
      "Accounts sync drawings, trades and replays across devices, and the app still works offline",
    ],
    stack: ["TypeScript", "Vite", "Lightweight Charts", "Node.js", "Better Auth", "SQLite / Turso", "Kysely"],
    live: "https://barreplay.digitalinfolink.in",
    // PLACEHOLDER: the repository is not on GitHub yet.
    source: null,
    sourceNote: "Repository not published yet",
    image: images.barreplay,
    imageAlt: "BarReplay chart of XAUUSD 15-minute candles with drawing tools and replay controls",
  },
  {
    id: "sharewise",
    name: "Sharewise",
    tagline: "Learn from the people you follow",
    summary:
      "A social learning app: share short lessons, tap \"Remember this\" on the ones worth keeping, and Sharewise brings them back for spaced review right before you would forget them. Feed, decks, quizzes, streaks and a review heatmap, mobile-first in light and dark mode.",
    highlights: [
      "Spaced repetition with an SM-2 variant, scheduled at local midnight in each user's time zone",
      "Swipe or keyboard review, markdown lessons with highlighted code, and curated decks",
    ],
    stack: ["React", "Chakra UI", "TanStack Query", "Express", "MongoDB", "JWT"],
    live: "https://sharewise.vercel.app",
    source: "https://github.com/itsApurba/sharewise",
    demo: {
      password: "sharewise123",
      accounts: [
        { name: "Maya Chen", email: "maya@sharewise.dev" },
        { name: "Omar Haddad", email: "omar@sharewise.dev" },
        { name: "Priya Nair", email: "priya@sharewise.dev" },
        { name: "Sam Okafor", email: "sam@sharewise.dev" },
        { name: "Lena Vogel", email: "lena@sharewise.dev" },
      ],
    },
    image: images.sharewise,
    imageAlt: "Sharewise lesson page with a highlighted JavaScript snippet and a quiz",
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    tagline: "A gamified task and sprint planner",
    summary:
      "A gamified Jira: managers post tasks to a market, workers claim and submit them, and approved work pays credits and XP that workers spend in a rewards store or on clearing penalties. Includes the classic board and sprint planning.",
    highlights: [
      "Every payout, redemption and penalty is one ledger entry, so balances never go negative or pay twice",
      "Levels, streaks and a weekly and all-time team leaderboard",
    ],
    stack: ["React", "Chakra UI", "Zustand", "Express", "MongoDB", "Passport + JWT"],
    live: "https://taskflow-one.vercel.app",
    source: "https://github.com/itsApurba/taskflow",
    demo: {
      password: "taskflow123",
      accounts: [
        { name: "Rohit Sharma (manager)", email: "rohit@taskflow.demo" },
        { name: "Asha Verma (worker)", email: "asha@taskflow.demo" },
        { name: "Vikram Singh (worker)", email: "vikram@taskflow.demo" },
        { name: "Meera Iyer (worker)", email: "meera@taskflow.demo" },
      ],
    },
    image: images.taskflow,
    imageAlt: "TaskFlow task market with three claimable tasks and their credit rewards",
  },
  {
    id: "timecamp",
    name: "TimeCamp clone",
    eyebrow: "Team project",
    tagline: "A time-tracking website clone",
    summary:
      "A five-person team project recreating TimeCamp's landing, features and pricing pages, with sign-up, login and a task dashboard. I contributed as a member of the team.",
    highlights: [
      "A dashboard for adding and deleting tasks and recording time, as documented in the project README",
      "Built collaboratively by five contributors, including Apurba Adhikary",
    ],
    stack: ["React", "Redux", "Chakra UI", "Bootstrap", "JavaScript", "CSS", "Firebase"],
    live: "https://timecamp-jet.vercel.app/",
    source: "https://github.com/itsApurba/TimeCamp",
    image: images.timecamp,
    imageAlt: "TimeCamp clone landing page with time-tracking signup and a customer testimonial",
  },
];
