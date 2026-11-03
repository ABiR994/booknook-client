import { LoginForm } from "@/components/auth/LoginForm";
import { safeRedirect } from "@/lib/validation";

export const metadata = { title: "Login" };

type Props = { searchParams: Promise<{ redirect?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { redirect } = await searchParams;

  return (
    <section className="container-page flex justify-center py-12 sm:py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h1 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">Welcome back</h1>
        <p className="mb-8 mt-3 text-center text-sm leading-6 text-muted-foreground">
          Log in to add, borrow and return books.
        </p>
        <LoginForm redirectTo={safeRedirect(redirect)} />
      </div>
    </section>
  );
}
