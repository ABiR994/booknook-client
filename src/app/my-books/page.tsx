import { MyBooksTable } from "@/components/my-books/MyBooksTable";

export const metadata = { title: "My Books" };

export default function MyBooksPage() {
  return (
    <>
      <header className="border-b border-border bg-secondary/60">
        <div className="container-page py-12 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">My Books</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            The books you added to the library. Edit their details or remove them.
          </p>
        </div>
      </header>

      <section className="container-page py-12 sm:py-16">
        <MyBooksTable />
      </section>
    </>
  );
}
