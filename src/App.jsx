import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Work from "./components/Work";

const App = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <Header />
    <main id="main" className="page">
      <Hero />
      <Projects />
      <Work />
      <Skills />
      <Contact />
    </main>
  </>
);

export default App;
