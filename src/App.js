import { useCallback, useState } from "react";
import { SearchBar } from "./SearchBar";
import { Logo } from "./Logo";
import { SearchResults } from "./SearchResults";
import { Navbar } from "./Navbar";
import { MovieList } from "./MovieList";
import { WatchedSummary } from "./WatchedSummary";
import { WatcehdList } from "./WatcehdList";
import { Box } from "./Box";
import { Main } from "./Main";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { MovieDetail } from "./MovieDetail";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export const KEY = "98f40b52";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  function handleSetMovie(id) {
    setSelectedId(id);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => {
      const index = watched.findIndex((m) => m.imdbID === movie.imdbID);
      const tempWatched = [...watched];

      if (index !== -1) {
        tempWatched.splice(index, 1);
      }
      return [...tempWatched, movie];
    });
  }

  function handleDeleteWatched(id) {
    const tempWatched = watched.filter((m) => m.imdbID !== id);
    setWatched(tempWatched);
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
