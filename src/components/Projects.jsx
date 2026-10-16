import { projects } from "../data/projects";
import { links } from "../data/site";
import ProjectCard from "./ProjectCard";

const [lead, ...rest] = projects;

const Projects = () => (
  <section id="projects" className="section" aria-labelledby="projects-title">
    <h2 id="projects-title" className="section__title">
      Projects
    </h2>
    <ProjectCard project={lead} lead />
    <div className="projects__grid">
      {rest.map((project) => (
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

export default Projects;
