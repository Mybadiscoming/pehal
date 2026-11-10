// File: frontend/src/app/login/page.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Demo only: authentication is not connected yet.
    setMessage(
      "Your sign-in form is ready. Account authentication will be connected soon."
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f5] px-5 py-8 text-[#30232e]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-[#70465f]"
        >
          pehal.
        </Link>

        <div className="grid min-h-[85vh] items-center gap-12 py-12 md:grid-cols-2">
          <section className="hidden md:block">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#946d81]">
              Welcome back
            </p>

            <h1 className="mt-5 max-w-lg text-5xl font-semibold leading-tight">
              Your journey, your pace, your choices.
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-[#766873]">
              Return to a space where you can explore support, understand
              your options, and access the tools you need.
            </p>

            <div className="mt-10 rounded-3xl bg-[#eee5e9] p-8">
              <p className="text-lg font-medium leading-8 text-[#593d50]">
                “Because support must follow through.”
              </p>
            </div>
          </section>

          <section className="mx-auto w-full max-w-md rounded-3xl border border-[#eadfe5] bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#946d81]">
                Your Pehal account
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Sign in
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#766873]">
                Enter your details to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-[#66545f]">
                  Email address
                </span>

                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#eadfe5] bg-[#faf7f5] px-4 py-3 text-sm outline-none transition focus:border-[#946d81] focus:ring-2 focus:ring-[#eee5e9]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[#66545f]">
                  Password
                </span>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-[#eadfe5] bg-[#faf7f5] px-4 py-3 pr-20 text-sm outline-none transition focus:border-[#946d81] focus:ring-2 focus:ring-[#eee5e9]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#70465f]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#70465f] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#70465f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#58364b]"
              >
                Sign in
              </button>

              {message && (
                <p
                  role="status"
                  className="rounded-xl bg-[#f8f1f5] p-3 text-sm leading-6 text-[#70465f]"
                >
                  {message}
                </p>
              )}
            </form>

            <div className="my-7 border-t border-[#eee5e9]" />

            <p className="text-center text-sm text-[#766873]">
              New to Pehal?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#70465f] hover:underline"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-[#9a8b94]">
              Your choices matter. Take things at your own pace.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}