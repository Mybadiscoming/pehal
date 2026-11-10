// File: frontend/src/app/settings/page.tsx

"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

type Theme = "light" | "dark";

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("pehal-theme") as Theme | null;

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  function changeTheme(newTheme: Theme) {
    setTheme(newTheme);
    localStorage.setItem("pehal-theme", newTheme);
    document.documentElement.dataset.theme = newTheme;
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#946d81]">
            Personalise your experience
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#30232e]">
            Settings
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#766873]">
            Manage how Pehal looks and how you use your account.
          </p>
        </div>

        <section className="rounded-2xl border border-[#eadfe5] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#392b36]">
            Appearance
          </h2>
          <p className="mt-1 text-sm text-[#766873]">
            Choose the theme that feels comfortable for you.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => changeTheme("light")}
              className={`rounded-xl border-2 p-5 text-left transition ${
                theme === "light"
                  ? "border-[#70465f] bg-[#f8f1f5]"
                  : "border-[#eadfe5] hover:border-[#c9aebe]"
              }`}
            >
              <div className="mb-4 h-20 rounded-lg border border-[#eadfe5] bg-[#faf7f5] p-3">
                <div className="h-3 w-1/2 rounded bg-[#d9c5d0]" />
                <div className="mt-3 h-7 rounded bg-white" />
              </div>
              <p className="font-semibold text-[#392b36]">Light mode</p>
              <p className="mt-1 text-sm text-[#766873]">
                A bright, soft appearance.
              </p>
              {theme === "light" && (
                <p className="mt-3 text-xs font-semibold text-[#70465f]">
                  SELECTED
                </p>
              )}
            </button>

            <button
              onClick={() => changeTheme("dark")}
              className={`rounded-xl border-2 p-5 text-left transition ${
                theme === "dark"
                  ? "border-[#70465f] bg-[#f8f1f5]"
                  : "border-[#eadfe5] hover:border-[#c9aebe]"
              }`}
            >
              <div className="mb-4 h-20 rounded-lg border border-[#493b49] bg-[#211b25] p-3">
                <div className="h-3 w-1/2 rounded bg-[#98758f]" />
                <div className="mt-3 h-7 rounded bg-[#382d3b]" />
              </div>
              <p className="font-semibold text-[#392b36]">Dark mode</p>
              <p className="mt-1 text-sm text-[#766873]">
                A darker appearance with less brightness.
              </p>
              {theme === "dark" && (
                <p className="mt-3 text-xs font-semibold text-[#70465f]">
                  SELECTED
                </p>
              )}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-[#eadfe5] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#392b36]">
            Account preferences
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#766873]">
            Your profile and account preferences will be available here.
            Account management features can be connected when authentication
            is implemented.
          </p>
        </section>

        <section className="rounded-2xl border border-[#eadfe5] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#392b36]">
            Privacy and safety
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#766873]">
            Pehal is designed to let you explore support at your own pace.
            Avoid entering sensitive personal information into this demo.
          </p>
        </section>
      </div>
    </AppShell>
  );
}