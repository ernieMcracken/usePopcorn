import { useEffect, useState } from "react";
import { KEY } from "./App";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //   console.log("Use movies");

  useEffect(() => {
    console.log("use movies use effect");
    const controller = new AbortController();

    async function fetchData() {
      try {
        callback?.();

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
          throw new Error("No movies found");
        }

        // setError("");
        setMovies(data.Search);
      } catch (err) {
        if (err.message !== "The user aborted a request.")
          setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    // handleCloseMovie();
    fetchData();

    return () => {
      controller.abort();
    };
  }, [query, callback]);

  return { movies, isLoading, error };
}
