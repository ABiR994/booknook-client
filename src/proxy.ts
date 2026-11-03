import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Private pages: visitors without a session are sent to /login and brought back after login.
// A logged in user keeps the session cookie, so reloading a private page never redirects.
// This only checks that the cookie exists. Pages and the API still verify the session themselves.
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", `${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-book", "/my-books", "/my-borrows", "/profile", "/books/:id"],
};
