import { useCallback, useRef } from "react";
import { useKey } from "./useKey";

export function SearchBar({ query, onSetQuery }) {
  const inputEl = useRef(null);

  const cb = useCallback(
    function cb() {
      if (document.activeElement === inputEl.current) return;
      inputEl.current.focus();
      onSetQuery("");
    },
    [onSetQuery]
  );

  useKey("Enter", cb);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
