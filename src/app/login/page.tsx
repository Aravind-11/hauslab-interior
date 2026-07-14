import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to Hauslab to sync your room plans to the cloud.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">
          Account
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink">Welcome back</h1>
        <p className="mt-2 text-sm text-ink/55">
          Log in to access cloud projects on any device.
        </p>
      </div>
      <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl bg-white" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
