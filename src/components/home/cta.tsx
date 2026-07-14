import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="border-t border-ink/8 bg-ink py-20 text-cream">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Your next room starts on a blank plan
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/60">
          Open the planner, try a few layouts, and keep what works. Nothing
          leaves your browser unless you export it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/studio">
            <Button size="lg" className="bg-brass text-white hover:bg-brass-dark">
              Launch planner
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/gallery">
            <Button
              size="lg"
              variant="outline"
              className="border-cream/25 text-cream hover:bg-cream/10"
            >
              Browse ideas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
