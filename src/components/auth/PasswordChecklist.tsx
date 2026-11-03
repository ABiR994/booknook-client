import { Check, Circle } from "lucide-react";
import { PASSWORD_RULES } from "@/lib/validation";
import { cn } from "@/lib/utils";

export function PasswordChecklist({ password, id }: { password: string; id: string }) {
  return (
    <ul id={id} className="grid gap-1 pt-1" aria-label="Password requirements">
      {PASSWORD_RULES.map((rule) => {
        const passed = rule.test(password);
        return (
          <li
            key={rule.label}
            className={cn("flex items-center gap-2 text-xs", passed ? "text-primary" : "text-muted-foreground")}
          >
            {passed ? <Check className="size-3.5" aria-hidden="true" /> : <Circle className="size-3.5" aria-hidden="true" />}
            {rule.label}
            <span className="sr-only">{passed ? "(met)" : "(not met)"}</span>
          </li>
        );
      })}
    </ul>
  );
}
