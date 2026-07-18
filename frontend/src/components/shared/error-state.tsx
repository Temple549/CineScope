"use client";

import { RefreshCcw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong while loading content.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-24 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20">
        <RefreshCcw className="h-7 w-7" />
      </div>
      <h2 className="mt-6 text-xl font-semibold text-white">
        Unable to load movies
      </h2>
      <p className="mt-2 max-w-md text-sm text-zinc-400">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-amber-400 px-5 font-semibold text-black transition hover:bg-amber-300"
        >
          <RefreshCcw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  );
}
