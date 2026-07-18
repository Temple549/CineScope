"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { MovieGrid } from "@/components/movie/movie-grid";
import { MovieSkeleton } from "@/components/shared/movie-skeleton";
import { movieApi } from "@/services/api";
import { Genre, Movie } from "@/types/movie";

interface GenrePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GenrePage({ params }: GenrePageProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGenreMovies() {
      try {
        const { id } = await params;
        const genreId = Number(id);

        if (!Number.isInteger(genreId) || genreId <= 0) {
          throw new Error("Invalid genre ID");
        }

        const [genresResponse, moviesResponse] = await Promise.all([
          movieApi.getGenres(),
          movieApi.getByGenre(genreId),
        ]);

        const matchingGenre =
          genresResponse.genres.find((item) => item.id === genreId) ?? null;

        setGenre(matchingGenre);
        setMovies(moviesResponse.results);
      } catch {
        setError("Unable to load this genre.");
      } finally {
        setLoading(false);
      }
    }

    void loadGenreMovies();
  }, [params]);

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/genres"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          All genres
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Browse by genre
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
            {genre?.name ?? "Genre movies"}
          </h1>
        </div>

        {loading && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <MovieSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-950/80 p-8 text-zinc-300 shadow-lg shadow-amber-400/10">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <p className="mt-10 text-zinc-400">
            No movies were found in this genre.
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
