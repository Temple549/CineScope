"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookmarkCheck, BookmarkPlus, PlayCircle, Star } from "lucide-react";
import { Movie } from "../../types/movie";
import { getPosterUrl } from "../../lib/tmdb-images";
import { useWatchlist } from "../../hooks/use-watchlist";

interface MovieCardProps {
  movie: Movie;
  rank?: number;
}

export function MovieCard({ movie, rank }: MovieCardProps) {
  const { isSaved, toggleMovie } = useWatchlist();
  const saved = isSaved(movie.id);

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "—";

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative min-w-0"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10 transition group-hover:ring-amber-400/40">
        <Link href={`/movies/${movie.id}`} className="block h-full">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

          {rank !== undefined && (
            <span className="absolute left-3 top-3 text-4xl font-black text-white/90 drop-shadow-lg">
              {rank}
            </span>
          )}

          <div className="absolute inset-x-3 bottom-3">
            <h3 className="line-clamp-2 text-sm font-semibold text-white">
              {movie.title}
            </h3>

            <div className="mt-2 flex items-center gap-3 text-xs text-zinc-300">
              <span className="flex items-center gap-1 text-amber-300">
                <Star className="h-3.5 w-3.5 fill-current" />
                {movie.vote_average.toFixed(1)}
              </span>
              <span>{releaseYear}</span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute left-4 right-4 bottom-4 rounded-3xl border border-white/10 bg-black/80 p-4 text-sm text-zinc-200 backdrop-blur-md">
              <p className="line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        </Link>

        <button
          type="button"
          aria-label={
            saved
              ? `Remove ${movie.title} from watchlist`
              : `Add ${movie.title} to watchlist`
          }
          onClick={() => toggleMovie(movie)}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition ${
            saved
              ? "border-amber-400 bg-amber-400 text-black"
              : "border-white/20 bg-black/50 text-white hover:bg-white hover:text-black"
          }`}
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4 fill-current" />
          ) : (
            <BookmarkPlus className="h-4 w-4" />
          )}
        </button>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-black shadow-xl">
            <PlayCircle className="h-6 w-6 fill-current" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
