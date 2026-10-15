import { leadProjects, otherProjects } from "../data/projects";
import { links } from "../data/site";
import ProjectCard from "./ProjectCard";

const leadEyebrows = ["Currently building", "Also building"];

const Projects = () => (
  <section id="projects" className="section" aria-labelledby="projects-title">
    <h2 id="projects-title" className="section__title">
      Projects
    </h2>
    <div className="projects__leads">
      {leadProjects.map((project, index) => (
        <ProjectCard key={project.id} project={project} eyebrow={leadEyebrows[index]} lead />
      ))}
    </div>
    <h3 className="section__subtitle">More full-stack work</h3>
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

export default Projects;
