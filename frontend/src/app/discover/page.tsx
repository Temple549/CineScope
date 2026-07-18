"use client";

import { useEffect, useState } from "react";
import { MovieGrid } from "@/components/movie/movie-grid";
import { MovieSkeleton } from "@/components/shared/movie-skeleton";
import { movieApi } from "@/services/api";
import { Movie } from "@/types/movie";

export default function DiscoverPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await movieApi.getPopular();
        setMovies(response.results);
      } catch (requestError) {
        console.error(requestError);
        setError("Unable to load popular movies.");
      } finally {
        setLoading(false);
      }
    }

    void loadMovies();
  }, []);

  return (
    <main className="min-h-screen px-5 pb-20 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
          Explore the catalog
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Discover movies
        </h1>

        {loading && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <MovieSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-xl border border-red-400/20 bg-red-400/10 p-5 text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <p className="mt-10 text-zinc-400">
            No popular movies were found.
          </p>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="mt-10">
            <MovieGrid movies={movies} />
          </div>
        )}
      </div>
    </main>
  );
}
