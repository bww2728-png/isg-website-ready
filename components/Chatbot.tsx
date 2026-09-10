"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatClientState, ChatServerResult } from "@/lib/assistant/engine";
import { initialChatState } from "@/lib/assistant/engine";

type ChatMessage = {
  from: "bot" | "user";
  paragraphs: string[];
  links?: { label: string; href: string }[];
  chips?: { label: string; message: string }[];
};

type SubmitPayload = { name: string; email: string; stage: string; challenge: string };

const STORAGE_KEY = "isg-chat-state";

function loadState(): ChatClientState {
  if (typeof window === "undefined") return initialChatState;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initialChatState;
    const parsed = JSON.parse(raw) as ChatClientState;
    if (!parsed || typeof parsed !== "object" || !parsed.lead) return initialChatState;
    return parsed;
  } catch {
    return initialChatState;
  }
}

function saveState(state: ChatClientState) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // التخزين اختياري فقط لاستمرار المحادثة داخل الجلسة
  }
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chips, setChips] = useState<{ label: string; message: string }[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatState = useRef<ChatClientState>(initialChatState);
  const welcomed = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    chatState.current = loadState();
    const timer = window.setTimeout(() => setPulse(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return;
    setPulse(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;
      setError(null);
      setBusy(true);
      setInput("");
      setMessages((prev) => [...prev, { from: "user", paragraphs: [trimmed] }]);
      setChips([]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, state: chatState.current }),
        });
        const data = (await res.json()) as
          | ({ ok: true } & ChatServerResult)
          | { ok: false; message?: string };

        if (!("ok" in data) || data.ok !== true) {
          setError(data.message ?? "تعذر إرسال الرسالة، يرجى المحاولة مجدداً.");
          return;
        }

        chatState.current = data.state;
        saveState(data.state);
        setMessages((prev) => [
          ...prev,
          { from: "bot", paragraphs: data.paragraphs, links: data.links },
        ]);
        setChips(data.chips ?? []);

        if (data.submit) {
          const payload: SubmitPayload & { consent: boolean; website: string } = {
            ...data.submit,
            consent: true,
            website: "",
          };
          const contactRes = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const contactData = (await contactRes.json()) as {
            ok?: boolean;
            referenceId?: number | null;
          };
          if (contactRes.ok && contactData.ok) {
            const ref =
              contactData.referenceId != null ? ` رقم طلبك المرجعي: #${contactData.referenceId}.` : "";
            setMessages((prev) => [
              ...prev,
              {
                from: "bot",
                paragraphs: [
                  `تم إرسال طلبك بنجاح.${ref} سيتواصل معك فريق ISG على بريدك في أقرب وقت.`,
                ],
              },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                from: "bot",
                paragraphs: [
                  "تعذر إرسال الطلب الآن. يمكنك التواصل مباشرة عبر صفحة التواصل أو واتساب، وسنكون سعیديين بمساعدتك.",
                ],
                links: [{ label: "صفحة التواصل", href: "/contact" }],
              },
            ]);
          }
          setChips([]);
        }
      } catch {
        setError("حدث خطأ في الاتصال. تحقق من الشبكة وحاول مجدداً.");
      } finally {
        setBusy(false);
      }
    },
    [busy],
  );

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next && !welcomed.current) {
        welcomed.current = true;
        void send("");
      }
      if (next) {
        window.setTimeout(() => inputRef.current?.focus(), 250);
      }
      return next;
    });
  }, [send]);

  return (
    <div className={`chat-root${open ? " open" : ""}`}>
      <div
        className="chat-panel"
        role="dialog"
        aria-label="محادثة مساعد ISG الإلكتروني"
        aria-hidden={!open}
      >
        <div className="chat-header">
          <span className="chat-header-dot" aria-hidden="true" />
          <div>
            <p className="chat-header-title">مساعد ISG</p>
            <p className="chat-header-sub">يجيب من محتوى الموقع — بدون تخمين</p>
          </div>
        </div>

        <div className="chat-messages" ref={scrollRef} aria-live="polite">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.from}`}>
              {msg.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {msg.links?.length ? (
                <div className="chat-msg-links">
                  {msg.links.map((link) => (
                    <a key={link.href + link.label} className="chat-link" href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {busy ? (
            <div className="chat-msg bot chat-typing" aria-label="المساعد يكتب">
              <span />
              <span />
              <span />
            </div>
          ) : null}
        </div>

        {chips.length ? (
          <div className="chat-msg-links" style={{ padding: "0.5rem 0.75rem 0" }}>
            {chips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                className="chat-link"
                style={{ background: "none", cursor: "pointer", fontFamily: "inherit" }}
                disabled={busy}
                onClick={() => void send(chip.message)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        ) : null}

        {error ? <p className="chat-error-note" style={{ margin: "0.4rem 0.75rem 0" }}>{error}</p> : null}

        <form
          className="chat-input-row"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <input
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب سؤالك هنا..."
            maxLength={1000}
            aria-label="رسالتك إلى مساعد ISG"
            disabled={busy}
          />
          <button type="submit" className="chat-send" disabled={busy || !input.trim()}>
            إرسال
          </button>
        </form>
      </div>

      <button
        type="button"
        className={`chat-fab${pulse && !open ? " pulse" : ""}`}
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "إغلاق المحادثة" : "افتح المحادثة مع مساعد ISG"}
      >
        <svg className="chat-fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <svg className="chat-fab-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
