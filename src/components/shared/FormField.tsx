import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const inputClass =
  "h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive";

export const textareaClass = inputClass.replace("h-11", "min-h-28 py-3");

type FormFieldProps = {
  id: string;
  label: string;
  error?: string | null;
  className?: string;
  children: React.ReactNode;
};

export function FormField({ id, label, error, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="block">{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
