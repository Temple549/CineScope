"use client";

import { BookmarkCheck, BookmarkPlus } from "lucide-react";
import { Movie } from "../../types/movie";
import { useWatchlist } from "../../hooks/use-watchlist";

interface WatchlistButtonProps {
  movie: Movie;
  large?: boolean;
}

export function WatchlistButton({
  movie,
  large = false,
}: WatchlistButtonProps) {
  const { isSaved, toggleMovie } = useWatchlist();
  const saved = isSaved(movie.id);

  return (
    <button
      type="button"
      onClick={() => toggleMovie(movie)}
      className={`inline-flex items-center justify-center gap-2 border font-medium backdrop-blur transition ${
        saved
          ? "border-amber-400 bg-amber-400 text-black hover:bg-amber-300"
          : "border-white/15 bg-white/10 text-white hover:bg-white hover:text-black"
      } ${large ? "h-12 rounded-xl px-5" : "h-9 rounded-full px-3 text-sm"}`}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <BookmarkPlus className="h-4 w-4" />
      )}
      {saved ? "Saved" : "Watchlist"}
    </button>
  );
}
