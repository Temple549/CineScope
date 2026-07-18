import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  href?: string;
}

export function SectionHeading({ title, href }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
        {title}
      </h2>

      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
