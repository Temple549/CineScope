"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, Sparkles, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/genres", label: "Genres" },
  { href: "/watchlist", label: "Watchlist" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400 text-black shadow-lg shadow-amber-400/20">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            CineScope
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition hover:text-white ${
                  active ? "text-white" : "text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/search"
            aria-label="Search movies"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:bg-amber-400 hover:text-black"
          >
            <Search className="h-4 w-4" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-black px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-zinc-300"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm text-zinc-300"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
