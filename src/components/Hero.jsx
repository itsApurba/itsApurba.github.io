import { links, profile } from "../data/site";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./Icons";
import Todo from "./Todo";

const Hero = () => (
  <section className="hero" aria-labelledby="hero-title">
    <img className="hero__avatar" src={profile.avatar} alt="" width="112" height="112" />
    <p className="eyebrow">{profile.role}</p>
    <h1 id="hero-title" className="hero__title">
      Hi, I'm {profile.name}.
    </h1>
    <p className="hero__intro">{profile.intro}</p>
    <p className="hero__meta">
      <PinIcon width={16} height={16} /> {profile.location}
    </p>

    <div className="hero__actions">
      <a className="button button--primary" href="#projects">
        See my projects
      </a>
      {links.resume ? (
        <a className="button" href={links.resume} target="_blank" rel="noopener noreferrer">
          <FileIcon /> Resume
        </a>
      ) : (
        <Todo>resume link</Todo>
      )}
    </div>

    <ul className="hero__social" aria-label="Profiles">
      <li>
        <a className="icon-button" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
      </li>
      <li>
        <a className="icon-button" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      </li>
      <li>
        <a className="icon-button" href={`mailto:${links.email}`} aria-label={`Email ${links.email}`}>
          <MailIcon />
        </a>
      </li>
    </ul>
  </section>
);

export default Hero;
