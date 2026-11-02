import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-heading text-8xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        This page is not on our shelves
      </h1>
      <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
        The page you are looking for may have been moved, returned, or never added to the library.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  );
}
