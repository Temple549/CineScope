export function MovieSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] rounded-3xl bg-zinc-800/80 ring-1 ring-white/5" />
      <div className="mt-3 h-4 w-4/5 rounded bg-zinc-800/80" />
      <div className="mt-2 h-3 w-2/5 rounded bg-zinc-800/80" />
    </div>
  );
}
