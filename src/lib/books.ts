import type { Book, Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Public books route of the Express server. `no-store` so new books show up straight away.
async function fetchBooks(query = ""): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books${query}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) throw new Error(`The server responded with ${response.status}`);
  return (await response.json()) as Book[];
}

/**
 * Latest books for the New Arrivals section, newest first (MongoDB sort + limit on the server).
 * Returns an empty list when the server cannot be reached.
 */
export async function getLatestBooks(limit = 6): Promise<Book[]> {
  try {
    return await fetchBooks(`?sort=newest&limit=${limit}`);
  } catch {
    return [];
  }
}

export type BooksResult = { books: Book[]; failed: boolean };

/** All books for the All Books page, newest first, optionally for one category. */
export async function getAllBooks(category?: Category): Promise<BooksResult> {
  try {
    const books = await fetchBooks("?sort=newest");
    return { books: category ? books.filter((book) => book.category === category) : books, failed: false };
  } catch {
    return { books: [], failed: true };
  }
}

export type BookResult = { book: Book | null; failed: boolean };

/**
 * One book for the Book Details page.
 * `book` is null when it does not exist; `failed` is true when the server cannot be reached.
 */
export async function getBookById(id: string): Promise<BookResult> {
  try {
    const response = await fetch(`${API_URL}/books/${encodeURIComponent(id)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    // 400 (invalid id) and 404 both mean there is no such book.
    if (response.status === 404 || response.status === 400) return { book: null, failed: false };
    if (!response.ok) throw new Error(`The server responded with ${response.status}`);
    return { book: (await response.json()) as Book, failed: false };
  } catch {
    return { book: null, failed: true };
  }
}
