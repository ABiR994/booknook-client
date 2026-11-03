import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BorrowButton } from "@/components/books/BorrowButton";
import { getBookById } from "@/lib/books";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { book } = await getBookById(id);
  return { title: book?.title ?? "Book Details" };
}

export default async function BookDetailsPage({ params }: Props) {
  const { id } = await params;
  const { book, failed } = await getBookById(id);

  if (failed) {
    return (
      <section className="container-page py-20 text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Book Details</h1>
        <p className="mt-4 text-muted-foreground">
          This book could not be loaded right now. Please try again in a moment.
        </p>
        <Link href="/books" className="btn-primary mt-8">
          Back to All Books
        </Link>
      </section>
    );
  }

  if (!book) notFound();

  const available = book.availableCopies > 0;
  const addedOn = new Date(book.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <section className="container-page py-10 sm:py-14">
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to All Books
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-12">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
          <Image
            src={book.image}
            alt={`Cover of ${book.title}`}
            fill
            priority
            sizes="(min-width: 768px) 22rem, 100vw"
            unoptimized={book.image.includes("covers.openlibrary.org")}
            className="object-cover"
          />
        </div>

        <div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">{book.category}</span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">{book.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>

          <p
            className={cn(
              "mt-5 inline-block rounded-full px-4 py-1.5 text-sm font-medium",
              available ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive",
            )}
          >
            {available
              ? `${book.availableCopies} of ${book.totalCopies} copies available`
              : "Not Available - all copies are borrowed"}
          </p>

          <h2 className="mt-8 font-heading text-xl font-bold tracking-tight">About this book</h2>
          <p className="mt-2 whitespace-pre-line text-base leading-7 text-muted-foreground">{book.description}</p>

          <dl className="mt-8 grid gap-4 rounded-xl border border-border bg-card p-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Added by</dt>
              <dd className="mt-1 font-medium">{book.addedBy.name}</dd>
              <dd className="break-all text-muted-foreground">{book.addedBy.email}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Date added</dt>
              <dd className="mt-1 font-medium">{addedOn}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <BorrowButton bookId={book._id} title={book.title} available={available} />
          </div>
        </div>
      </div>
    </section>
  );
}
