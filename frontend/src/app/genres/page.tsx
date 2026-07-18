"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { movieApi } from "@/services/api";
import { Genre } from "@/types/movie";

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGenres() {
      try {
        const response = await movieApi.getGenres();
        setGenres(response.genres);
      } catch {
        setError("Unable to load genres right now.");
      } finally {
        setLoading(false);
      }
    }

    void loadGenres();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Browse by category
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">Genres</h1>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-3xl bg-zinc-800/80"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error || genres.length === 0) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#050505] px-5 text-center">
        <div className="max-w-md rounded-3xl border border-white/10 bg-zinc-950/80 p-10 shadow-lg shadow-amber-400/10">
          <h1 className="text-2xl font-bold text-white">CineScope is taking a pause</h1>
          <p className="mt-2 text-zinc-400">
            {error || "No genres are available right now."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
          Browse by category
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">Genres</h1>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              className="group relative flex h-28 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 transition hover:border-amber-400/50 hover:from-zinc-700 hover:to-zinc-800"
            >
              <span className="text-lg font-semibold text-white transition group-hover:text-amber-300">
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
