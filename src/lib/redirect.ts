/** Only allow redirects to pages inside this site (blocks links like //evil.com). */
export function getSafeRedirect(value: string | null | undefined): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/";
}
