import About from "./components/About";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

const App = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <Header />
    <main id="main" className="page">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  </>
);

export default App;
