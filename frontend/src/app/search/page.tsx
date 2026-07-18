"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { MovieGrid } from "../../components/movie/movie-grid";
import { MovieSkeleton } from "../../components/shared/movie-skeleton";
import { movieApi } from "../../services/api";
import { Movie } from "../../types/movie";
import { useDebounce } from "../../hooks/use-debounce";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMovies([]);
      setError("");
      return;
    }

    async function search() {
      setLoading(true);
      setError("");

      try {
        const response = await movieApi.search(debouncedQuery);
        setMovies(response.results);
      } catch {
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void search();
  }, [debouncedQuery]);

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Find your next favorite
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Search movies
          </h1>
        </div>

        <div className="relative mt-10 max-w-2xl">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by movie title..."
            className="h-14 w-full rounded-3xl border border-white/10 bg-white/5 pl-14 pr-14 text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-300/70"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-12">
          {loading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))}
            </div>
          )}

          {!loading && error && (
            <p className="text-zinc-400">{error}</p>
          )}

          {!loading && !error && debouncedQuery && movies.length === 0 && (
            <p className="text-zinc-400">
              No movies found for “{debouncedQuery}”.
            </p>
          )}

          {!loading && !error && movies.length > 0 && (
            <>
              <p className="mb-6 text-sm text-zinc-500">
                {movies.length} results for “{debouncedQuery}”
              </p>
              <MovieGrid movies={movies} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
