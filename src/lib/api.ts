import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  /** Send the logged in user's JWT as a Bearer token (needed for private routes). */
  auth?: boolean;
};

/** Calls the Express server and returns the parsed JSON. Throws an Error with a readable message. */
export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, auth = false, headers, ...rest } = options;
  const finalHeaders: Record<string, string> = { "Content-Type": "application/json" };

  if (auth) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) throw new Error("Please log in again to continue.");
    finalHeaders.Authorization = `Bearer ${data.token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: { ...finalHeaders, ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || "Something went wrong. Please try again.");
  }
  return payload as T;
}
