"use client";

import { useSyncExternalStore } from "react";
import type { AuthUser } from "@/types";

/**
 * Single place the UI reads the logged in user from.
 *
 * TEMPORARY: authentication (Better Auth) is not set up yet, so this hook returns a
 * logged out user. Set NEXT_PUBLIC_MOCK_AUTH=true in .env.local to preview the
 * logged in navbar. When Better Auth is added, replace the body of `useAuth`
 * with `authClient.useSession()` and `authClient.signOut()`; the navbar stays the same.
 */

const MOCK_USER: AuthUser = {
  id: "mock-user",
  name: "Demo Reader",
  email: "demo.reader@booknook.example",
  image: "/mock-avatar.svg",
};

let mockLoggedIn = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const logout = async () => {
  mockLoggedIn = false;
  listeners.forEach((listener) => listener());
};

export function useAuth() {
  const loggedIn = useSyncExternalStore(
    subscribe,
    () => mockLoggedIn,
    () => mockLoggedIn,
  );

  return {
    user: loggedIn ? MOCK_USER : null,
    isPending: false,
    logout,
  };
}
