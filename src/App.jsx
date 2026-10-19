import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { profile } from "./data/site";

const App = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <Header />
    <main id="main" className="page">
      <Hero />
      <section id="about" className="section" aria-labelledby="about-title">
        <h2 id="about-title" className="section__title">About</h2>
        <p>{profile.about}</p>
      </section>
      <Skills />
      <Projects />
      <Contact />
    </main>
  </>
);

export default App;
