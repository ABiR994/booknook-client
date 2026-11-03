"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { PasswordChecklist } from "@/components/auth/PasswordChecklist";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { FormField, inputClass } from "@/components/shared/FormField";
import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/validation";

export function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [pending, setPending] = useState(false);

  const passwordError = passwordTouched ? validatePassword(password) : null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const photo = String(form.get("photo") ?? "").trim();

    if (!name) {
      toast.error("Please enter your name.");
      return;
    }

    // Do not register with an invalid password.
    setPasswordTouched(true);
    const invalid = validatePassword(password);
    if (invalid) {
      toast.error(invalid);
      return;
    }

    setPending(true);
    try {
      const { error } = await authClient.signUp.email({ name, email, password, image: photo || undefined });
      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }
      toast.success("Account created! Please log in to continue.");
      router.push("/login");
    } catch {
      toast.error("Could not reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={pending} className="space-y-5">
        <FormField id="name" label="Name">
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={inputClass} />
        </FormField>

        <FormField id="email" label="Email">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
        </FormField>

        <FormField id="photo" label="Photo URL (optional)">
          <input id="photo" name="photo" type="url" autoComplete="off" placeholder="https://example.com/your-photo.jpg" className={inputClass} />
        </FormField>

        <FormField id="password" label="Password" error={passwordError}>
          <PasswordInput
            id="password"
            name="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setPasswordTouched(true)}
            aria-invalid={passwordError ? true : undefined}
            aria-describedby="password-rules"
            placeholder="Create a password"
          />
          <PasswordChecklist id="password-rules" password={password} />
        </FormField>

        <button type="submit" className="btn-primary w-full">
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {pending ? "Creating account..." : "Register"}
        </button>
      </fieldset>

      <SocialLogin callbackURL={"/"} />

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
