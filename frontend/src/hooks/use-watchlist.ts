"use client";

import { useCallback, useEffect, useState } from "react";
import { Movie } from "../types/movie";

const STORAGE_KEY = "cinescope-watchlist";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setWatchlist(JSON.parse(stored) as Movie[]);
      }
    } catch {
      setWatchlist([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist, isLoaded]);

  const isSaved = useCallback(
    (movieId: number) => watchlist.some((movie) => movie.id === movieId),
    [watchlist],
  );

  const toggleMovie = useCallback((movie: Movie) => {
    setWatchlist((current) => {
      const exists = current.some((item) => item.id === movie.id);

      return exists
        ? current.filter((item) => item.id !== movie.id)
        : [movie, ...current];
    });
  }, []);

  return {
    watchlist,
    isLoaded,
    isSaved,
    toggleMovie,
  };
}
