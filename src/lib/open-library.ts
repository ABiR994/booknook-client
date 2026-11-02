import { CONTACT } from "@/lib/constants";
import type { Book, Category } from "@/types";

const BASE_URL = "https://openlibrary.org";
const COVERS_URL = "https://covers.openlibrary.org";

// Only the fields we use from the Open Library Search API.
interface OpenLibraryDoc {
  key?: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
}

interface OpenLibrarySearchResponse {
  numFound: number;
  docs: OpenLibraryDoc[];
}

export const coverUrl = (coverId: number, size: "S" | "M" | "L" = "L") =>
  `${COVERS_URL}/b/id/${coverId}-${size}.jpg`;

// Suggests one of BookNook's categories from the subjects. Falls back to "Others".
function guessCategory(subjects: string[] = []): Category {
  const text = subjects.join(" ").toLowerCase();
  if (/juvenile|children|picture book/.test(text)) return "Kids";
  if (/fiction|novel|fantasy|mystery|romance/.test(text)) return "Fiction";
  if (/science|physics|biology|chemistry|mathematics|technology/.test(text)) return "Science";
  if (/history|war|ancient|biography/.test(text)) return "History";
  return "Others";
}

function toBook(doc: OpenLibraryDoc): Book | null {
  if (!doc.key || !doc.title || !doc.author_name?.length) return null;

  return {
    _id: doc.key.replace("/works/", ""),
    title: doc.title,
    author: doc.author_name.join(", "),
    category: guessCategory(doc.subject),
    image: doc.cover_i ? coverUrl(doc.cover_i) : null,
    firstPublishYear: doc.first_publish_year,
  };
}

/** Searches Open Library. Throws if the request fails or times out. */
export async function searchBooks(
  query: string,
  options: { limit?: number; sort?: "new" | "old" | "rating" } = {},
): Promise<Book[]> {
  const { limit = 12, sort } = options;
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
    fields: "key,title,author_name,cover_i,first_publish_year,subject",
  });
  if (sort) params.set("sort", sort);

  const response = await fetch(`${BASE_URL}/search.json?${params}`, {
    headers: { "User-Agent": `BookNook (${CONTACT.email})` },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error(`Open Library responded with ${response.status}`);

  const data = (await response.json()) as OpenLibrarySearchResponse;
  return data.docs.map(toBook).filter((book): book is Book => book !== null);
}
