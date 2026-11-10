// frontend/src/components/AppShell.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Overview", href: "/dashboard" },
  { label: "Safe Space Companion", href: "/safe-space" },
  { label: "Reporting Navigator", href: "/reporting-navigator" },
  { label: "Survivor Advocacy Network", href: "/advocacy-network" },
  { label: "Institutional Accountability", href: "/accountability" },
];

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf7f5] text-[#30232e] md:flex">
      <aside className="flex w-full shrink-0 flex-col border-b border-[#eadfe5] bg-white px-5 py-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:px-6 md:py-8">
        <Link href="/dashboard" className="mb-9 block">
          <p className="text-3xl font-semibold tracking-tight text-[#70465e]">
            pehal<span className="text-[#c17b91]">.</span>
          </p>
          <p className="mt-1 text-[10px] tracking-[0.15em] text-[#9b8793]">
            BECAUSE SUPPORT MUST FOLLOW THROUGH.
          </p>
        </Link>

        <p className="mb-3 hidden text-xs font-semibold uppercase tracking-widest text-[#aa98a2] md:block">
          Workspace
        </p>

        <nav className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-xl px-3 py-3 text-sm transition ${
                  active
                    ? "bg-[#f3e8ee] font-semibold text-[#70465e]"
                    : "text-[#776775] hover:bg-[#faf3f6] hover:text-[#70465e]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden rounded-2xl bg-[#f7edf1] p-4 md:block">
          <p className="text-sm font-semibold text-[#70465e]">
            A space that puts her first.
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-[#eadfe5] bg-white px-5 py-4 sm:px-8 lg:px-12">
          <p className="text-sm text-[#806d79]">
            Because support must follow through.
          </p>

          <div className="relative">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="flex items-center gap-2 rounded-full border border-[#eadfe5] px-3 py-2 text-sm hover:bg-[#faf3f6]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f3e8ee] font-semibold text-[#70465e]">
                P
              </span>
              <span className="hidden sm:inline">My account</span>
              <span>⌄</span>
            </button>

            {accountOpen && (
              <div className="absolute right-0 z-50 mt-3 w-52 rounded-2xl border border-[#eadfe5] bg-white p-2 shadow-xl">
                <Link
                  href="/profile"
                  onClick={() => setAccountOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm hover:bg-[#faf3f6]"
                >
                  My profile
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setAccountOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm hover:bg-[#faf3f6]"
                >
                  Settings
                </Link>
                <div className="my-1 border-t border-[#eee5ea]" />
                <Link
                  href="/login"
                  onClick={() => setAccountOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-[#89536c] hover:bg-[#faf3f6]"
                >
                   Sign out
                </Link>
              </div>
            )}
          </div>
        </header>

        <main className="px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          {children}
        </main>

        <footer className="mx-5 border-t border-[#eadfe5] py-6 text-xs text-[#a18e99] sm:mx-8 lg:mx-12">
          Pehal · Because support must follow through.
        </footer>
      </div>
    </div>
  );
}