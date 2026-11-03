"use client";

import { toast } from "sonner";

/**
 * Borrow button for the Book Details page.
 * TODO (borrow step): open the confirm modal and call POST /borrows.
 */
export function BorrowButton({ available }: { available: boolean }) {
  if (!available) {
    return (
      <button type="button" disabled className="btn-primary w-full sm:w-auto">
        Not Available
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toast.info("Borrowing is not available yet.")}
      className="btn-primary w-full sm:w-auto"
    >
      Borrow This Book
    </button>
  );
}
