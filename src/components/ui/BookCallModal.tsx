"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type SyntheticEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import HoverFlipText from "@/components/ui/HoverFlipText";
import { getLenisInstance } from "@/lib/lenis";

const BookCallModalContext = createContext<{ open: () => void } | null>(null);

export function useBookCallModal() {
  const ctx = useContext(BookCallModalContext);
  if (!ctx) {
    throw new Error("useBookCallModal must be used within BookCallModalProvider");
  }
  return ctx;
}

const timeSlots = [
  "Morning (9am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–7pm)",
];

type Status = "idle" | "sending" | "sent" | "error";

export function BookCallModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    // Stop Lenis virtual smooth scrolling
    const lenis = getLenisInstance();
    lenis?.stop();

    // Lock background in place with position: fixed
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
      lenis?.start();
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    setStatus("idle");
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    try {
      const res = await fetch("/api/strategy-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          preferredTime: data.get("preferredTime"),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <BookCallModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overscroll-contain"
            data-lenis-prevent
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="book-call-heading"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative max-h-[calc(100dvh-2rem)] sm:max-h-[90vh] w-full max-w-lg overflow-y-auto overscroll-contain border border-grey-1 bg-grey-2 p-8 md:p-10 shadow-2xl custom-scrollbar"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={close}
                className="absolute right-6 top-6 text-light-grey transition-colors hover:text-white"
              >
                <X size={20} />
              </button>

              {status === "sent" ? (
                <>
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
                    Book A Strategy Call
                  </p>

                  <h2 className="bebas mb-4 text-3xl uppercase text-white sm:text-4xl">
                    Request Sent.
                  </h2>

                  <p className="text-sm text-light-grey">
                    Thanks — we'll reach out shortly to confirm a time.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
                    Book A Strategy Call
                  </p>

                  <h2
                    id="book-call-heading"
                    className="bebas mb-4 text-3xl uppercase text-white sm:text-4xl"
                  >
                    Let's Talk
                    <span className="block text-bt-red">Growth.</span>
                  </h2>

                  <p className="mb-8 text-sm text-light-grey">
                    Good ideas deserve the right team behind them. Tell us
                    what's on your mind, and let's start a conversation.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="book-name"
                          className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
                        >
                          Name<span className="text-bt-red"> *</span>
                        </label>

                        <input
                          id="book-name"
                          name="name"
                          type="text"
                          required
                          className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="book-email"
                          className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
                        >
                          Email<span className="text-bt-red"> *</span>
                        </label>

                        <input
                          id="book-email"
                          name="email"
                          type="email"
                          required
                          className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="book-company"
                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
                      >
                        Company
                      </label>

                      <input
                        id="book-company"
                        name="company"
                        type="text"
                        className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="book-time"
                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
                      >
                        Preferred Time
                      </label>

                      <select
                        id="book-time"
                        name="preferredTime"
                        defaultValue=""
                        className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
                      >
                        <option value="" disabled>
                          Select a time slot
                        </option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-bt-red">
                        Something went wrong sending your request. Please try
                        again or email us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-brand w-full bg-bt-red text-white disabled:opacity-60"
                    >
                      <HoverFlipText
                        text={status === "sending" ? "Sending…" : "Request Call →"}
                      />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookCallModalContext.Provider>
  );
}
