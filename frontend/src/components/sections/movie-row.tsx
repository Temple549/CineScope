import { Movie } from "../../types/movie";
import { MovieCard } from "../../components/movie/movie-card";
import { SectionHeading } from "../../components/shared/section-heading";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  ranked?: boolean;
}

export function MovieRow({ title, movies, ranked = false }: MovieRowProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <SectionHeading title={title} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {movies.slice(0, 6).map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            rank={ranked ? index + 1 : undefined}
          />
        ))}
      </div>
    </section>
  );
}
