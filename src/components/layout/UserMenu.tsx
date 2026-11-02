"use client";

import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { Avatar } from "@base-ui/react/avatar";
import { Menu } from "@base-ui/react/menu";
import type { AuthUser } from "@/types";

const itemClass =
  "flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors data-[highlighted]:bg-secondary";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function UserMenu({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="Open user menu"
        className="flex size-10 cursor-pointer items-center justify-center rounded-full ring-2 ring-border transition hover:ring-primary focus-visible:ring-primary focus-visible:outline-none data-[popup-open]:ring-primary"
      >
        <Avatar.Root className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {user.image && (
            <Avatar.Image src={user.image} alt={user.name} className="size-full object-cover" />
          )}
          <Avatar.Fallback>{initials(user.name)}</Avatar.Fallback>
        </Avatar.Root>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner align="end" sideOffset={10} className="z-50">
          <Menu.Popup className="w-64 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-lg outline-none">
            <div className="px-3 py-2">
              <p className="truncate font-heading text-base font-semibold">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Menu.Separator className="my-1 h-px bg-border" />
            <Menu.Item render={<Link href="/profile" />} className={itemClass}>
              <UserRound className="size-4" />
              My Profile
            </Menu.Item>
            <Menu.Item onClick={onLogout} className={`${itemClass} text-destructive`}>
              <LogOut className="size-4" />
              Logout
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
