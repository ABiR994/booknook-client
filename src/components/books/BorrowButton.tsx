"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FormField, inputClass } from "@/components/shared/FormField";
import { Modal } from "@/components/shared/Modal";
import { useAuth } from "@/hooks/use-auth";
import { apiFetch } from "@/lib/api";
import type { Borrow } from "@/types";

type BorrowButtonProps = { bookId: string; title: string; available: boolean };

const readOnlyClass = `${inputClass} bg-muted text-muted-foreground`;

/** "Borrow This Book" button and the confirm modal for the Book Details page. */
export function BorrowButton({ bookId, title, available }: BorrowButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  if (!available) {
    return (
      <button type="button" disabled className="btn-primary w-full sm:w-auto">
        Not Available
      </button>
    );
  }

  function handleOpen() {
    // Visitors who are not logged in go to Login and come back to this book.
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/books/${bookId}`)}`);
      return;
    }
    setOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    try {
      const { borrow } = await apiFetch<{ borrow: Borrow }>("/borrows", {
        method: "POST",
        auth: true,
        body: { bookId },
      });
      const returnBy = new Date(borrow.returnDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      toast.success(`You borrowed "${title}". Please return it by ${returnBy}.`);
      setOpen(false);
      router.refresh(); // shows the new number of available copies
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not borrow this book. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button type="button" onClick={handleOpen} className="btn-primary w-full sm:w-auto">
        Borrow This Book
      </button>

      <Modal
        open={open}
        onOpenChange={(next) => !pending && setOpen(next)}
        title="Borrow this book"
        description={`You are borrowing "${title}". Check your details and confirm.`}
      >
        <form onSubmit={handleSubmit}>
          <fieldset disabled={pending} className="space-y-5">
            <FormField id="borrowName" label="Your Name">
              <input id="borrowName" type="text" readOnly value={user?.name ?? ""} className={readOnlyClass} />
            </FormField>
            <FormField id="borrowEmail" label="Your Email">
              <input id="borrowEmail" type="email" readOnly value={user?.email ?? ""} className={readOnlyClass} />
            </FormField>

            <button type="submit" className="btn-primary w-full">
              {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {pending ? "Borrowing..." : "Confirm Borrow"}
            </button>
          </fieldset>
        </form>
      </Modal>
    </>
  );
}
