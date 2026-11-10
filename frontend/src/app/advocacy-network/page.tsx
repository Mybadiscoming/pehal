// File: frontend/src/app/advocacy-network/page.tsx

"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

const supportOptions = [
  { value: "legal_aid", label: "Legal aid" },
  { value: "legal_information", label: "Legal information" },
  { value: "counselling", label: "Counselling" },
  { value: "emotional_support", label: "Emotional support" },
  { value: "shelter", label: "Shelter support" },
  { value: "emergency_support", label: "Emergency support" },
  { value: "practical_support", label: "Practical support" },
  { value: "workplace_advocacy", label: "Workplace advocacy" },
  { value: "medical_support", label: "Medical support" },
  { value: "healthcare_referral", label: "Healthcare referrals" },
];

type Organisation = {
  id: string;
  name: string;
  description: string;
  services: string[];
  city: string;
  state: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  contact_hours: string | null;
  latitude: number;
  longitude: number;
  verification_status: string;
  is_demo: boolean;
  source_url: string | null;
};

type MatchResponse = {
  total_results: number;
  search_city: string | null;
  search_state: string | null;
  matched_support_types: string[];
  organisations: Organisation[];
  notice: string;
};

export default function AdvocacyNetworkPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [includeOther, setIncludeOther] = useState(false);

  const [results, setResults] = useState<Organisation[]>([]);
  const [notice, setNotice] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleService(value: string) {
    setSelectedServices((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );
  }

  async function searchOrganisations(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const response = await fetch("/api/advocacy-network/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          support_types: selectedServices,
          city: city.trim() || null,
          state: state.trim() || null,
          include_other_locations: includeOther,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data: MatchResponse = await response.json();

      setResults(data.organisations);
      setNotice(data.notice);
      setSearched(true);
    } catch {
      setError(
        "We couldn't retrieve organisations. Please check that the Pehal backend is running and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#946d81]">
            Find support
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#30232e]">
            Survivor Advocacy Network
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#766873]">
            Explore organisations based on the kind of support you are
            looking for and the location you prefer. You choose what
            information to share and what steps to take.
          </p>
        </header>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex gap-3">
            <span className="text-lg">ⓘ</span>
            <div>
              <h2 className="font-semibold text-amber-900">
                Demonstration directory
              </h2>
              <p className="mt-1 text-sm leading-6 text-amber-800">
                The organisations currently listed are fictional demo
                entries. Their locations and contact information are not
                real. Do not use these entries to seek actual assistance.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={searchOrganisations}
          className="space-y-7 rounded-3xl border border-[#eadfe5] bg-white p-6 shadow-sm md:p-8"
        >
          <div>
            <h2 className="text-xl font-semibold text-[#392b36]">
              What kind of support are you looking for?
            </h2>
            <p className="mt-2 text-sm text-[#766873]">
              Select one or more categories. Leave them unselected to
              explore all available demo organisations.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {supportOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${
                    selectedServices.includes(option.value)
                      ? "border-[#946d81] bg-[#f8f1f5] text-[#70465f]"
                      : "border-[#eadfe5] text-[#66545f] hover:bg-[#faf7f5]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(option.value)}
                    onChange={() => toggleService(option.value)}
                    className="h-4 w-4 accent-[#70465f]"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-[#eee5e9]" />

          <div>
            <h2 className="text-xl font-semibold text-[#392b36]">
              Preferred location
            </h2>
            <p className="mt-2 text-sm text-[#766873]">
              Location is optional. You can leave these fields blank.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-sm font-medium text-[#66545f]">
                  City
                </span>
                <input
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Enter city"
                  maxLength={100}
                  className="mt-2 w-full rounded-xl border border-[#eadfe5] bg-[#faf7f5] px-4 py-3 text-sm outline-none focus:border-[#946d81]"
                />
              </label>

              <label>
                <span className="text-sm font-medium text-[#66545f]">
                  State / Union Territory
                </span>
                <input
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  placeholder="Enter state"
                  maxLength={100}
                  className="mt-2 w-full rounded-xl border border-[#eadfe5] bg-[#faf7f5] px-4 py-3 text-sm outline-none focus:border-[#946d81]"
                />
              </label>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-[#66545f]">
              <input
                type="checkbox"
                checked={includeOther}
                onChange={(event) => setIncludeOther(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[#70465f]"
              />
              Include matching organisations from other locations too.
            </label>
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
            disabled={loading}
            className="w-full rounded-full bg-[#70465f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#58364b] disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Finding organisations..." : "Find support organisations"}
          </button>
        </form>

        {searched && (
          <section className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#946d81]">
                  Search results
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#30232e]">
                  {results.length} organisation{results.length !== 1 ? "s" : ""} found
                </h2>
              </div>

              <button
                onClick={() => {
                  setResults([]);
                  setSearched(false);
                }}
                className="text-sm font-semibold text-[#70465f] hover:underline"
              >
                Clear results
              </button>
            </div>

            {results.length === 0 && (
              <div className="rounded-2xl border border-[#eadfe5] bg-white p-8 text-center">
                <h3 className="font-semibold text-[#392b36]">
                  No matching organisations found
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#766873]">
                  Try a different location, select other support categories,
                  or include matching organisations from other locations.
                </p>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {results.map((organisation) => (
                <article
                  key={organisation.id}
                  className="rounded-2xl border border-[#eadfe5] bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[#f4edf1] px-3 py-1 text-xs font-semibold text-[#70465f]">
                      Demo organisation
                    </span>
                    <span className="text-xs text-[#94838d]">
                      {organisation.verification_status}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-[#392b36]">
                    {organisation.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#766873]">
                    {organisation.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#946d81]">
                      Support offered
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {organisation.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-[#eadfe5] px-3 py-1.5 text-xs text-[#66545f]"
                        >
                          {supportOptions.find(
                            (option) => option.value === service
                          )?.label ?? service.replaceAll("_", " ")}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#eee5e9] pt-4">
                    <p className="text-sm font-medium text-[#392b36]">
                      {organisation.city}, {organisation.state}
                    </p>
                    <p className="mt-2 text-xs text-[#94838d]">
                      {organisation.latitude.toFixed(4)},{" "}
                      {organisation.longitude.toFixed(4)}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-[#a18e99]">
                      Contact details are not available for this fictional
                      demonstration entry.
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {notice && (
              <p className="rounded-xl bg-[#f8f1f5] p-4 text-xs leading-6 text-[#70465f]">
                {notice}
              </p>
            )}
          </section>
        )}
      </div>
    </AppShell>
  );
}