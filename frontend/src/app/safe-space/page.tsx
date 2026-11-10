// File: frontend/src/app/safe-space/page.tsx

"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  session_id: string;
  reply: string;
  conversation_history: Message[];
};

const starters = [
  "I need someone to listen.",
  "I'm not sure what my options are.",
  "I want to understand where I can get support.",
  "I'm feeling overwhelmed.",
];

export default function SafeSpacePage() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id = sessionStorage.getItem("pehal-safe-space-session");

    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("pehal-safe-space-session", id);
    }

    setSessionId(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function sendMessage(
    event?: FormEvent<HTMLFormElement>,
    suggestedMessage?: string
  ) {
    event?.preventDefault();

    const message = (suggestedMessage ?? input).trim();

    if (!message || sending || !sessionId) return;

    setInput("");
    setError("");
    setSending(true);

    setMessages((previous) => [
      ...previous,
      { role: "user", content: message },
    ]);

    try {
      const response = await fetch("/api/safe-space/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `The service returned an error (${response.status}).`
        );
      }

      const data: ChatResponse = await response.json();

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(
        "We couldn't connect to the support service. Please check that the Pehal backend is running and try again."
      );
    } finally {
      setSending(false);
    }
  }

  function startNewConversation() {
    const newId = crypto.randomUUID();

    sessionStorage.setItem("pehal-safe-space-session", newId);
    setSessionId(newId);
    setMessages([]);
    setInput("");
    setError("");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#946d81]">
              Pehal support space
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[#30232e]">
              Safe Space Companion
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#766873]">
              A space to express yourself, explore your thoughts, and
              understand possible support options at your own pace.
            </p>
          </div>

          <button
            onClick={startNewConversation}
            disabled={sending}
            className="rounded-full border border-[#d9c5d0] px-5 py-2.5 text-sm font-semibold text-[#70465f] transition hover:bg-[#f8f1f5] disabled:opacity-50"
          >
            + New conversation
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#eadfe5] bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#eee5e9] px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eee5e9] text-lg text-[#70465f]">
              P
            </div>

            <div>
              <h2 className="font-semibold text-[#392b36]">
                Pehal Companion
              </h2>
              <p className="text-xs text-[#94838d]">
                Supportive conversation space
              </p>
            </div>

            <span className="ml-auto rounded-full bg-[#f4edf1] px-3 py-1 text-xs font-medium text-[#80566d]">
              Private session
            </span>
          </div>

          <div className="min-h-[420px] max-h-[600px] space-y-5 overflow-y-auto bg-[#fcfafb] p-5 sm:p-7">
            {messages.length === 0 && (
              <div className="mx-auto max-w-xl py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eee5e9] text-2xl text-[#70465f]">
                  P
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#392b36]">
                  You can start wherever you feel comfortable.
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#766873]">
                  You don't have to explain everything, and you don't
                  have to share anything you're uncomfortable sharing.
                  What would you like to talk about?
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-2">
                  {starters.map((starter) => (
                    <button
                      key={starter}
                      onClick={() => sendMessage(undefined, starter)}
                      disabled={!sessionId || sending}
                      className="rounded-full border border-[#e5d5de] bg-white px-4 py-2.5 text-sm text-[#70465f] transition hover:border-[#b995a8] hover:bg-[#f8f1f5] disabled:opacity-50"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-5 py-4 sm:max-w-[78%] ${
                    message.role === "user"
                      ? "rounded-br-md bg-[#70465f] text-white"
                      : "rounded-bl-md border border-[#eadfe5] bg-white text-[#493b46]"
                  }`}
                >
                  <p className="mb-2 text-xs font-semibold opacity-70">
                    {message.role === "user" ? "You" : "Pehal Companion"}
                  </p>

                  <p className="whitespace-pre-wrap text-sm leading-7">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-[#eadfe5] bg-white px-5 py-4">
                  <p className="text-sm text-[#806d79]">
                    Pehal Companion is thinking...
                  </p>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {error && (
            <div
              role="alert"
              className="border-t border-red-100 bg-red-50 px-6 py-4 text-sm leading-6 text-red-800"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={(event) => sendMessage(event)}
            className="border-t border-[#eee5e9] bg-white p-4 sm:p-5"
          >
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Write whatever feels comfortable..."
                rows={2}
                maxLength={5000}
                disabled={sending || !sessionId}
                className="min-h-[55px] flex-1 resize-none rounded-2xl border border-[#eadfe5] bg-[#faf7f5] px-4 py-3 text-sm leading-6 text-[#392b36] outline-none transition placeholder:text-[#a18e99] focus:border-[#946d81] disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!input.trim() || sending || !sessionId}
                className="rounded-full bg-[#70465f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#58364b] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-[#a18e99]">
                Enter to send · Shift + Enter for a new line
              </p>
              <p className="text-xs text-[#a18e99]">
                {input.length}/5000
              </p>
            </div>
          </form>
        </div>

        <div className="mt-5 rounded-2xl border border-[#eadfe5] bg-[#f7edf1] p-5">
          <h3 className="text-sm font-semibold text-[#70465f]">
            Your safety comes first
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#766873]">
            Pehal is a prototype, not an emergency service or a
            substitute for professional support. If you are in
            immediate danger in India, call 112 for emergency
            assistance. You do not need to share identifying
            information here.
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-[#a18e99]">
          Want to explore other kinds of support?{" "}
          <Link
            href="/dashboard"
            className="font-semibold text-[#70465f] hover:underline"
          >
            Return to your overview
          </Link>
        </p>
      </div>
    </AppShell>
  );
}