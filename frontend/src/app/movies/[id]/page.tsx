"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { movieApi } from "../../../services/api";
import { Movie } from "../../../types/movie";
import { getBackdropUrl, getPosterUrl } from "../../../lib/tmdb-images";
import { WatchlistButton } from "../../../components/movie/watchlist-button";

interface MovieDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      try {
        const { id } = await params;
        const response = await movieApi.getDetails(Number(id));
        setMovie(response);
      } catch {
        setError("Unable to load this movie.");
      } finally {
        setLoading(false);
      }
    }

    void loadMovie();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#050505] pt-32">
        <div className="mx-auto h-[500px] max-w-7xl rounded-3xl bg-zinc-900/80" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#050505] px-5 text-center">
        <div className="max-w-md rounded-3xl border border-white/10 bg-zinc-950/80 p-10 shadow-lg shadow-amber-400/10">
          <h1 className="text-2xl font-bold text-white">Movie not found</h1>
          <p className="mt-2 text-zinc-400">
            {error || "This movie could not be loaded."}
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-3xl bg-amber-400 px-5 py-3 font-semibold text-black transition hover:bg-amber-300"
          >
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] pb-20">
      <section className="relative min-h-[620px] overflow-hidden">
        <img
          src={getBackdropUrl(movie.backdrop_path)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30" />

        <div className="relative mx-auto flex max-w-7xl items-end px-5 pb-16 pt-32 lg:px-8">
          <div className="grid w-full gap-8 md:grid-cols-[220px_1fr]">
            <img
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
              className="hidden aspect-[2/3] w-full rounded-xl object-cover shadow-2xl md:block"
            />

            <div className="max-w-3xl">
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to discovery
              </Link>

              <h1 className="text-4xl font-black sm:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-4 text-lg italic text-zinc-300">
                  {movie.tagline}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
                <span className="flex items-center gap-1 text-amber-300">
                  <Star className="h-4 w-4 fill-current" />
                  {movie.vote_average.toFixed(1)}
                </span>

                <span>
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "—"}
                </span>

                {movie.runtime && <span>{movie.runtime} min</span>}
              </div>

              <p className="mt-6 max-w-2xl leading-7 text-zinc-300">
                {movie.overview}
              </p>

              <div className="mt-8">
                <WatchlistButton movie={movie} large />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
