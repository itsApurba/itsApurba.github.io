import { skills } from "../data/skills";

const Skills = () => (
  <section id="skills" className="section" aria-labelledby="skills-title">
    <h2 id="skills-title" className="section__title">
      Skills
    </h2>
    <div className="skills">
      {skills.map((group) => (
        <div key={group.group} className="skills__group">
          <h3 className="skills__heading">{group.group}</h3>
          <ul className="chips">
            {group.items.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
