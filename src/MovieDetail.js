import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { KEY } from "./App";
import { useKey } from "./useKey";

export function MovieDetail({
  id,
  onCloseMovie,
  onAddWatched,
  onDeleteMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(null);
  const isWatched = watched.map((m) => m.imdbID).includes(id);
  const currRating = watched.find((m) => id === m.imdbID)?.userRating || 0;

  const countRef = useRef(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    if (userRating) {
      countRef.current += 1;
      console.log(countRef.current);
    }
  }, [userRating]);

  // close movie detail on escape key press
  useKey("Escape", onCloseMovie);

  useEffect(() => {
    document.title = movie.Title || "usePopcorn";

    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        return data;
      })
      .then((data) => setMovie(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleAdd() {
    if (!userRating) return;

    const newWatchedMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(" ")[0]),
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  function handleDelete() {
    onDeleteMovie(id);
    onCloseMovie();
  }

  return (
    <div className="details">
      {error && <ErrorMessage message={"Something went wrong..."} />}
      {isLoading && <Loader></Loader>}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={() => onCloseMovie()}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {isNaN(runtime) ? "N/A" : runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span> IMDB rating - {imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched && <p>Your rating </p>}
              <StarRating
                starSize="2.5rem"
                maxRating={10}
                onSetRating={setUserRating}
                defaultRating={currRating}
              />

              {userRating !== null && (
                <button className="btn-add" onClick={handleAdd}>
                  {isWatched ? "🍿 Update list 🎬 " : " 🍿 Add to list 🎬"}
                </button>
              )}
              {isWatched && (
                <button className="btn-add" onClick={handleDelete}>
                  💀 Delete from list ☠️
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
