import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { Book } from "@/types";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[3/4] w-full bg-muted">
        {book.image ? (
          <Image
            src={book.image}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <BookOpen className="size-12" aria-label="No cover available" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
          {book.category}
        </span>
        <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] font-heading text-xl font-bold leading-7 tracking-tight">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">by {book.author}</p>
        <Link href={`/books/${book._id}`} className="btn-primary mt-5 w-full">
          View Details
        </Link>
      </div>
    </article>
  );
}
