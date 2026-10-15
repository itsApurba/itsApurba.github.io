// Recent work, newest first. `link` is optional; leave it out when there is
// nothing public to open.
export const work = [
  {
    id: "support-calls",
    name: "Support calling app",
    status: "Shipped · 2026",
    summary:
      "A Flutter app that rings like a phone call. It joins a Cloudflare Realtime room over WebRTC and surfaces the incoming call through CallKit on iOS and ConnectionService on Android, so a locked phone still rings.",
    stack: ["Flutter", "Dart", "WebRTC", "Cloudflare Realtime", "CallKit", "ConnectionService"],
  },
  {
    id: "frappe-hr",
    name: "Frappe HR desk",
    status: "Shipped · 2026",
    summary:
      "HRMS customizations on Frappe v15, shaped around how a team works: custom field behavior (including what shows on mobile), repeatable fixture exports, and a Docker Compose deploy so the desk comes up the same way twice.",
    stack: ["Frappe", "Frappe HRMS", "Python", "Docker Compose"],
  },
  {
    id: "openwarp",
    name: "OpenWarp",
    status: "In progress · 2026",
    summary:
      "A Rust terminal where more than one coding agent can share a workspace: conversations, files and tools in one place, behind protobuf APIs, so the model behind it (Grok, Claude, Groq) can change without rewriting the terminal around one vendor.",
    stack: ["Rust", "Protobuf", "AI agents"],
  },
  {
    id: "digital-info-link",
    name: "Digital Info Link",
    status: "Rebuilding · 2024 to now",
    summary:
      "A site for students and early-career people in India. It began as an AdSense-approved board for internships, fresher jobs and remote roles that drew a few hundred to about a thousand visitors a day, mostly from LinkedIn. I'm rebuilding it as a curated catalog of digital tools, with jobs as a second track.",
    stack: ["Web", "SEO", "Content systems"],
    link: "https://digitalinfolink.in",
  },
];
