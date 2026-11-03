export const PASSWORD_RULES = [
  {
    label: "At least 6 characters",
    message: "Password must be at least 6 characters long.",
    test: (password: string) => password.length >= 6,
  },
  {
    label: "One uppercase letter",
    message: "Password must include an uppercase letter.",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "One lowercase letter",
    message: "Password must include a lowercase letter.",
    test: (password: string) => /[a-z]/.test(password),
  },
];

/** Returns an error message for an invalid password, or null when it is valid. */
export function validatePassword(password: string): string | null {
  return PASSWORD_RULES.find((rule) => !rule.test(password))?.message ?? null;
}

/** Only allows redirects inside the site (for example "/my-books"). */
export function safeRedirect(path?: string | null): string {
  return path && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}
