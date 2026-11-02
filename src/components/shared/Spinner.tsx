import { cn } from "@/lib/utils";

export function Spinner({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3">
      <span
        className={cn("size-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary", className)}
      />
      <span className="text-sm text-muted-foreground">{label}...</span>
    </div>
  );
}
