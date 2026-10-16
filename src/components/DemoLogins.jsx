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

const AccountRow = ({ account }) => (
  <div className="demo__row">
    <dt>{account.name}</dt>
    <dd>
      <CopyValue value={account.email} label={`${account.name} email`} />
    </dd>
  </div>
);

// The first account and the shared password are always shown; the rest sit
// behind a native toggle so they work without the page's script.
const DemoLogins = ({ project }) => {
  const [first, ...rest] = project.demo.accounts;
  return (
    <div className="demo">
      <p className="demo__title">Demo accounts</p>
      <dl className="demo__list">
        <AccountRow account={first} />
        <div className="demo__row demo__row--password">
          <dt>Password (every account)</dt>
          <dd>
            <CopyValue value={project.demo.password} label={`${project.name} demo password`} />
          </dd>
        </div>
      </dl>
      {rest.length > 0 && (
        <details className="demo__more">
          <summary>{`Show all ${project.demo.accounts.length} accounts`}</summary>
          <dl className="demo__list">
            {rest.map((account) => (
              <AccountRow key={account.email} account={account} />
            ))}
          </dl>
        </details>
      )}
    </div>
  );
};

export default DemoLogins;
