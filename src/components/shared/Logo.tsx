import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("size-9", className)} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#2f5d46" />
      <path d="M12 21 Q22 16 32 22 V49 Q22 43 12 47 Z" fill="#f7f1e3" />
      <path d="M52 21 Q42 16 32 22 V49 Q42 43 52 47 Z" fill="#efe5cc" />
      <path d="M40 10 h9 v19 l-4.5 -4 l-4.5 4 z" fill="#e9a93b" />
    </svg>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="BookNook home"
    >
      <LogoMark />
      <span className="font-heading text-2xl font-bold tracking-tight">
        Book<span className="text-primary">Nook</span>
      </span>
    </Link>
  );
}
