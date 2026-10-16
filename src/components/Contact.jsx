import { links, profile } from "../data/site";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon, XIcon } from "./Icons";
import Todo, { showPlaceholders } from "./Todo";

const Contact = () => (
  <section id="contact" className="section contact" aria-labelledby="contact-title">
    <h2 id="contact-title" className="section__title">
      Get in touch
    </h2>
    <p className="contact__lead">The fastest reply is on X. Email works too.</p>
    <a className="contact__email" href={`mailto:${links.email}`}>
      <MailIcon /> {links.email}
    </a>
    <ul className="contact__links">
      <li>
        <a className="button" href={links.x} target="_blank" rel="noopener noreferrer">
          <XIcon /> @{links.x.split("/").pop()}
        </a>
      </li>
      <li>
        <a className="button" href={links.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon /> LinkedIn
        </a>
      </li>
      <li>
        <a className="button" href={links.github} target="_blank" rel="noopener noreferrer">
          <GitHubIcon /> GitHub
        </a>
      </li>
      {(links.resume || showPlaceholders()) && (
        <li>
          {links.resume ? (
            <a className="button" href={links.resume} target="_blank" rel="noopener noreferrer">
              <FileIcon /> Resume
            </a>
          ) : (
            <Todo>resume link</Todo>
          )}
        </li>
      )}
    </ul>
    <p className="footer">
      {profile.name} · {profile.location}
    </p>
  </section>
);

export default Contact;
