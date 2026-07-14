"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/studio";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password");
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-ink/8 bg-white p-6 shadow-sm sm:p-8"
    >
      <label className="block text-xs font-medium text-ink/50">
        Email
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 h-11 w-full rounded-xl border border-ink/10 bg-cream px-3 text-sm text-ink outline-none focus:ring-2 focus:ring-brass/30"
          placeholder="you@example.com"
        />
      </label>
      <label className="mt-4 block text-xs font-medium text-ink/50">
        Password
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 h-11 w-full rounded-xl border border-ink/10 bg-cream px-3 text-sm text-ink outline-none focus:ring-2 focus:ring-brass/30"
          placeholder="••••••••"
        />
      </label>

      {error && (
        <p className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <Button type="submit" className="mt-6 w-full" size="lg" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Log in
      </Button>

      <p className="mt-6 text-center text-sm text-ink/50">
        No account?{" "}
        <Link href="/register" className="font-medium text-brass-dark hover:underline">
          Create one free
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-ink/40">
        Guests can still design locally without an account.
      </p>
    </form>
  );
}
