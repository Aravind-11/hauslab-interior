import type { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a Hauslab account to sync designs across devices.",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">
          Account
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink">Create your account</h1>
        <p className="mt-2 text-sm text-ink/55">
          Guest layouts from this browser are claimed into your new account.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
