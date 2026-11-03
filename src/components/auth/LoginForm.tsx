"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { FormField, inputClass } from "@/components/shared/FormField";
import { authClient } from "@/lib/auth-client";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  // Keep the redirect when the user switches to the Register page.
  const registerHref = redirectTo === "/" ? "/register" : `/register?redirect=${encodeURIComponent(redirectTo)}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    setPending(true);
    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) {
        toast.error(error.message || "Login failed. Check your email and password.");
        return;
      }
      toast.success("Welcome back!");
      router.push(redirectTo);
      router.refresh();
    } catch {
      toast.error("Could not reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={pending} className="space-y-5">
        <FormField id="email" label="Email">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
        </FormField>

        <FormField id="password" label="Password">
          <PasswordInput id="password" name="password" required autoComplete="current-password" placeholder="Your password" />
          <div className="pt-1 text-right">
            <button
              type="button"
              onClick={() => toast.info("Password reset is not available yet.")}
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </FormField>

        <button type="submit" className="btn-primary w-full">
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {pending ? "Logging in..." : "Login"}
        </button>
      </fieldset>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        New to BookNook?{" "}
        <Link href={registerHref} className="font-semibold text-primary hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
