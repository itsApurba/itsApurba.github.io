// A visible marker for content the owner still has to provide. It shows in the
// dev server and in pull request builds (VITE_SHOW_PLACEHOLDERS=true); the
// published build renders nothing, so unset items are simply left out.
export const showPlaceholders = () =>
  import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === "true";

const Todo = ({ children }) =>
  showPlaceholders() ? (
    <span className="todo" data-placeholder="">
      To add: {children}
    </span>
  ) : null;

export default Todo;
