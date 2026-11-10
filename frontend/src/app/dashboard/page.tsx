// File: frontend/src/app/dashboard/page.tsx

import Link from "next/link";
import AppShell from "@/components/AppShell";

const features = [
  {
    number: "01",
    title: "Safe Space Companion",
    description:
      "A supportive space to express concerns, explore options, and find helpful resources.",
    href: "/safe-space",
    action: "Open safe space",
  },
  {
    number: "02",
    title: "Reporting Barrier Navigator",
    description:
      "Understand possible reporting pathways and the barriers you may encounter.",
    href: "/reporting-navigator",
    action: "Explore your options",
  },
  {
    number: "03",
    title: "Survivor Advocacy Network",
    description:
      "Discover support organisations and services that may be able to help.",
    href: "/advocacy-network",
    action: "Find support",
  },
  {
    number: "04",
    title: "Institutional Accountability",
    description:
      "Keep track of case milestones, follow-ups, and institutional responses.",
    href: "/accountability",
    action: "View case tracker",
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl bg-[#eee5e9] px-7 py-10 md:px-10 md:py-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#80566d]">
            Your space. Your choices.
          </p>

          <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-[#30232e] md:text-5xl">
            Support should not end when a report is made.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#66545f]">
            Pehal brings guidance, support pathways, and accountability tools
            together — so people can explore their next steps at their own pace.
          </p>

          <Link
            href="/safe-space"
            className="mt-8 inline-flex rounded-full bg-[#70465f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#58364b]"
          >
            Explore Pehal
          </Link>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#946d81]">
              Your support tools
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#30232e]">
              Where would you like to begin?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#766873]">
              Choose the kind of support or information you are looking for.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="rounded-2xl border border-[#eadfe5] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-semibold tracking-widest text-[#a17b8e]">
                  {feature.number}
                </p>

                <h3 className="mt-4 text-xl font-semibold text-[#392b36]">
                  {feature.title}
                </h3>

                <p className="mt-3 min-h-14 text-sm leading-6 text-[#766873]">
                  {feature.description}
                </p>

                <Link
                  href={feature.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#70465f] hover:text-[#4f3044]"
                >
                  {feature.action}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#eadfe5] bg-white p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#946d81]">
            A note about your choices
          </p>
          <h2 className="mt-3 text-xl font-semibold text-[#30232e]">
            You decide what happens next.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#766873]">
            You can explore information without being pressured to report,
            share personal details, or take a particular action. Use the tools
            that feel relevant to you.
          </p>
        </section>
      </div>
    </AppShell>
  );
}