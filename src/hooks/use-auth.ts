"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { AuthUser } from "@/types";

/** Single place the UI reads the logged in user from (Better Auth session). */
export function useAuth() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const user: AuthUser | null = data?.user
    ? { id: data.user.id, name: data.user.name, email: data.user.email, image: data.user.image }
    : null;

  async function logout() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("Could not log out. Please try again.");
      return;
    }
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  }

  return { user, isPending, logout };
}
