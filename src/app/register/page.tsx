import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <section className="container-page flex justify-center py-12 sm:py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h1 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">Create your account</h1>
        <p className="mb-8 mt-3 text-center text-sm leading-6 text-muted-foreground">
          Join BookNook to add, borrow and return books.
        </p>
        <RegisterForm />
      </div>
    </section>
  );
}
