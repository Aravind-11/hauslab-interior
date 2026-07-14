"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PenTool, Palette } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brass/12 blur-3xl" />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-sage/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-clay/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,41,0.06) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-medium text-ink/70 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-brass" />
              Free · private · no signup
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Sketch the room.{" "}
              <span className="italic text-brass-dark">Ship the vibe.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
              Drop furniture on a real-scale floor plan, test wall colors, and
              pin mood boards — so you stop guessing before you buy or renovate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/studio">
                <Button size="lg">
                  <PenTool className="h-4 w-4" />
                  Start a floor plan
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/quiz">
                <Button size="lg" variant="outline">
                  <Sparkles className="h-4 w-4" />
                  Find my style
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink/50">
              <div>
                <p className="font-display text-2xl text-ink">25+</p>
                <p>Furniture pieces</p>
              </div>
              <div className="h-10 w-px bg-ink/10" />
              <div>
                <p className="font-display text-2xl text-ink">8</p>
                <p>Style directions</p>
              </div>
              <div className="h-10 w-px bg-ink/10" />
              <div>
                <p className="font-display text-2xl text-ink">0</p>
                <p>Accounts needed</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-ink/8 bg-white p-4 shadow-2xl shadow-ink/10 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink/40">
                  Live mockup
                </p>
                <p className="font-display text-lg text-ink">Lounge · 18×14 ft</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                Editable
              </span>
            </div>
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/5"
              style={{
                backgroundColor: "#c5d0dc",
                backgroundImage: `repeating-linear-gradient(90deg, #c5d0dc 0px, #c5d0dc 24px, #b4c0ce 24px, #b4c0ce 26px)`,
              }}
            >
              <div
                className="absolute inset-0 border-[12px]"
                style={{ borderColor: "#eef2f7" }}
              />
              <div
                className="absolute left-[12%] top-[38%] h-[22%] w-[48%] rounded-lg border border-black/10 shadow-md"
                style={{ backgroundColor: "#4a5d73" }}
              >
                <div className="absolute inset-1 rounded border border-white/10" />
              </div>
              <div
                className="absolute left-[28%] top-[62%] h-[12%] w-[22%] rounded-full border border-black/10 shadow"
                style={{ backgroundColor: "#f3f5f8" }}
              />
              <div
                className="absolute right-[18%] top-[40%] h-[18%] w-[14%] rounded-full border border-black/10 shadow"
                style={{ backgroundColor: "#ff6b4a" }}
              />
              <div
                className="absolute bottom-[18%] left-[18%] h-[28%] w-[50%] rounded-sm border border-dashed border-black/15 opacity-80"
                style={{ backgroundColor: "#1e3a5f" }}
              />
              <div
                className="absolute right-[12%] bottom-[22%] flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-lg shadow"
                style={{ backgroundColor: "#2d6a4f" }}
              >
                🌿
              </div>
              <div
                className="absolute left-[10%] top-[20%] h-8 w-8 rounded-full border border-black/10 shadow"
                style={{ backgroundColor: "#94a3b8" }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Wall", color: "#eef2f7" },
                { label: "Floor", color: "#c5d0dc" },
                { label: "Accent", color: "#ff6b4a" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 rounded-xl bg-cream px-2.5 py-2"
                >
                  <span
                    className="h-5 w-5 rounded-full border border-black/10"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-xs font-medium text-ink/60">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-ink/8 bg-white p-3 shadow-xl sm:flex sm:items-center sm:gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-cream">
              <Palette className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-ink/45">Active palette</p>
              <p className="text-sm font-medium text-ink">Harbor Coral</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
