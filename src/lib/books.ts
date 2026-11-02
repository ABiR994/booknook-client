import { searchBooks } from "@/lib/open-library";
import type { Book } from "@/types";

/**
 * Latest books for the New Arrivals section, newest first.
 * Data comes from the Open Library API. Only books with a cover are used.
 * Returns an empty list when Open Library cannot be reached.
 */
export async function getLatestBooks(limit = 6): Promise<Book[]> {
  try {
    // Ask for extra results because some books have no cover and are skipped.
    const books = await searchBooks("first_publish_year:[2020 TO 2026]", { limit: 40, sort: "new" });
    return books.filter((book) => book.image).slice(0, limit);
  } catch {
    return [];
  }
}
