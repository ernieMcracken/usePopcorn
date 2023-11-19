import { queryByRole } from "@testing-library/react";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "98f40b52";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function SearchBar({ query, onSetQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}

//stateless / presentational
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

//structural
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

//stateless / presentational
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

//stateful
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched
      .filter((movie) => !isNaN(movie.runtime))
      .map((movie) => movie.runtime)
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatcehdList({ watched, onDeleteMovie, onSelectMovie }) {
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

function WatchedMovie({ movie, onDeleteMovie, onSelectMovie }) {
  console.log(movie);
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
          onClick={() => onDeleteMovie(movie.imdbID)}
        >
          ☠️
        </button>
      </div>
    </li>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">⛔️ {message}</p>;
}

function MovieDetail({
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

  console.log("IS Watched.......", isWatched);
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

  // close movie detail on escape key press
  useEffect(() => {
    const escapeHandler = (ev) => {
      if (ev.code === "Escape") {
        onCloseMovie();
      }
    };
    document.addEventListener("keydown", escapeHandler);

    //remove the event listener when component unmounts.
    return () => {
      document.removeEventListener("keydown", escapeHandler);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    console.log("Run effect");
    document.title = movie.Title || "usePopcorn";

    return () => {
      document.title = "usePopcorn";
      console.log("clean up");
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
        console.log(data);
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

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("terminator");
  const [selectedId, setSelectedId] = useState("tt0103064");

  useEffect(() => {
    if (query.length < 2) {
      console.log("No query");
      setMovies([]);
      setError("");

      return;
    }
    const controller = new AbortController();

    async function fetchData() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch movies...");
        }
        const data = await res.json();
        if (data.Response === "False") {
          console.log(data);
          throw new Error("No movies found");
        }

        // setError("");
        setMovies(data.Search);
        console.log(data);
      } catch (err) {
        console.log(err);
        if (err.message !== "The user aborted a request.")
          setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    handleCloseMovie();
    fetchData();

    return () => {
      controller.abort();
      console.log("Abort request");
    };
  }, [query]);

  function handleSetMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    console.log("close movie");
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => {
      const index = watched.findIndex((m) => m.imdbID === movie.imdbID);
      console.log(index);

      if (index !== -1) {
        const tempWatched = [...watched];
        tempWatched.splice(index, 1);
        tempWatched.push(movie);
        return tempWatched;
      } else {
        return [...watched, movie];
      }
    });
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} onSetQuery={setQuery} />
        <SearchResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSetMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              id={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              onDeleteMovie={handleDeleteWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatcehdList
                watched={watched}
                onDeleteMovie={handleDeleteWatched}
                onSelectMovie={handleSetMovie}
              />{" "}
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
