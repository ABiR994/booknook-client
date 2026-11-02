"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UserMenu } from "@/components/layout/UserMenu";
import { useAuth } from "@/hooks/use-auth";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { user, isPending, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Add Book, My Books and My Borrows are shown only when logged in.
  const links = NAV_LINKS.filter((link) => !link.private || user);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo onClick={closeMobile} />

        {/* Desktop links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground",
                isActive(link.href)
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <span className="size-10 animate-pulse rounded-full bg-secondary" aria-hidden="true" />
          ) : user ? (
            <UserMenu user={user} onLogout={logout} />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login" className="btn-outline h-10 px-5">
                Login
              </Link>
              <Link href="/register" className="btn-primary h-10 px-5">
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background md:hidden"
        >
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}

            {!isPending && !user && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link href="/login" onClick={closeMobile} className="btn-outline">
                  Login
                </Link>
                <Link href="/register" onClick={closeMobile} className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
