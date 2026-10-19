// Everything the page says lives in this folder. Edit here, not in the components.
//
// A value of `null` marked "PLACEHOLDER" is something the owner still has to
// fill in. The dev server and pull request builds show it as a dashed "To add"
// badge; the published site leaves it out, so a missing link is never invented.

import { images } from "../assets/images";

export const profile = {
  name: "Apurba Adhikary",
  role: "Programmer",
  // PLACEHOLDER: the current employer, shown as "Programmer at <company>".
  company: null,
  location: "Bengaluru, India",
  from: "Kolkata",
  available: "Available for new work",
  avatar: images.avatar,
  intro:
    "I build mobile apps, ERPNext and Frappe systems, and voice AI agents. Most of my work is in Flutter, with React, Node.js and MongoDB on the web.",
};

export const links = {
  github: "https://github.com/itsApurba",
  linkedin: "https://www.linkedin.com/in/itsapurbaa",
  x: "https://x.com/twitApurba",
  email: "its.apurba@outlook.com",
  resume: "/resume.pdf",
};
