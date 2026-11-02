import Link from "next/link";
import { BookCard } from "@/components/books/BookCard";
import { getAllBooks } from "@/lib/books";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata = { title: "All Books" };

type Props = { searchParams: Promise<{ category?: string }> };

export default async function AllBooksPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const selected = CATEGORIES.find((item) => item === category);
  const { books, failed } = await getAllBooks(selected);

  const filters = [{ label: "All", href: "/books", active: !selected }].concat(
    CATEGORIES.map((item) => ({ label: item, href: `/books?category=${item}`, active: item === selected })),
  );

  return (
    <>
      <header className="border-b border-border bg-secondary/60">
        <div className="container-page py-12 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">All Books</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Browse every book in the library and open one to see its details.
          </p>
        </div>
      </header>

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <nav aria-label="Filter by category" className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <Link
                key={filter.label}
                href={filter.href}
                aria-current={filter.active ? "page" : undefined}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                  filter.active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {filter.label}
              </Link>
            ))}
          </nav>

          {books.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-muted-foreground">
              {failed
                ? "Books could not be loaded right now. Please try again in a moment."
                : "No books found in this category yet."}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
