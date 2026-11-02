"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FormField, inputClass } from "@/components/shared/FormField";
import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/validation";

export function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [pending, setPending] = useState(false);

  const passwordError = passwordTouched ? validatePassword(password) : null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const photo = String(form.get("photo") ?? "").trim();

    // Do not register with an invalid password.
    setPasswordTouched(true);
    const invalid = validatePassword(password);
    if (invalid) {
      toast.error(invalid);
      return;
    }

    setPending(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo || undefined,
    });
    setPending(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Account created! Please log in to continue.");
    router.push("/login");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField id="name" label="Name">
        <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={inputClass} />
      </FormField>

      <FormField id="email" label="Email">
        <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
      </FormField>

      <FormField id="photo" label="Photo URL (optional)">
        <input id="photo" name="photo" type="url" autoComplete="photo" placeholder="https://example.com/your-photo.jpg" className={inputClass} />
      </FormField>

      <FormField id="password" label="Password" error={passwordError}>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setPasswordTouched(true)}
            aria-invalid={passwordError ? true : undefined}
            aria-describedby={passwordError ? "password-error" : "password-hint"}
            placeholder="Create a password"
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((show) => !show)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        <p id="password-hint" className="text-xs text-muted-foreground">
          At least 6 characters with one uppercase and one lowercase letter.
        </p>
      </FormField>

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {pending ? "Creating account..." : "Register"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
