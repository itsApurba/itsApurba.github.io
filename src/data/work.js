// Recent work, newest first. `link` is optional; leave it out when there is
// nothing public to open.
export const work = [
  {
    id: "support-calls",
    name: "Voice calling app",
    status: "Shipped · 2026",
    summary:
      "A Flutter voice-calling app for support that rings like a phone call. Calls run on LiveKit over WebRTC, and ConnectionService surfaces the incoming call on Android, so a locked phone still rings.",
    stack: ["Flutter", "Dart", "LiveKit", "WebRTC", "ConnectionService"],
  },
  {
    id: "erpnext-frappe",
    name: "ERPNext and Frappe HR",
    status: "Shipped · 2026",
    summary:
      "ERPNext and Frappe HRMS customization on v15 and v16, shaped around how a team works: custom field behavior (including what shows on mobile) and repeatable fixture exports. Also Frappe deployment with Docker Compose, so a site comes up the same way twice, and standard ERP implementation.",
    stack: ["ERPNext", "Frappe", "Frappe HRMS", "Python", "Docker Compose"],
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
