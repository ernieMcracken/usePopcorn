import { WatchedMovie } from "./WatchedMovie";

export function WatcehdList({ watched, onDeleteMovie, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
