import javascript from "../assets/images/skills/javascript.png";
import react from "../assets/images/skills/react.png";
import nodeJs from "../assets/images/skills/nodeJs.png";
import typescript from "../assets/images/skills/typescript.png";
import html5 from "../assets/images/skills/html-5.png";
import css3 from "../assets/images/skills/css3.png";
import bootstrap from "../assets/images/skills/bootstrap.png";
import chakraUI from "../assets/images/skills/chakraUI.png";
import heroku from "../assets/images/skills/heroku.png";
import vscode from "../assets/images/skills/vscode.png";
import figma from "../assets/images/skills/figma.png";
import meanbuy from "../assets/images/projects/meanbuy1.png";
import fabbag from "../assets/images/projects/fabbag1.png";
import timecamp from "../assets/images/projects/timecamp1.png";
import ShoppingParadise from "../assets/images/projects/shoppingParadise1.png";

export const skills = [
  {
    name: "Javascript",
    description: "Web development",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    type: "development",
    image: javascript,
  },
  {
    name: "React",
    description: "Web development",
    link: "https://reactjs.org/",
    type: "development",
    image: react,
  },
  {
    name: "Node",
    description: "Web development",
    link: "https://nodejs.org/en/",
    type: "development",
    image: nodeJs,
  },
  {
    name: "Typescript",
    description: "Web development",
    link: "https://www.typescriptlang.org/",
    type: "development",
    image: typescript,
  },
  {
    name: "HTML5",
    description: "Web layouts",
    link: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
    type: "development",
    image: html5,
  },
  {
    name: "CSS3",
    description: "Web design",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    type: "design",
    image: css3,
  },
  {
    name: "Bootstrap",
    description: "Web design",
    link: "https://getbootstrap.com/",
    type: "design",
    image: bootstrap,
  },
  {
    name: "Chakra UI",
    description: "Web design",
    link: "https://chakra-ui.com/",
    type: "design",
    image: chakraUI,
  },
  {
    name: "Heroku",
    description: "Devops",
    link: "https://www.heroku.com/",
    type: "devops",
    image: heroku,
  },
  //   {
  //     name: "Oracle",
  //     description: "Devops",
  //     link: "https://cloud.oracle.com/",
  //     type: "devops",
  //     image: oracle,
  //   },
  {
    name: "Visual Studio Code",
    description: "Code editor of choice",
    link: "https://code.visualstudio.com/",
    type: "development",
    image: vscode,
  },
  {
    name: "Figma",
    description: "Collaborative Design",
    link: "https://www.figma.com/",
    type: "design",
    image: figma,
  },
];

export const projects = [
  {
    name: "ShoppingParadise",
    description:
      "ShoppingParadise is an E-Commerce Indian based web application which sells products related to Makeup, Skin Care, Hair, Mom & Baby Care, Fragrance, Appliances and much more.",
    technology: ["React", "Chakra UI", "Redux"],
    deployLink: "https://your-store-app.vercel.app/",
    githubLink: "https://github.com/itsApurba/ShoppingParadise",
    image: ShoppingParadise,
  },
  {
    name: "TimeCamp",
    description:
      "TimeCamp is a simple, yet feature-rich time tracking app to help you gain insights into your projects and tasks.",
    technology: ["Javascript", "CSS3", "HTML"],
    deployLink:
      "https://6339252a627d9d1025202e2a--timecampclone-cw.netlify.app/",
    githubLink: "https://github.com/itsApurba/Time-Camp-Clone",
    image: timecamp,
  },
  {
    name: "MeanBuy",
    description:
      "MeanBuy is a platform for you to buy products instantly or on a monthly subscription basis.we give you complete freedom to choose the product",
    technology: ["Javascript", "CSS3", "HTML"],
    deployLink: "https://itsmeanbuy.netlify.app/",
    githubLink: "https://github.com/itsApurba/Meanbuy-Clone",
    image: meanbuy,
  },
  {
    name: "Fabbag",
    description:
      "Fab Bag offers an online retail platform for beauty discovery and subscription. The company provides beauty and cosmetic samples on a monthly subscription basis. Member benefits also include discounts on sampled products and detailed information on how to use the products.",
    technology: ["Javascript", "CSS3", "HTML"],
    deployLink: "https://itsapurba.github.io/fabbag-clone/",
    githubLink: "https://github.com/itsApurba/fabbag-clone",
    image: fabbag,
  },
];
