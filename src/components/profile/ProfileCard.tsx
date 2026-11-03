"use client";

import Link from "next/link";
import { BookOpen, LogOut, Plus, Repeat } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/shared/Spinner";
import { useAuth } from "@/hooks/use-auth";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

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
    <Card className="mx-auto w-full max-w-md rounded-2xl p-6 text-center sm:p-8">
      <Avatar className="mx-auto size-28 text-3xl ring-4 ring-secondary">
        {user.image && <AvatarImage src={user.image} alt={user.name} />}
        <AvatarFallback>{initials(user.name)}</AvatarFallback>
      </Avatar>

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

      <Button type="button" onClick={logout} variant="outline" className="mt-6 w-full text-destructive">
        <LogOut className="size-4" aria-hidden="true" />
        Logout
      </Button>
    </Card>
  );
}
