// frontend/src/app/page.tsx

const features = [
  {
    number: "01",
    title: "Safe Space Companion",
    description:
      "A private-feeling, supportive space to talk through difficult moments and explore relevant resources.",
    href: "/safe-space",
  },
  {
    number: "02",
    title: "Reporting Navigator",
    description:
      "Understand reporting pathways, possible barriers, and the options available to you.",
    href: "/reporting-navigator",
  },
  {
    number: "03",
    title: "Survivor Advocacy Network",
    description:
      "Find support organisations and services that align with your needs and location.",
    href: "/advocacy-network",
  },
  {
    number: "04",
    title: "Institutional Accountability",
    description:
      "Follow case milestones, expected updates, follow-ups, and overdue actions in one place.",
    href: "/accountability",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#29252b]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#eae5e2] bg-[#faf9f7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="/" className="text-3xl font-semibold tracking-tight">
            pehal<span className="text-[#a66b82]">.</span>
          </a>

          <nav className="hidden items-center gap-9 text-sm font-medium text-[#625b62] md:flex">
            <a href="#about" className="transition hover:text-[#9a5874]">
              About
            </a>
            <a href="#features" className="transition hover:text-[#9a5874]">
              What we offer
            </a>
            <a href="#approach" className="transition hover:text-[#9a5874]">
              Our approach
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-[#554b53] transition hover:bg-[#f0e9ec] sm:inline-block"
            >
              Sign in
            </a>
            <a
              href="/signup"
              className="rounded-full bg-[#70465e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#59364b]"
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#a66b82]">
              Support · Voice · Accountability
            </p>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              When systems fall short,
              <span className="text-[#a66b82]"> accountability matters.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#756d74]">
              Pehal brings support, information, advocacy, and institutional
              accountability together — helping survivors understand their
              options and keep track of what happens next.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/signup"
                className="rounded-full bg-[#70465e] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#59364b]"
              >
                Explore Pehal <span className="ml-2">→</span>
              </a>
              <a
                href="#features"
                className="rounded-full border border-[#dcd2d7] px-7 py-4 text-sm font-semibold text-[#554b53] transition hover:bg-white"
              >
                Discover the platform
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-[#eee5e9] p-7 sm:p-10">
              <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a66b82]">
                  The Pehal approach
                </p>
                <h2 className="mt-5 text-3xl font-semibold leading-snug">
                  Support should not end at being heard.
                </h2>
                <p className="mt-4 leading-7 text-[#756d74]">
                  Information should be accessible. Choices should remain
                  yours. Institutional processes should be easier to follow.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Understand your options",
                    "Find relevant support",
                    "Keep track of institutional action",
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3e9ee] text-sm font-semibold text-[#89536c]">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-[#554b53]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs tracking-wide text-[#93858d]">
              A survivor-centred approach to support and accountability
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-[#eae5e2] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a66b82]">
              Why Pehal
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              One step towards a more accountable system.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#756d74]">
            Navigating support systems and institutional procedures can be
            overwhelming. Pehal brings together tools designed to make those
            processes easier to understand, access, and follow — without taking
            decision-making away from the person at the centre of them.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a66b82]">
            The platform
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Four ways Pehal makes a difference.
          </h2>
          <p className="mt-5 leading-7 text-[#756d74]">
            Connected tools for support, informed choices, access to advocacy,
            and visibility into institutional processes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <a
              href={feature.href}
              key={feature.number}
              className="group rounded-3xl border border-[#e9e0e4] bg-white p-8 transition hover:-translate-y-1 hover:border-[#c8a6b5] hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-widest text-[#a66b82]">
                  {feature.number}
                </span>
                <span className="text-xl text-[#a66b82] transition group-hover:translate-x-1">
                  →
                </span>
              </div>
              <h3 className="mt-9 text-2xl font-semibold">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#756d74]">
                {feature.description}
              </p>
              <p className="mt-8 text-sm font-semibold text-[#89536c]">
                Explore feature <span className="ml-1">→</span>
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="bg-[#70465e] text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 py-20 md:flex-row md:items-center lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6cbd7]">
              Our guiding principle
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Because code must follow through.
            </h2>
          </div>
          <a
            href="/signup"
            className="w-fit rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#70465e] transition hover:bg-[#f4eaf0]"
          >
            Get started with Pehal →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#29252b] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <p className="text-2xl font-semibold">pehal.</p>
            <p className="mt-2 text-sm text-[#c2b7bf]">
              Because code must follow through.
            </p>
          </div>
          <p className="text-xs text-[#b5aab2]">
            © 2026 Pehal. Built around support and accountability.
          </p>
        </div>
      </footer>
    </main>
  );
}