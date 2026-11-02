export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export type Category = "Fiction" | "Science" | "History" | "Kids" | "Others";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: Category;
  /** Cover image URL, or null when the book has no cover. */
  image: string | null;
  firstPublishYear?: number;
  // Not provided by Open Library. They come from BookNook's own database later.
  description?: string;
  totalCopies?: number;
  availableCopies?: number;
  addedBy?: { name: string; email: string };
  createdAt?: string;
}
