import { work } from "../data/work";
import { ExternalIcon } from "./Icons";

const Work = () => (
  <section id="work" className="section" aria-labelledby="work-title">
    <h2 id="work-title" className="section__title">
      Recent work
    </h2>
    <ol className="work">
      {work.map((item) => (
        <li key={item.id} className="work__item">
          <article aria-labelledby={`work-${item.id}`}>
            <p className="work__status">{item.status}</p>
            <h3 id={`work-${item.id}`} className="work__title">
              {item.name}
            </h3>
            <p>{item.summary}</p>
            <ul className="chips" aria-label={`${item.name} tech stack`}>
              {item.stack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
            {item.link && (
              <a className="work__link" href={item.link} target="_blank" rel="noopener noreferrer">
                <ExternalIcon width={16} height={16} /> {item.link.replace(/^https?:\/\//, "")}
              </a>
            )}
          </article>
        </li>
      ))}
    </ol>
  </section>
);

export default Work;
