"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/shared/Spinner";
import { apiFetch } from "@/lib/api";
import type { Borrow } from "@/types";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export function MyBorrowsTable() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [returningId, setReturningId] = useState<string | null>(null);
  const [now] = useState(() => Date.now()); // used to mark overdue books

  useEffect(() => {
    let cancelled = false;

    apiFetch<Borrow[]>("/borrows", { auth: true })
      .then((data) => {
        if (cancelled) return;
        setBorrows(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (cancelled) return;
        setErrorMessage(error instanceof Error ? error.message : "Could not load your borrowed books.");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((count) => count + 1);
  }

  async function handleReturn(borrow: Borrow) {
    setReturningId(borrow._id);
    try {
      await apiFetch<{ message: string }>(`/borrows/${borrow._id}`, { method: "DELETE", auth: true });
      setBorrows((current) => current.filter((item) => item._id !== borrow._id));
      toast.success(`"${borrow.bookTitle}" has been returned. Thank you!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not return this book. Please try again.");
    } finally {
      setReturningId(null);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center py-16">
        <Spinner label="Loading your borrowed books" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{errorMessage}</p>
        <button type="button" onClick={retry} className="btn-primary mt-6">
          Try again
        </button>
      </div>
    );
  }

  if (borrows.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-heading text-2xl font-bold tracking-tight">You have not borrowed any books</p>
        <p className="mt-2 text-muted-foreground">Browse the library and borrow your first book.</p>
        <Link href="/books" className="btn-primary mt-6">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="border-b border-border bg-secondary/60 text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">Image</th>
            <th scope="col" className="px-4 py-3 font-medium">Title</th>
            <th scope="col" className="px-4 py-3 font-medium">Borrow Date</th>
            <th scope="col" className="px-4 py-3 font-medium">Return Date</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {borrows.map((borrow) => {
            const overdue = new Date(borrow.returnDate).getTime() < now;
            const returning = returningId === borrow._id;
            return (
              <tr key={borrow._id}>
                <td className="px-4 py-3">
                  <div className="relative h-16 w-12 overflow-hidden rounded-md border border-border bg-muted">
                    <Image
                      src={borrow.bookImage}
                      alt={`Cover of ${borrow.bookTitle}`}
                      fill
                      sizes="48px"
                      unoptimized={borrow.bookImage.includes("covers.openlibrary.org")}
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-heading text-base font-semibold">
                  <Link href={`/books/${borrow.bookId}`} className="hover:text-primary hover:underline">
                    {borrow.bookTitle}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(borrow.borrowDate)}</td>
                <td className="px-4 py-3">
                  <span className={overdue ? "font-medium text-destructive" : "text-muted-foreground"}>
                    {formatDate(borrow.returnDate)}
                  </span>
                  {overdue && <span className="ml-2 rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">Overdue</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleReturn(borrow)}
                    disabled={returning}
                    className="btn-outline h-10 px-4"
                  >
                    {returning ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Undo2 className="size-4" aria-hidden="true" />}
                    {returning ? "Returning..." : "Return Book"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
