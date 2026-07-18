"use client";

import { BookmarkX } from "lucide-react";
import { MovieGrid } from "../../components/movie/movie-grid";
import { useWatchlist } from "../../hooks/use-watchlist";

export default function WatchlistPage() {
  const { watchlist, isLoaded } = useWatchlist();

  if (!isLoaded) {
    return <div className="min-h-screen bg-[#050505]" />;
  }

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
          Your collection
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
          Watchlist
        </h1>

        {watchlist.length === 0 ? (
          <div className="mt-20 flex flex-col items-center text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/20">
              <BookmarkX className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">
              Your watchlist is empty
            </h2>
            <p className="mt-2 max-w-md text-zinc-400">
              Save movies while browsing and they will appear here for later.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            <MovieGrid movies={watchlist} />
          </div>
        )}
      </div>
    </main>
  );
}
