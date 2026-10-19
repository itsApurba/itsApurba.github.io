import { work } from "../data/work";
import { ExternalIcon } from "./Icons";

const Work = () => (
  <div id="work" aria-labelledby="work-title">
    <h3 id="work-title" className="section__subtitle">
      Recent work
    </h3>
    <ol className="work">
      {work.map((item) => (
        <li key={item.id} className="work__item">
          <article aria-labelledby={`work-${item.id}`}>
            <p className="work__status">{item.status}</p>
            <h4 id={`work-${item.id}`} className="work__title">
              {item.name}
            </h4>
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
  </div>
);

export default Work;
