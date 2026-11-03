"use client";

import Link from "next/link";
import { BookOpen, LogOut, Plus, Repeat } from "lucide-react";
import { Avatar } from "@base-ui/react/avatar";
import { Spinner } from "@/components/shared/Spinner";
import { useAuth } from "@/hooks/use-auth";
import { authClient } from "@/lib/auth-client";

const shortcuts = [
  { label: "Add Book", href: "/add-book", Icon: Plus },
  { label: "My Books", href: "/my-books", Icon: BookOpen },
  { label: "My Borrows", href: "/my-borrows", Icon: Repeat },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ProfileCard() {
  const { user, isPending, logout } = useAuth();
  const { data } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex justify-center py-12">
        <Spinner label="Loading your profile" />
      </div>
    );
  }

  if (!user) {
    return (
      <p className="text-center text-muted-foreground">
        You are not logged in.{" "}
        <Link href="/login?redirect=/profile" className="font-semibold text-primary hover:underline">
          Login
        </Link>{" "}
        to see your profile.
      </p>
    );
  }

  const memberSince = data?.user.createdAt
    ? new Date(data.user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
      <Avatar.Root className="mx-auto flex size-28 items-center justify-center overflow-hidden rounded-full bg-primary text-3xl font-semibold text-primary-foreground ring-4 ring-secondary">
        {user.image && <Avatar.Image src={user.image} alt={user.name} className="size-full object-cover" />}
        <Avatar.Fallback>{initials(user.name)}</Avatar.Fallback>
      </Avatar.Root>

      <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight">{user.name}</h2>
      <p className="mt-1 break-all text-sm text-muted-foreground">{user.email}</p>
      {memberSince && <p className="mt-1 text-sm text-muted-foreground">Member since {memberSince}</p>}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {shortcuts.map(({ label, href, Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 text-sm font-medium transition-colors hover:border-primary hover:bg-secondary"
          >
            <Icon className="size-5 text-primary" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </div>

      <button type="button" onClick={logout} className="btn-outline mt-6 w-full text-destructive">
        <LogOut className="size-4" aria-hidden="true" />
        Logout
      </button>
    </div>
  );
}
