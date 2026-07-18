"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { Movie } from "../../types/movie";
import { getBackdropUrl } from "../../lib/tmdb-images";
import { WatchlistButton } from "../../components/movie/watchlist-button";

interface HeroMovieProps {
  movie: Movie;
}

export function HeroMovie({ movie }: HeroMovieProps) {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "—";

  return (
    <section className="relative min-h-[680px] overflow-hidden">
      <img
        src={getBackdropUrl(movie.backdrop_path)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-end px-5 pb-20 pt-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Featured tonight
          </p>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            {movie.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-zinc-200">
            <span>{releaseYear}</span>
            <span className="flex items-center gap-1 text-amber-300">
              <Star className="h-4 w-4 fill-current" />
              {movie.vote_average.toFixed(1)}
            </span>
            <span>Movie</span>
          </div>

          <p className="mt-6 line-clamp-4 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            {movie.overview || "A new cinematic experience awaits."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/movies/${movie.id}`}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber-400 px-5 font-semibold text-black transition hover:bg-amber-300"
            >
              <Play className="h-4 w-4 fill-current" />
              View details
            </Link>

            <WatchlistButton movie={movie} large />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
