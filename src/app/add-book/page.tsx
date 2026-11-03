import { AddBookForm } from "@/components/books/AddBookForm";

export const metadata = { title: "Add Book" };

export default function AddBookPage() {
  return (
    <>
      <header className="border-b border-border bg-secondary/60">
        <div className="container-page py-12 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Add a Book</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Share a book with the community so other readers can borrow it.
          </p>
        </div>
      </header>

      <section className="container-page flex justify-center py-12 sm:py-16">
        <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <AddBookForm />
        </div>
      </section>
    </>
  );
}
