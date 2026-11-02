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
  phone: "+880 1700-000000",
  hours: "Online and open every day",
} as const;

export const SOCIAL_LINKS = {
  x: "https://x.com",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  github: "https://github.com/ABiR994",
} as const;
