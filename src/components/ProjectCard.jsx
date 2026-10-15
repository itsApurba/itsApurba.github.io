import DemoLogins from "./DemoLogins";
import { CodeIcon, ExternalIcon } from "./Icons";
import Picture from "./Picture";
import Todo, { showPlaceholders } from "./Todo";

const Source = ({ project }) => {
  if (project.source) {
    return (
      <a className="button" href={project.source} target="_blank" rel="noopener noreferrer">
        <CodeIcon /> Source
      </a>
    );
  }
  // `false` means there is deliberately no public source; only the note shows.
  if (project.source === false) {
    return <span className="muted">{project.sourceNote}</span>;
  }
  return <Todo>source link{project.sourceNote ? ` (${project.sourceNote.toLowerCase()})` : ""}</Todo>;
};

// The rendered width of a card's screenshot: the content column is at most
// 1048px (1080px minus the 16px gutters), less the card's 1px borders; grid
// cards are half of it from 720px up.
const leadSizes = "(min-width: 1080px) 1046px, calc(100vw - 34px)";
const gridSizes = "(min-width: 1080px) 513px, (min-width: 720px) calc(50vw - 27px), calc(100vw - 34px)";

const ProjectCard = ({ project, lead = false }) => {
  const titleId = `project-${project.id}`;
  return (
    <article className={lead ? "project project--lead" : "project"} aria-labelledby={titleId}>
      {project.image ? (
        <div className="project__media">
          <Picture
            image={project.image}
            alt={project.imageAlt}
            sizes={lead ? leadSizes : gridSizes}
            loading={lead ? "eager" : "lazy"}
            phoneMaxWidth={800}
          />
        </div>
      ) : (
        showPlaceholders() && (
          <div className="project__media project__media--empty">
            <div className="project__media-empty">
              <Todo>screenshot</Todo>
            </div>
          </div>
        )
      )}
      <div className="project__body">
        <div className="project__intro">
          {project.eyebrow && <p className="eyebrow">{project.eyebrow}</p>}
          <h3 id={titleId} className="project__title">
            {project.name}
          </h3>
          <p className="project__tagline">{project.tagline}</p>
          <p>{project.summary}</p>
        </div>
        <div className="project__details">
          {project.highlights?.length > 0 && (
            <ul className="project__highlights">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          <ul className="chips" aria-label={`${project.name} tech stack`}>
            {project.stack.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
          {project.demo && <DemoLogins project={project} />}
          <div className="project__actions">
            {project.live ? (
              <a className="button button--primary" href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalIcon /> Live site
              </a>
            ) : (
              <Todo>live demo URL</Todo>
            )}
            <Source project={project} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
