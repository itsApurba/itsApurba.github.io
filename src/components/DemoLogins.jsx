import { useState } from "react";

// A value with a button that copies it. Without clipboard access (or before
// the page's script runs) the value is still plain, selectable text.
const CopyValue = ({ value, label }) => {
  const [state, setState] = useState("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 1600);
  };
  return (
    <span className="copy">
      <code className="copy__value">{value}</code>
      <button type="button" className="copy__button" onClick={copy} aria-label={`Copy ${label}`}>
        {state === "copied" ? "Copied" : state === "failed" ? "Select it" : "Copy"}
      </button>
    </span>
  );
};

const DemoLogins = ({ project }) => (
  <div className="demo">
    <p className="demo__title">Demo accounts</p>
    <dl className="demo__list">
      {project.demo.accounts.map((account) => (
        <div key={account.email} className="demo__row">
          <dt>{account.name}</dt>
          <dd>
            <CopyValue value={account.email} label={`${account.name} email`} />
          </dd>
        </div>
      ))}
      <div className="demo__row demo__row--password">
        <dt>Password (every account)</dt>
        <dd>
          <CopyValue value={project.demo.password} label={`${project.name} demo password`} />
        </dd>
      </div>
    </dl>
  </div>
);

export default DemoLogins;
