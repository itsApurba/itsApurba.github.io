import { career, education } from "../data/about";

const About = () => (
  <section id="about" className="section" aria-labelledby="about-title">
    <h2 id="about-title" className="section__title">About</h2>
    <p>
      I studied {education.course} at {education.name} ({education.dates}).
      My career spans full-stack web development, Flutter apps, and Frappe and ERPNext integrations.
    </p>
    <h3 className="section__subtitle">Career path</h3>
    <ol className="work">
      {career.map((item) => (
        <li key={item.id} className="work__item">
          <article aria-labelledby={`career-${item.id}`}>
            <p className="work__status">{item.dates}</p>
            <h4 id={`career-${item.id}`} className="work__title">{item.role}</h4>
            <p><strong>{item.company}</strong></p>
            <p>{item.summary}</p>
          </article>
        </li>
      ))}
    </ol>
  </section>
);

export default About;
