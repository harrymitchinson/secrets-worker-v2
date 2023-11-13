import { default as FrequentlyAskedQuestions } from "@/components/FAQ";

export const runtime = "edge";

export default async function FAQ() {
  return <FrequentlyAskedQuestions />;
}
