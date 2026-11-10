// File: frontend/src/app/reporting-navigator/page.tsx

"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

const concerns = [
  { value: "workplace_harassment", label: "Workplace harassment" },
  { value: "domestic_violence", label: "Domestic violence" },
  { value: "sexual_violence", label: "Sexual violence" },
  { value: "cyber_harassment", label: "Cyber harassment" },
  { value: "other", label: "Something else" },
];

const barriers = [
  { value: "fear_of_retaliation", label: "Fear of retaliation" },
  { value: "family_pressure", label: "Family pressure" },
  { value: "lack_of_information", label: "I don't know where to start" },
  { value: "privacy_concerns", label: "Privacy concerns" },
  { value: "financial_dependence", label: "Financial dependence" },
  { value: "emotional_distress", label: "I'm feeling overwhelmed" },
  { value: "unsure", label: "I'm not sure yet" },
];

const outcomes = [
  { value: "understand_options", label: "Understand my options" },
  { value: "prepare_to_report", label: "Understand how to prepare to report" },
  {
    value: "find_support_without_reporting",
    label: "Find support without reporting",
  },
];

type GuidanceResult = {
  concern_type: string;
  barrier: string;
  guidance: string;
  possible_options: string[];
  suggested_next_steps: string[];
  support_note: string;
  disclaimer: string;
};

export default function ReportingNavigatorPage() {
  const [concern, setConcern] = useState("");
  const [barrier, setBarrier] = useState("");
  const [outcome, setOutcome] = useState("understand_options");
  const [stateName, setStateName] = useState("");
  const [result, setResult] = useState<GuidanceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getGuidance(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/reporting-navigator/guidance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          concern_type: concern,
          barrier,
          preferred_outcome: outcome,
          ...(stateName.trim() ? { state: stateName.trim() } : {}),
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || `Request failed: ${response.status}`);
      }

      const data: GuidanceResult = await response.json();
      setResult(data);
    } catch {
      setError(
        "We couldn't retrieve your guidance. Please check that the Pehal backend is running and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function startAgain() {
    setResult(null);
    setError("");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#946d81]">
            Understand your choices
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#30232e]">
            Reporting Barrier Navigator
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#766873]">
            Understanding what to do next can be difficult. This tool helps
            you explore possible pathways based on your circumstances.
            You are not required to report or make any decision.
          </p>
        </header>

        {!result && (
          <form
            onSubmit={getGuidance}
            className="space-y-7 rounded-3xl border border-[#eadfe5] bg-white p-6 shadow-sm md:p-9"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#a17b8e]">
                Step 01
              </span>
              <h2 className="mt-2 text-xl font-semibold text-[#392b36]">
                What kind of concern would you like guidance about?
              </h2>
              <p className="mt-2 text-sm text-[#766873]">
                Choose the category that feels closest to your situation.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {concerns.map((item) => (
                  <label
                    key={item.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${
                      concern === item.value
                        ? "border-[#946d81] bg-[#f8f1f5] text-[#70465f]"
                        : "border-[#eadfe5] text-[#66545f] hover:bg-[#faf7f5]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="concern"
                      value={item.value}
                      checked={concern === item.value}
                      onChange={() => setConcern(item.value)}
                      className="accent-[#70465f]"
                      required
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-[#eee5e9]" />

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#a17b8e]">
                Step 02
              </span>
              <h2 className="mt-2 text-xl font-semibold text-[#392b36]">
                What is making it difficult to move forward?
              </h2>
              <p className="mt-2 text-sm text-[#766873]">
                Select the barrier that feels most relevant. You can choose
                just one for now.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {barriers.map((item) => (
                  <label
                    key={item.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${
                      barrier === item.value
                        ? "border-[#946d81] bg-[#f8f1f5] text-[#70465f]"
                        : "border-[#eadfe5] text-[#66545f] hover:bg-[#faf7f5]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="barrier"
                      value={item.value}
                      checked={barrier === item.value}
                      onChange={() => setBarrier(item.value)}
                      className="accent-[#70465f]"
                      required
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-[#eee5e9]" />

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#a17b8e]">
                Step 03
              </span>
              <h2 className="mt-2 text-xl font-semibold text-[#392b36]">
                What would be most helpful to you right now?
              </h2>

              <div className="mt-4 space-y-3">
                {outcomes.map((item) => (
                  <label
                    key={item.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${
                      outcome === item.value
                        ? "border-[#946d81] bg-[#f8f1f5] text-[#70465f]"
                        : "border-[#eadfe5] text-[#66545f] hover:bg-[#faf7f5]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="outcome"
                      value={item.value}
                      checked={outcome === item.value}
                      onChange={() => setOutcome(item.value)}
                      className="accent-[#70465f]"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="state"
                className="text-sm font-semibold text-[#392b36]"
              >
                State or Union Territory (optional)
              </label>
              <input
                id="state"
                type="text"
                maxLength={100}
                value={stateName}
                onChange={(event) => setStateName(event.target.value)}
                placeholder="e.g. Haryana"
                className="mt-2 w-full rounded-xl border border-[#eadfe5] bg-[#faf7f5] px-4 py-3 text-sm outline-none focus:border-[#946d81] sm:max-w-md"
              />
              <p className="mt-2 text-xs text-[#94838d]">
                Add your state if you want. You don't need to provide your
                address or identifying details.
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !concern || !barrier}
              className="w-full rounded-full bg-[#70465f] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#58364b] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? "Preparing your guidance..." : "Explore my options"}
            </button>

            <p className="text-xs leading-6 text-[#94838d]">
              You can explore information without committing to a particular
              action. Only share information you feel comfortable providing.
            </p>
          </form>
        )}

        {result && (
          <div className="space-y-6">
            <section className="rounded-3xl bg-[#eee5e9] p-6 md:p-9">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#80566d]">
                Your guidance
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#30232e]">
                Understanding your situation
              </h2>
              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-[#66545f]">
                {result.guidance}
              </p>
            </section>

            <section className="rounded-2xl border border-[#eadfe5] bg-white p-6 md:p-8">
              <h3 className="text-xl font-semibold text-[#392b36]">
                Possible pathways
              </h3>
              <p className="mt-2 text-sm text-[#766873]">
                These are options to explore, not instructions you must follow.
              </p>
              <ul className="mt-5 space-y-4">
                {result.possible_options.map((option, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-6 text-[#66545f]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4edf1] text-xs font-semibold text-[#70465f]">
                      {index + 1}
                    </span>
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-[#eadfe5] bg-white p-6 md:p-8">
              <h3 className="text-xl font-semibold text-[#392b36]">
                Possible next steps
              </h3>
              <ul className="mt-5 space-y-4">
                {result.suggested_next_steps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-6 text-[#66545f]">
                    <span className="mt-1 text-[#946d81]">→</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-[#d9c5d0] bg-[#faf7f5] p-6">
              <h3 className="font-semibold text-[#70465f]">
                Remember
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#66545f]">
                {result.support_note}
              </p>
            </section>

            <section className="rounded-2xl border border-[#eadfe5] bg-white p-6">
              <h3 className="text-sm font-semibold text-[#392b36]">
                Important information
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#766873]">
                {result.disclaimer}
              </p>
            </section>

            <button
              onClick={startAgain}
              className="rounded-full bg-[#70465f] px-7 py-3 text-sm font-semibold text-white hover:bg-[#58364b]"
            >
              Start again
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}