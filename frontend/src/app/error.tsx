"use client";

import { ErrorState } from "@/components/shared/error-state";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="min-h-screen bg-[#050505] px-5 pt-32">
      <div className="mx-auto max-w-3xl">
        <ErrorState message={error.message || "Something went wrong."} />
      </div>
    </main>
  );
}
