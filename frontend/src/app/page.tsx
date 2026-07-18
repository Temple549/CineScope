"use client";

import { useEffect, useState } from "react";
import { HeroMovie } from "../components/sections/hero-movie";
import { MovieRow } from "../components/sections/movie-row";
import { MovieSkeleton } from "../components/shared/movie-skeleton";
import { ErrorState } from "../components/shared/error-state";
import { movieApi } from "../services/api";
import { Movie } from "../types/movie";

function LoadingRow() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <div className="mb-5 h-8 w-48 animate-pulse rounded bg-zinc-800/80" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadHome() {
    try {
      setError("");
      const [trendingResponse, popularResponse, topRatedResponse, upcomingResponse] =
        await Promise.all([
          movieApi.getTrending(),
          movieApi.getPopular(),
          movieApi.getTopRated(),
          movieApi.getUpcoming(),
        ]);

      setTrending(trendingResponse.results);
      setPopular(popularResponse.results);
      setTopRated(topRatedResponse.results);
      setUpcoming(upcomingResponse.results);
    } catch {
      setError("Unable to load movies right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadHome();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24">
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
      </div>
    );
  }

  const reload = () => {
    setLoading(true);
    void loadHome();
  };

  if (error || trending.length === 0) {
    return (
      <div className="min-h-screen pt-24">
        <ErrorState
          message={error || "No movies are available right now."}
          onRetry={reload}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <HeroMovie movie={trending[0]} />
      <MovieRow title="Trending this week" movies={trending.slice(1)} ranked />
      <MovieRow title="Popular movies" movies={popular} />
      <MovieRow title="Top rated" movies={topRated} />
      <MovieRow title="Coming soon" movies={upcoming} />
    </div>
  );
}
