// File: frontend/src/app/page.tsx

import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Safe Space Companion",
    description:
      "A supportive conversational space where survivors can express concerns, explore their feelings, and discover relevant support resources.",
    href: "/safe-space",
    label: "Start a conversation",
    symbol: "01",
  },
  {
    number: "02",
    title: "Reporting Barrier Navigator",
    description:
      "Understand possible reporting pathways, identify barriers, and explore available choices without being pressured into reporting.",
    href: "/reporting-navigator",
    label: "Explore your options",
    symbol: "02",
  },
  {
    number: "03",
    title: "Survivor Advocacy Network",
    description:
      "Discover support organisations and services based on the kind of assistance and location you are looking for.",
    href: "/advocacy-network",
    label: "Find support",
    symbol: "03",
  },
  {
    number: "04",
    title: "Institutional Accountability Tracker",
    description:
      "Keep a record of case milestones, expected updates, follow-ups, and institutional responses.",
    href: "/accountability",
    label: "Track progress",
    symbol: "04",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf7f5] text-[#30232e]">

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#eadfe5] bg-[#faf7f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="text-3xl font-bold tracking-tight text-[#70465f]">
            pehal<span className="text-[#b58da3]">.</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#66545f] md:flex">
            <a href="#about" className="transition hover:text-[#70465f]">
              About Pehal
            </a>
            <a href="#features" className="transition hover:text-[#70465f]">
              Our features
            </a>
            <a href="#approach" className="transition hover:text-[#70465f]">
              Our approach
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#70465f] transition hover:bg-[#eee5e9]"
            >
              Sign in
            </Link>

            <Link
              href="/dashboard"
              className="rounded-full bg-[#70465f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#58364b]"
            >
              Explore Pehal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">

          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.23em] text-[#946d81]">
              Support · Choice · Accountability
            </p>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Being heard is just the beginning.
              <span className="text-[#946d81]">
                {" "}Support must follow through.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#766873] sm:text-lg">
              Navigating support systems after harassment or violence
              should not mean navigating everything alone. Pehal brings
              emotional support, reporting guidance, advocacy resources,
              and institutional accountability together in one place.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="rounded-full bg-[#70465f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#58364b]"
              >
                Explore the platform →
              </Link>

              <a
                href="#features"
                className="rounded-full border border-[#d9c5d0] px-7 py-4 text-sm font-semibold text-[#70465f] transition hover:bg-white"
              >
                Discover what we offer
              </a>
            </div>

            <p className="mt-7 text-xs leading-6 text-[#94838d]">
              Your choices remain yours. Support should never come with
              pressure.
            </p>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="rounded-[2rem] bg-[#eee5e9] p-6 sm:p-9">
              <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#946d81]">
                  The Pehal approach
                </p>

                <h2 className="mt-5 text-3xl font-semibold leading-snug text-[#392b36]">
                  From being heard to being supported.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#766873]">
                  Because support is more than a conversation. It is
                  information, access to resources, and the ability to
                  follow what happens next.
                </p>

                <div className="mt-8 space-y-5">
                  {[
                    {
                      title: "A space to speak",
                      description: "Be heard without judgement.",
                    },
                    {
                      title: "A way to understand",
                      description: "Explore choices at your own pace.",
                    },
                    {
                      title: "A network of support",
                      description: "Discover relevant support services.",
                    },
                    {
                      title: "A way to follow through",
                      description: "Keep track of institutional action.",
                    },
                  ].map((item, index) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3e9ee] text-sm font-semibold text-[#89536c]">
                        {index + 1}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#392b36]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#94838d]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-[#eadfe5] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#946d81]">
              Why Pehal exists
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              The journey doesn't end when someone speaks up.
            </h2>
          </div>

          <div className="space-y-5">
            <p className="text-base leading-8 text-[#766873]">
              For survivors, finding support can involve navigating
              unfamiliar systems, understanding complicated procedures,
              overcoming personal barriers, and waiting for institutional
              responses.
            </p>

            <p className="text-base leading-8 text-[#766873]">
              These challenges are often disconnected. Pehal brings
              different forms of support into one connected platform,
              helping individuals understand their choices and keep
              track of what happens next.
            </p>

            <p className="border-l-2 border-[#946d81] pl-5 text-lg font-medium leading-8 text-[#70465f]">
              The responsibility to follow through should not rest
              entirely on the person seeking support.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">

        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#946d81]">
            What Pehal offers
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Four connected ways to make a difference.
          </h2>

          <p className="mt-5 text-base leading-8 text-[#766873]">
            Each feature addresses a different part of the support
            journey, bringing guidance, resources, and accountability
            together.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Link
              href={feature.href}
              key={feature.number}
              className="group rounded-3xl border border-[#eadfe5] bg-white p-7 transition hover:-translate-y-1 hover:border-[#c9aebe] hover:shadow-xl sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-widest text-[#a17b8e]">
                  {feature.symbol}
                </span>

                <span className="text-2xl text-[#946d81] transition group-hover:translate-x-1">
                  →
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-semibold text-[#392b36]">
                {feature.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#766873]">
                {feature.description}
              </p>

              <p className="mt-8 text-sm font-semibold text-[#70465f]">
                {feature.label} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="bg-[#70465f] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5df]">
              Our guiding principle
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Life for her. By her. From her.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-[#f0e4eb]">
              Pehal is built around the belief that every individual
              deserves to be heard, informed, supported, and respected.
              The person at the centre of the journey should remain
              in control of their choices.
            </p>

            <p className="mt-5 text-xl font-semibold">
              Because support must follow through.
            </p>

            <Link
              href="/dashboard"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#70465f] transition hover:bg-[#f4eaf0]"
            >
              Explore Pehal →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#29232a] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          <div>
            <p className="text-3xl font-bold tracking-tight">
              pehal<span className="text-[#c39bad]">.</span>
            </p>
            <p className="mt-2 text-sm text-[#cbbdc6]">
              Because support must follow through.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-[#d5c9d0]">
            <Link href="/dashboard" className="hover:text-white">
              Explore
            </Link>
            <Link href="/login" className="hover:text-white">
              Sign in
            </Link>
            <a href="#about" className="hover:text-white">
              About
            </a>
          </div>

          <p className="text-xs text-[#b5aab2]">
            © 2026 Pehal. Support and accountability.
          </p>
        </div>
      </footer>
    </main>
  );
}