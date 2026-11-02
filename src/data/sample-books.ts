import type { Book } from "@/types";

// TEMPORARY sample data (newest first). Replaced by the Express API once the server exists.
const owner = { name: "BookNook Librarian", email: "librarian@booknook.dev" };

export const sampleBooks: Book[] = [
  { _id: "sample-1", title: "The Pocket Guide to Patient Gardening", author: "Rowan Pell", category: "Others", image: "/covers/the-pocket-guide-to-patient-gardening.svg", description: "A beginner-friendly guide to growing herbs, vegetables and flowers on a balcony or a small plot, season by season.", totalCopies: 4, availableCopies: 4, addedBy: owner, createdAt: "2026-11-01T09:00:00.000Z" },
  { _id: "sample-2", title: "Notes on Slow Mornings", author: "Clara Ibsen", category: "Others", image: "/covers/notes-on-slow-mornings.svg", description: "Short reflections and simple rituals for starting the day without rushing.", totalCopies: 3, availableCopies: 3, addedBy: owner, createdAt: "2026-10-31T09:00:00.000Z" },
  { _id: "sample-3", title: "The Dragon Who Hated Mondays", author: "Felix Barnaby", category: "Kids", image: "/covers/the-dragon-who-hated-mondays.svg", description: "A grumpy dragon tries to cancel Monday forever, with funny results for the whole village.", totalCopies: 4, availableCopies: 4, addedBy: owner, createdAt: "2026-10-30T09:00:00.000Z" },
  { _id: "sample-4", title: "The Quiet Physics of Rain", author: "Hana Whitlock", category: "Science", image: "/covers/the-quiet-physics-of-rain.svg", description: "Why does rain smell the way it does, and how does a single drop find its shape?", totalCopies: 2, availableCopies: 2, addedBy: owner, createdAt: "2026-10-29T09:00:00.000Z" },
  { _id: "sample-5", title: "Salt and Starlight", author: "Odessa Rowe", category: "Fiction", image: "/covers/salt-and-starlight.svg", description: "Two rival sailors cross an uncharted sea guided only by the stars.", totalCopies: 3, availableCopies: 3, addedBy: owner, createdAt: "2026-10-28T09:00:00.000Z" },
  { _id: "sample-6", title: "Ledgers of the Silk Road", author: "Idris Calloway", category: "History", image: "/covers/ledgers-of-the-silk-road.svg", description: "Merchant account books reveal how spices, stories and silver moved across continents.", totalCopies: 3, availableCopies: 3, addedBy: owner, createdAt: "2026-10-27T09:00:00.000Z" },
];
