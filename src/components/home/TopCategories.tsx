import Link from "next/link";
import { Baby, Feather, FlaskConical, Landmark, Sparkles } from "lucide-react";
import { topCategories } from "@/data/home";

const icons = [Feather, FlaskConical, Landmark, Baby, Sparkles];

export function TopCategories() {
  return (
    <section aria-labelledby="top-categories-title" className="py-16 sm:py-20">
      <div className="container-page">
        <div className="text-center">
          <h2 id="top-categories-title" className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Top Categories
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Pick a shelf and start exploring.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {topCategories.map((category, index) => {
            const Icon = icons[index];
            return (
              <li key={category.name}>
                <Link
                  href={`/books?category=${category.name}`}
                  className="group flex h-full flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold tracking-tight">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.text}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
