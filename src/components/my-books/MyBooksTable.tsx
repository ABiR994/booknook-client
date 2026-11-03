"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EditBookModal } from "@/components/my-books/EditBookModal";
import { Modal } from "@/components/shared/Modal";
import { Spinner } from "@/components/shared/Spinner";
import { useAuth } from "@/hooks/use-auth";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/types";
import { Button } from "@/components/ui/button";

export function MyBooksTable() {
  const { user, isPending: sessionPending } = useAuth();
  const email = user?.email;

  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [deletePending, setDeletePending] = useState(false);

  // The server has no "my books" route, so the public list is filtered by the owner's email.
  useEffect(() => {
    if (!email) return;
    let cancelled = false;

    apiFetch<Book[]>("/books?sort=newest")
      .then((all) => {
        if (cancelled) return;
        setBooks(all.filter((book) => book.addedBy.email === email));
        setStatus("ready");
      })
      .catch((error) => {
        if (cancelled) return;
        setErrorMessage(error instanceof Error ? error.message : "Could not load your books.");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [email, attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((count) => count + 1);
  }

  async function confirmDelete() {
    if (!deleting) return;
    setDeletePending(true);
    try {
      await apiFetch<{ message: string }>(`/books/${deleting._id}`, { method: "DELETE", auth: true });
      setBooks((current) => current.filter((book) => book._id !== deleting._id));
      toast.success(`"${deleting.title}" has been deleted.`);
      setDeleting(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete the book. Please try again.");
    } finally {
      setDeletePending(false);
    }
  }

  if (sessionPending || status === "loading") {
    return (
      <div className="flex justify-center py-16">
        <Spinner label="Loading your books" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{errorMessage}</p>
        <Button type="button" onClick={retry} className="mt-6">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <>
      {books.length === 0 ? (
        <div className="py-12 text-center">
          <p className="font-heading text-2xl font-bold tracking-tight">You have not added any books yet</p>
          <p className="mt-2 text-muted-foreground">Share a book so other readers can borrow it.</p>
          <Link href="/add-book" className="btn-primary mt-6">
            Add Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="border-b border-border bg-secondary/60 text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Image</th>
                <th scope="col" className="px-4 py-3 font-medium">Title</th>
                <th scope="col" className="px-4 py-3 font-medium">Category</th>
                <th scope="col" className="px-4 py-3 font-medium">Copies</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="px-4 py-3">
                    <div className="relative h-16 w-12 overflow-hidden rounded-md border border-border bg-muted">
                      <Image
                        src={book.image}
                        alt={`Cover of ${book.title}`}
                        fill
                        sizes="48px"
                        unoptimized={book.image.includes("covers.openlibrary.org")}
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/books/${book._id}`} className="font-heading text-base font-semibold hover:text-primary hover:underline">
                      {book.title}
                    </Link>
                    <p className="text-muted-foreground">by {book.author}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{book.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {book.availableCopies} of {book.totalCopies} available
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button type="button" onClick={() => setEditing(book)} variant="outline" className="h-10 px-4">
                        <Pencil className="size-4" aria-hidden="true" />
                        Edit
                      </Button>
                      <button
                        type="button"
                        onClick={() => setDeleting(book)}
                        className="btn h-10 border border-destructive/40 px-4 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <EditBookModal
          key={editing._id}
          book={editing}
          onClose={() => setEditing(null)}
          onSaved={(updated) => {
            setBooks((current) => current.map((book) => (book._id === updated._id ? updated : book)));
            setEditing(null);
          }}
        />
      )}

      <Modal
        open={deleting !== null}
        onOpenChange={(open) => !open && !deletePending && setDeleting(null)}
        title="Delete this book?"
        description={deleting ? `"${deleting.title}" will be removed from the library. This cannot be undone.` : undefined}
      >
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" onClick={() => setDeleting(null)} disabled={deletePending} variant="outline">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={confirmDelete}
            disabled={deletePending}
            variant="destructive"
          >
            {deletePending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {deletePending ? "Deleting..." : "Yes, Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
