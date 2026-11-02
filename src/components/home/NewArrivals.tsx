import Link from "next/link";
import { BookCard } from "@/components/books/BookCard";
import { getLatestBooks } from "@/lib/books";

export async function NewArrivals() {
  const books = await getLatestBooks(6);

  return (
    <section aria-labelledby="new-arrivals-title" className="py-16 sm:py-20">
      <div className="container-page">
        <div className="text-center">
          <h2 id="new-arrivals-title" className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            New Arrivals
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            The latest books added to the library by our readers.
          </p>
        </div>

        {books.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-muted-foreground">
            New arrivals could not be loaded right now. Please try again in a moment.
          </p>
        )}

        <div className="mt-10 text-center">
          <Link href="/books" className="btn-outline">
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
