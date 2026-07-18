import { MovieSkeleton } from "@/components/shared/movie-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 h-8 w-48 animate-pulse rounded-3xl bg-zinc-800/80" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
