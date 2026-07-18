import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050505] px-5 pt-16">
      <div className="rounded-[2rem] border border-white/10 bg-zinc-950/80 px-8 py-14 text-center shadow-xl shadow-amber-400/10">
        <p className="text-8xl font-black text-amber-300">404</p>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Scene not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-zinc-400">
          The page you’re looking for is not part of this cut.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-3xl bg-amber-400 px-5 font-medium text-black transition hover:bg-amber-300"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/search"
            className="inline-flex h-11 items-center gap-2 rounded-3xl border border-white/15 px-5 font-medium text-white transition hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
        </div>
      </div>
    </main>
  );
}
