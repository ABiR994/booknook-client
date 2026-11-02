export const SITE = {
  name: "BookNook",
  tagline: "Add a book, borrow a book, return a book.",
} as const;

export type NavLink = { label: string; href: string; private?: boolean };

// Links marked `private` are shown only when the user is logged in.
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book", private: true },
  { label: "My Books", href: "/my-books", private: true },
  { label: "My Borrows", href: "/my-borrows", private: true },
];
