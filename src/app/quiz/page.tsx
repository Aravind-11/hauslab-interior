import type { Metadata } from "next";
import { QuizClient } from "./quiz-client";

export const metadata: Metadata = {
  title: "Style Quiz",
  description: "Discover your interior design style with a short interactive quiz.",
};

export default function QuizPage() {
  return <QuizClient />;
}
