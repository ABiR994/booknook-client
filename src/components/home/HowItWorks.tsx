import { BookMarked, RotateCcw, Search, UserPlus } from "lucide-react";
import { howItWorks } from "@/data/home";

const icons = [UserPlus, Search, BookMarked, RotateCcw];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-title" className="border-y border-border bg-secondary/60 py-16 sm:py-20">
      <div className="container-page">
        <div className="text-center">
          <h2 id="how-it-works-title" className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            How Borrowing Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Four simple steps from signing up to returning your book.
          </p>
        </div>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => {
            const Icon = icons[index];
            return (
              <li
                key={item.step}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-3xl font-bold text-accent">{item.step}</span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
