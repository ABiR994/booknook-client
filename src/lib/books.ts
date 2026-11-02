import { CATEGORIES } from "@/lib/constants";
import { getBooksBySubject, searchBooks } from "@/lib/open-library";
import type { Book, Category } from "@/types";

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

// Open Library subjects for each BookNook category. Very large subjects (like plain
// "history") can be slow, so History uses several smaller subjects that are merged.
const CATEGORY_SUBJECTS: Record<Category, string[]> = {
  Fiction: ["fiction"],
  Science: ["science"],
  History: ["world_history", "ancient_history", "military_history"],
  Kids: ["juvenile_literature"],
  Others: ["cooking"],
};

export type BooksResult = { books: Book[]; failed: boolean };

// Loads every subject of a category in parallel and merges the results.
// Throws only when all of its subjects fail.
async function loadCategory(category: Category, perSubject: number): Promise<Book[]> {
  const subjects = CATEGORY_SUBJECTS[category];
  const results = await Promise.allSettled(
    subjects.map((subject) => getBooksBySubject(subject, category, perSubject)),
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`[Open Library] subject "${subjects[index]}" failed:`, result.reason);
    }
  });

  const lists = results.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));
  if (lists.length === 0) throw new Error(`No Open Library data for ${category}`);
  return lists.flat();
}

/**
 * Books for the All Books page, optionally for one category.
 * Data comes from Open Library; only books with a cover are listed.
 */
export async function getAllBooks(category?: Category): Promise<BooksResult> {
  const categories = category ? [category] : CATEGORIES;
  const perCategory = category ? 24 : 5;

  const results = await Promise.allSettled(categories.map((item) => loadCategory(item, 30)));

  const lists = results.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));
  if (lists.length === 0) return { books: [], failed: true };

  const seen = new Set<string>();
  const books = lists
    .flatMap((list) => list.filter((book) => book.image).slice(0, perCategory))
    .filter((book) => !seen.has(book._id) && seen.add(book._id));

  return { books, failed: false };
}
