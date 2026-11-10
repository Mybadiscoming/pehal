// File: frontend/src/app/accountability/page.tsx

"use client";

import { FormEvent, useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

type CaseStatus =
  | "submitted"
  | "acknowledged"
  | "under_review"
  | "resolved"
  | "overdue";

type MilestoneStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "overdue";

type CaseRecord = {
  id: string;
  title: string;
  institution_name: string;
  complaint_date: string;
  reference_number: string | null;
  current_status: CaseStatus;
  description: string | null;
  created_at: string;
};

type Milestone = {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  date_source: string | null;
  status: MilestoneStatus;
  completed_date: string | null;
  update_note: string | null;
};

type FollowUp = {
  id: string;
  contact_date: string;
  contact_method: string;
  description: string;
  response_received: boolean;
  response_summary: string | null;
};

type CaseDetails = {
  case: CaseRecord;
  milestones: Milestone[];
  follow_ups: FollowUp[];
  overdue_milestones: number;
  next_due_date: string | null;
  notice: string;
};

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  acknowledged: "Acknowledged",
  under_review: "Under review",
  resolved: "Resolved",
  overdue: "Overdue",
  pending: "Pending",
  in_progress: "In progress",
  completed: "Completed",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[#eadfe5] bg-[#faf7f5] px-4 py-3 text-sm text-[#392b36] outline-none focus:border-[#946d81]";

function formatDate(value: string | null) {
  if (!value) return "Not specified";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Status({ value }: { value: string }) {
  const color =
    value === "completed" || value === "resolved"
      ? "bg-green-50 text-green-700"
      : value === "overdue"
        ? "bg-red-50 text-red-700"
        : value === "in_progress" || value === "under_review"
          ? "bg-blue-50 text-blue-700"
          : "bg-[#f4edf1] text-[#70465f]";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      {statusLabels[value] ?? value}
    </span>
  );
}

export default function AccountabilityPage() {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [details, setDetails] = useState<CaseDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showCaseForm, setShowCaseForm] = useState(false);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);

  async function apiRequest(path: string, options?: RequestInit) {
    const response = await fetch(`/api/accountability${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(body || `Request failed (${response.status})`);
    }

    if (response.status === 204) return null;

    return response.json();
  }

  async function loadCases(preferredId?: string) {
    setLoading(true);
    setError("");

    try {
      const data: CaseRecord[] = await apiRequest("/cases");
      setCases(data);

      const nextId =
        preferredId ||
        (data.some((item) => item.id === selectedId)
          ? selectedId
          : data[0]?.id);

      setSelectedId(nextId || "");

      if (nextId) {
        await loadDetails(nextId);
      } else {
        setDetails(null);
      }
    } catch {
      setError("Could not load cases. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  async function loadDetails(caseId: string) {
    try {
      const data: CaseDetails = await apiRequest(`/cases/${caseId}`);
      setDetails(data);
      setSelectedId(caseId);
    } catch {
      setError("Could not load the selected case.");
    }
  }

  useEffect(() => {
    void loadCases();
    // Initial load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createCase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const form = new FormData(event.currentTarget);

    try {
      const created: CaseRecord = await apiRequest("/cases", {
        method: "POST",
        body: JSON.stringify({
          title: form.get("title"),
          institution_name: form.get("institution_name"),
          complaint_date: form.get("complaint_date"),
          reference_number: form.get("reference_number") || null,
          current_status: form.get("current_status"),
          description: form.get("description") || null,
        }),
      });

      setShowCaseForm(false);
      setMessage("Case record created.");
      await loadCases(created.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create case.");
    } finally {
      setSaving(false);
    }
  }

  async function createMilestone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedId) return;

    setSaving(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const dueDate = form.get("due_date") as string;

    try {
      await apiRequest(`/cases/${selectedId}/milestones`, {
        method: "POST",
        body: JSON.stringify({
          title: form.get("title"),
          description: form.get("description") || null,
          due_date: dueDate || null,
          date_source: dueDate ? form.get("date_source") : null,
        }),
      });

      setShowMilestoneForm(false);
      setMessage("Milestone added.");
      await loadDetails(selectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add milestone.");
    } finally {
      setSaving(false);
    }
  }

  async function updateMilestone(
    milestone: Milestone,
    status: MilestoneStatus
  ) {
    if (!selectedId) return;

    setSaving(true);
    setError("");

    try {
      await apiRequest(
        `/cases/${selectedId}/milestones/${milestone.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status,
            completed_date:
              status === "completed"
                ? new Date().toLocaleDateString("en-CA")
                : null,
            update_note: milestone.update_note,
          }),
        }
      );

      setMessage("Milestone status updated.");
      await loadDetails(selectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update milestone.");
    } finally {
      setSaving(false);
    }
  }

  async function createFollowUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedId) return;

    setSaving(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const responseReceived = form.get("response_received") === "on";

    try {
      await apiRequest(`/cases/${selectedId}/follow-ups`, {
        method: "POST",
        body: JSON.stringify({
          contact_date: form.get("contact_date"),
          contact_method: form.get("contact_method"),
          description: form.get("description"),
          response_received: responseReceived,
          response_summary: form.get("response_summary") || null,
        }),
      });

      setShowFollowUpForm(false);
      setMessage("Follow-up recorded.");
      await loadDetails(selectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not record follow-up.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AppShell>
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#946d81]">
                Follow through matters
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-[#30232e]">
                Institutional Accountability Tracker
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#766873]">
                Keep a personal record of complaint milestones, expected
                updates, and follow-up communication in one place.
              </p>
            </div>

            <button
              onClick={() => setShowCaseForm(!showCaseForm)}
              className="rounded-full bg-[#70465f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#58364b]"
            >
              + Add case
            </button>
          </header>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-900">
              Important: Personal tracking tool
            </p>
            <p className="mt-2 text-sm leading-6 text-amber-800">
              This tracker stores information entered by the user. It does
              not connect to institutions, verify official case status, or
              independently confirm deadlines. The included demonstration
              case is fictional.
            </p>
          </div>

          {error && (
            <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div role="status" className="rounded-xl bg-green-50 p-4 text-sm text-green-800">
              {message}
            </div>
          )}

          {showCaseForm && (
            <form
              onSubmit={createCase}
              className="space-y-5 rounded-2xl border border-[#eadfe5] bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-[#392b36]">
                Create a case record
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-[#66545f]">
                  Case title *
                  <input name="title" required maxLength={150} className={inputClass} placeholder="e.g. Workplace complaint" />
                </label>

                <label className="text-sm font-medium text-[#66545f]">
                  Institution name *
                  <input name="institution_name" required maxLength={150} className={inputClass} placeholder="Institution or organisation" />
                </label>

                <label className="text-sm font-medium text-[#66545f]">
                  Complaint date *
                  <input name="complaint_date" type="date" required className={inputClass} />
                </label>

                <label className="text-sm font-medium text-[#66545f]">
                  Reference number
                  <input name="reference_number" maxLength={100} className={inputClass} placeholder="Optional" />
                </label>

                <label className="text-sm font-medium text-[#66545f]">
                  Current status
                  <select name="current_status" className={inputClass}>
                    <option value="submitted">Submitted</option>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="under_review">Under review</option>
                    <option value="resolved">Resolved</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm font-medium text-[#66545f]">
                Description
                <textarea name="description" maxLength={2000} rows={3} className={inputClass} placeholder="Optional notes for your personal record" />
              </label>

              <div className="flex gap-3">
                <button disabled={saving} className="rounded-full bg-[#70465f] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50">
                  {saving ? "Saving..." : "Save case"}
                </button>
                <button type="button" onClick={() => setShowCaseForm(false)} className="rounded-full border border-[#eadfe5] px-6 py-3 text-sm font-semibold text-[#66545f]">
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="rounded-2xl border border-[#eadfe5] bg-white p-10 text-center text-sm text-[#766873]">
              Loading your case records...
            </div>
          ) : cases.length === 0 ? (
            <div className="rounded-2xl border border-[#eadfe5] bg-white p-10 text-center">
              <h2 className="text-xl font-semibold text-[#392b36]">
                No case records yet
              </h2>
              <p className="mt-2 text-sm text-[#766873]">
                Add a personal case record to start tracking milestones and follow-ups.
              </p>
            </div>
          ) : (
            <>
              <section className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#eadfe5] bg-white p-5">
                  <p className="text-sm text-[#766873]">Total records</p>
                  <p className="mt-2 text-3xl font-semibold text-[#392b36]">{cases.length}</p>
                </div>
                <div className="rounded-2xl border border-[#eadfe5] bg-white p-5">
                  <p className="text-sm text-[#766873]">Overdue milestones</p>
                  <p className="mt-2 text-3xl font-semibold text-red-700">{details?.overdue_milestones ?? 0}</p>
                </div>
                <div className="rounded-2xl border border-[#eadfe5] bg-white p-5">
                  <p className="text-sm text-[#766873]">Next expected update</p>
                  <p className="mt-2 text-lg font-semibold text-[#392b36]">{formatDate(details?.next_due_date ?? null)}</p>
                </div>
              </section>

              <section className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-[#392b36]">
                    Your case records
                  </h2>

                  {cases.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setMessage("");
                        void loadDetails(item.id);
                      }}
                      className={`w-full rounded-2xl border p-5 text-left transition ${
                        selectedId === item.id
                          ? "border-[#946d81] bg-[#f8f1f5]"
                          : "border-[#eadfe5] bg-white hover:bg-[#faf7f5]"
                      }`}
                    >
                      <p className="font-semibold text-[#392b36]">{item.title}</p>
                      <p className="mt-2 text-sm text-[#766873]">{item.institution_name}</p>
                      <div className="mt-3">
                        <Status value={item.current_status} />
                      </div>
                      <p className="mt-3 text-xs text-[#94838d]">{item.id}</p>
                    </button>
                  ))}
                </div>

                {details && (
                  <div className="space-y-6">
                    <section className="rounded-2xl border border-[#eadfe5] bg-white p-6 md:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-[#946d81]">
                            Selected case
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold text-[#392b36]">
                            {details.case.title}
                          </h2>
                          <p className="mt-2 text-sm text-[#766873]">
                            {details.case.institution_name}
                          </p>
                        </div>
                        <Status value={details.case.current_status} />
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs text-[#94838d]">Complaint date</p>
                          <p className="mt-1 text-sm font-medium text-[#392b36]">{formatDate(details.case.complaint_date)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#94838d]">Reference number</p>
                          <p className="mt-1 text-sm font-medium text-[#392b36]">{details.case.reference_number || "Not provided"}</p>
                        </div>
                      </div>

                      {details.case.description && (
                        <p className="mt-5 text-sm leading-6 text-[#766873]">
                          {details.case.description}
                        </p>
                      )}
                    </section>

                    <section className="rounded-2xl border border-[#eadfe5] bg-white p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-[#392b36]">Case milestones</h3>
                          <p className="mt-1 text-sm text-[#766873]">Track expected and completed updates.</p>
                        </div>
                        <button onClick={() => setShowMilestoneForm(!showMilestoneForm)} className="rounded-full border border-[#d9c5d0] px-4 py-2 text-sm font-semibold text-[#70465f] hover:bg-[#f8f1f5]">
                          + Add milestone
                        </button>
                      </div>

                      {showMilestoneForm && (
                        <form onSubmit={createMilestone} className="mt-6 space-y-4 rounded-xl bg-[#faf7f5] p-5">
                          <label className="block text-sm font-medium text-[#66545f]">
                            Milestone title *
                            <input name="title" required maxLength={150} className={inputClass} placeholder="e.g. Investigation update" />
                          </label>
                          <label className="block text-sm font-medium text-[#66545f]">
                            Description
                            <textarea name="description" maxLength={1000} rows={2} className={inputClass} />
                          </label>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <label className="text-sm font-medium text-[#66545f]">
                              Expected date
                              <input name="due_date" type="date" className={inputClass} />
                            </label>
                            <label className="text-sm font-medium text-[#66545f]">
                              Date source
                              <select name="date_source" className={inputClass} defaultValue="institution_promise">
                                <option value="institution_promise">Institution promise</option>
                                <option value="official_deadline">Official deadline</option>
                                <option value="survivor_estimate">Personal estimate</option>
                              </select>
                            </label>
                          </div>
                          <div className="flex gap-3">
                            <button disabled={saving} className="rounded-full bg-[#70465f] px-5 py-2.5 text-sm font-semibold text-white">Save milestone</button>
                            <button type="button" onClick={() => setShowMilestoneForm(false)} className="text-sm text-[#766873]">Cancel</button>
                          </div>
                        </form>
                      )}

                      <div className="mt-6 space-y-5">
                        {details.milestones.length === 0 && (
                          <p className="text-sm text-[#766873]">No milestones recorded yet.</p>
                        )}

                        {details.milestones.map((milestone) => (
                          <div key={milestone.id} className="border-l-2 border-[#d9c5d0] pl-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="font-semibold text-[#392b36]">{milestone.title}</h4>
                              <Status value={milestone.status} />
                            </div>
                            {milestone.description && (
                              <p className="mt-2 text-sm leading-6 text-[#766873]">{milestone.description}</p>
                            )}
                            <p className="mt-2 text-xs text-[#94838d]">
                              Expected: {formatDate(milestone.due_date)}
                              {milestone.date_source && ` · ${milestone.date_source.replaceAll("_", " ")}`}
                            </p>
                            {milestone.completed_date && (
                              <p className="mt-1 text-xs text-green-700">
                                Completed: {formatDate(milestone.completed_date)}
                              </p>
                            )}
                            {milestone.update_note && (
                              <p className="mt-2 text-sm text-[#766873]">{milestone.update_note}</p>
                            )}
                            {milestone.status !== "completed" && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                <button disabled={saving} onClick={() => void updateMilestone(milestone, "in_progress")} className="rounded-full border border-[#eadfe5] px-3 py-1.5 text-xs font-semibold text-[#70465f] disabled:opacity-50">
                                  Mark in progress
                                </button>
                                <button disabled={saving} onClick={() => void updateMilestone(milestone, "completed")} className="rounded-full border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-700 disabled:opacity-50">
                                  Mark completed
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="rounded-2xl border border-[#eadfe5] bg-white p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-[#392b36]">Follow-up history</h3>
                          <p className="mt-1 text-sm text-[#766873]">Record communication and responses.</p>
                        </div>
                        <button onClick={() => setShowFollowUpForm(!showFollowUpForm)} className="rounded-full border border-[#d9c5d0] px-4 py-2 text-sm font-semibold text-[#70465f] hover:bg-[#f8f1f5]">
                          + Record follow-up
                        </button>
                      </div>

                      {showFollowUpForm && (
                        <form onSubmit={createFollowUp} className="mt-6 space-y-4 rounded-xl bg-[#faf7f5] p-5">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <label className="text-sm font-medium text-[#66545f]">
                              Contact date *
                              <input name="contact_date" type="date" required className={inputClass} />
                            </label>
                            <label className="text-sm font-medium text-[#66545f]">
                              Contact method *
                              <select name="contact_method" required className={inputClass}>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="in_person">In person</option>
                                <option value="written_letter">Written letter</option>
                                <option value="other">Other</option>
                              </select>
                            </label>
                          </div>
                          <label className="block text-sm font-medium text-[#66545f]">
                            What happened? *
                            <textarea name="description" required maxLength={2000} rows={3} className={inputClass} />
                          </label>
                          <label className="flex items-center gap-3 text-sm text-[#66545f]">
                            <input name="response_received" type="checkbox" className="h-4 w-4 accent-[#70465f]" />
                            A response was received
                          </label>
                          <label className="block text-sm font-medium text-[#66545f]">
                            Response summary
                            <textarea name="response_summary" maxLength={2000} rows={2} className={inputClass} />
                          </label>
                          <div className="flex gap-3">
                            <button disabled={saving} className="rounded-full bg-[#70465f] px-5 py-2.5 text-sm font-semibold text-white">Save follow-up</button>
                            <button type="button" onClick={() => setShowFollowUpForm(false)} className="text-sm text-[#766873]">Cancel</button>
                          </div>
                        </form>
                      )}

                      <div className="mt-6 space-y-4">
                        {details.follow_ups.length === 0 && (
                          <p className="text-sm text-[#766873]">No follow-ups recorded yet.</p>
                        )}
                        {details.follow_ups.map((followUp) => (
                          <div key={followUp.id} className="rounded-xl bg-[#faf7f5] p-4">
                            <div className="flex flex-wrap justify-between gap-2">
                              <p className="text-sm font-semibold text-[#392b36]">
                                {followUp.contact_method.replaceAll("_", " ")}
                              </p>
                              <p className="text-xs text-[#94838d]">{formatDate(followUp.contact_date)}</p>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-[#66545f]">{followUp.description}</p>
                            <p className="mt-3 text-xs font-semibold text-[#70465f]">
                              {followUp.response_received ? "Response received" : "No response recorded"}
                            </p>
                            {followUp.response_summary && (
                              <p className="mt-2 text-sm text-[#766873]">{followUp.response_summary}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="rounded-2xl border border-[#eadfe5] bg-[#faf7f5] p-5">
                      <p className="text-sm leading-7 text-[#766873]">{details.notice}</p>
                    </section>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </AppShell>
    </div>
  );
}