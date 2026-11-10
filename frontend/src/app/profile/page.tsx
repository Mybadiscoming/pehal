// File: frontend/src/app/profile/page.tsx

"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

export default function ProfilePage() {
  const [name, setName] = useState("Your name");
  const [email, setEmail] = useState("your.email@example.com");
  const [editing, setEditing] = useState(false);

  function saveProfile() {
    setEditing(false);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#946d81]">
            Your account
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#30232e]">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-[#766873]">
            View and manage your account information.
          </p>
        </div>

        <section className="rounded-2xl border border-[#eadfe5] bg-white p-6 md:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eee5e9] text-2xl font-semibold text-[#70465f]">
              {name.trim().charAt(0).toUpperCase() || "P"}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#392b36]">
                {name}
              </h2>
              <p className="mt-1 text-sm text-[#766873]">{email}</p>
              <p className="mt-2 text-xs text-[#946d81]">
                Pehal account
              </p>
            </div>
          </div>

          <div className="my-8 border-t border-[#eee5e9]" />

          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[#392b36]">
                Personal information
              </h3>
              <p className="mt-1 text-sm text-[#766873]">
                Update the details displayed on your profile.
              </p>
            </div>

            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="rounded-full border border-[#d9c5d0] px-4 py-2 text-sm font-semibold text-[#70465f] hover:bg-[#f8f1f5]"
              >
                Edit profile
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#66545f]">
                Full name
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={!editing}
                className="mt-2 w-full rounded-xl border border-[#eadfe5] bg-[#faf7f5] px-4 py-3 text-sm text-[#392b36] outline-none focus:border-[#946d81] disabled:opacity-80"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#66545f]">
                Email address
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={!editing}
                className="mt-2 w-full rounded-xl border border-[#eadfe5] bg-[#faf7f5] px-4 py-3 text-sm text-[#392b36] outline-none focus:border-[#946d81] disabled:opacity-80"
              />
            </label>
          </div>

          {editing && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={saveProfile}
                className="rounded-full bg-[#70465f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#58364b]"
              >
                Save changes
              </button>

              <button
                onClick={() => setEditing(false)}
                className="rounded-full border border-[#eadfe5] px-6 py-3 text-sm font-semibold text-[#66545f] hover:bg-[#faf7f5]"
              >
                Cancel
              </button>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-[#eadfe5] bg-white p-6">
          <h2 className="font-semibold text-[#392b36]">Your privacy matters</h2>
          <p className="mt-2 text-sm leading-6 text-[#766873]">
            Only add information that is necessary for your account. This
            prototype does not yet connect profile changes to a secure
            authentication or database system.
          </p>
        </section>
      </div>
    </AppShell>
  );
}