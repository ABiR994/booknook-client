import type { Category } from "@/types";

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

export const CONTACT = {
  email: "salemnurabir2@gmail.com",
  phone: "+880 1730-992604",
  hours: "Online and open every day",
} as const;

export const SOCIAL_LINKS = {
  x: "https://x.com/ar1b_3",
  facebook: "https://www.facebook.com/share/1EUPQ3ciw7/",
  instagram: "https://instagram.com",
  github: "https://github.com/ABiR994",
} as const;

export const CATEGORIES: readonly Category[] = ["Fiction", "Science", "History", "Kids", "Others"];
