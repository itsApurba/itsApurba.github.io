import { leadProjects, otherProjects } from "../data/projects";
import { links } from "../data/site";
import ProjectCard from "./ProjectCard";

const leadEyebrows = ["Currently building", "Also building"];

export const LeadProjects = () => (
  <section id="projects" className="section" aria-labelledby="projects-title">
    <h2 id="projects-title" className="section__title">
      Projects
    </h2>
    <div className="projects__leads">
      {leadProjects.map((project, index) => (
        <ProjectCard key={project.id} project={project} eyebrow={leadEyebrows[index]} lead />
      ))}
    </div>
  </section>
);

export const MoreProjects = () => (
  <section className="section" aria-labelledby="more-projects-title">
    <h2 id="more-projects-title" className="section__title">
      More full-stack projects
    </h2>
    <div className="projects__grid">
      {otherProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
    <p className="projects__more">
      More on{" "}
      <a href={`${links.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      .
    </p>
  </section>
);
