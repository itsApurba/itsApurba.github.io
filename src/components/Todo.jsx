// A visible marker for content the owner still has to provide. It is meant to
// be noticed in review and must be gone before the site goes live.
const Todo = ({ children }) => (
  <span className="todo" data-placeholder="">
    To add: {children}
  </span>
);

export default Todo;
