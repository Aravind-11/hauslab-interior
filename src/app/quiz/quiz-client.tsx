"use client";

import { useMemo, useState } from "react";
import { QUIZ_QUESTIONS, STYLE_LABELS, STYLE_PROFILES } from "@/lib/data/styles";
import type { DesignStyle } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function QuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const done = step >= QUIZ_QUESTIONS.length;

  const scores = useMemo(() => {
    const map: Record<DesignStyle, number> = {
      minimalist: 0,
      scandinavian: 0,
      industrial: 0,
      "mid-century": 0,
      bohemian: 0,
      contemporary: 0,
      japandi: 0,
      coastal: 0,
    };
    answers.forEach((optIdx, qIdx) => {
      const opt = QUIZ_QUESTIONS[qIdx]?.options[optIdx];
      opt?.styles.forEach((s) => {
        map[s] += 1;
      });
    });
    return map;
  }, [answers]);

  const ranking = useMemo(() => {
    return (Object.entries(scores) as [DesignStyle, number][])
      .sort((a, b) => b[1] - a[1])
      .map(([style, score]) => ({ style, score }));
  }, [scores]);

  const top = ranking[0];
  const profile = top ? STYLE_PROFILES[top.style] : null;
  const progress = Math.min(step / QUIZ_QUESTIONS.length, 1) * 100;

  const next = () => {
    if (selected === null) return;
    setAnswers((a) => [...a, selected]);
    setSelected(null);
    setStep((s) => s + 1);
  };

  const back = () => {
    if (step === 0) return;
    setAnswers((a) => a.slice(0, -1));
    setSelected(null);
    setStep((s) => s - 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/60">
          <Sparkles className="h-3.5 w-3.5 text-brass" />
          Style match
        </span>
        <h1 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
          Which look fits you?
        </h1>
        <p className="mt-2 text-ink/55">
          Six quick questions. We rank design directions against your answers.
        </p>
      </div>

      {/* Progress */}
      {!done && (
        <div className="mt-8">
          <div className="mb-2 flex justify-between text-xs text-ink/45">
            <span>
              Question {step + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-ink/8">
            <div
              className="h-full rounded-full bg-brass transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="mt-8"
          >
            <div className="rounded-3xl border border-ink/8 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                {QUIZ_QUESTIONS[step].question}
              </h2>
              <div className="mt-6 space-y-2.5">
                {QUIZ_QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelected(i)}
                    className={cn(
                      "w-full rounded-2xl border px-4 py-4 text-left text-sm font-medium transition sm:text-base",
                      selected === i
                        ? "border-ink bg-ink text-cream shadow-md"
                        : "border-ink/10 bg-cream text-ink hover:border-ink/25"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={back}
                  disabled={step === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button onClick={next} disabled={selected === null}>
                  {step === QUIZ_QUESTIONS.length - 1 ? "See results" : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          profile && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <div className="overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-lg">
                <div className="flex h-28">
                  {profile.colors.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="p-6 sm:p-8">
                  <Badge variant="brass">Your primary style</Badge>
                  <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                    {STYLE_LABELS[top.style]}
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink/60">
                    {profile.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.keywords.map((k) => (
                      <Badge key={k} variant="outline">
                        {k}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                      Full ranking
                    </h3>
                    <div className="mt-3 space-y-2">
                      {ranking.map(({ style, score }) => {
                        const max = ranking[0].score || 1;
                        const pct = (score / max) * 100;
                        return (
                          <div key={style}>
                            <div className="mb-1 flex justify-between text-xs">
                              <span className="font-medium text-ink">
                                {STYLE_LABELS[style]}
                              </span>
                              <span className="text-ink/40">{score} pts</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-ink/8">
                              <div
                                className="h-full rounded-full bg-brass/80 transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    <Link href="/studio">
                      <Button>Design in this style</Button>
                    </Link>
                    <Link href="/gallery">
                      <Button variant="outline">See inspiration</Button>
                    </Link>
                    <Button variant="ghost" onClick={reset}>
                      <RotateCcw className="h-4 w-4" />
                      Retake quiz
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
