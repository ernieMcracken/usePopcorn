export function WatchedMovie({ movie, onDeleteMovie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{isNaN(movie.runtime) ? "N/A" : `${movie.runtime} min`}</span>
        </p>
        <button
          className="btn-delete"
          onClick={(ev) => {
            ev.stopPropagation();
            onDeleteMovie(movie.imdbID);
          }}
        >
          ☠️
        </button>
      </div>
    </li>
  );
}
