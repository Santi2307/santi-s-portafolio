// src/components/ContactSection.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Mail, Phone, MapPin, Linkedin, Github, Instagram,
  Send, Check, AlertCircle, Copy, Loader2, ShieldCheck, Sparkles
} from "lucide-react";

/** 1) Consigue tu endpoint en https://formspree.io  */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkgzenep";

/* helpers */
const emailRx = /^\S+@\S+\.\S+$/;
const clamp = (n, mi, ma) => Math.max(mi, Math.min(ma, n));

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", honey: "" });
  const [state, setState] = useState({ sending: false, ok: null, error: "" });
  const [copied, setCopied] = useState(false);
  const liveRef = useRef(null);

  const chars = form.message.length;
  const maxChars = 1000;
  const msgProgress = useMemo(() => Math.round((clamp(chars, 0, maxChars) / maxChars) * 100), [chars]);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (form.honey) return "Bot detection triggered.";
    if (form.name.trim().length < 2) return "Please enter your name.";
    if (!emailRx.test(form.email)) return "Please enter a valid email.";
    if (form.message.trim().length < 10) return "Write at least 10 characters.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setState({ sending: false, ok: null, error: v });

    try {
      setState({ sending: true, ok: null, error: "" });

      // ✅ FormData funciona out-of-the-box con Formspree
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("subject", form.subject || `New portfolio contact from ${form.name}`);
      fd.append("message", form.message);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Failed to send. Try again later.");

      setState({ sending: false, ok: true, error: "" });
      setForm({ name: "", email: "", subject: "", message: "", honey: "" });
    } catch (err) {
      setState({ sending: false, ok: false, error: err.message || "Error sending message." });
    }
  };

  useEffect(() => {
    if (!liveRef.current) return;
    if (state.error) liveRef.current.textContent = state.error;
    if (state.ok) liveRef.current.textContent = "Message sent. Thanks!";
  }, [state]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("santiagodelgadosanchez9@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 lg:pb-14"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-[clamp(1.75rem,4.5vw,2.5rem)] font-extrabold mb-3 inline-flex items-center gap-2">
            Get In <span className="text-violet-400">Touch</span>
            <Sparkles className="h-6 w-6 text-violet-400 animate-pulse-subtle" />
          </h2>
          <p className="opacity-80 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;m always open to new opportunities.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] items-start">
          {/* Left: Contact info */}
          <aside className="space-y-6">
            <h3 className="text-xl font-semibold">Contact Information</h3>

            <InfoRow
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              value="santiagodelgadosanchez9@gmail.com"
              href="mailto:santiagodelgadosanchez9@gmail.com"
            >
              <button
                onClick={copyEmail}
                className="ml-2 inline-flex items-center gap-1 text-xs rounded-full border px-2 py-1 hover:bg-foreground/5 transition"
                title="Copy email"
                type="button"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </InfoRow>

            <InfoRow
              icon={<Phone className="h-5 w-5" />}
              title="Phone"
              value="+1 (437) 661-6843"
              href="tel:+14376616843"
            />
            <InfoRow
              icon={<MapPin className="h-5 w-5" />}
              title="Location"
              value="Toronto, ON, Canada"
            />

            <div className="pt-4">
              <p className="mb-3 font-medium">Connect With Me</p>
              <div className="flex items-center gap-3">
                <Social href="https://www.linkedin.com/in/santiagodelgado23" label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Social>
                <Social href="https://github.com/Santi2307/" label="GitHub">
                  <Github className="h-5 w-5" />
                </Social>
                <Social href="https://www.instagram.com/santidelgado2004" label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Social>
              </div>

              <div className="mt-6 rounded-xl border p-4 bg-background/60">
                <p className="text-sm opacity-80">
                  Prefer email? Use{" "}
                  <a className="underline" href="mailto:santiagodelgadosanchez9@gmail.com">
                    santiagodelgadosanchez9@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </aside>

          {/* Right: Form card */}
          <div
            className="
              relative isolate rounded-2xl border bg-background/60 backdrop-blur p-5 sm:p-6
              shadow-[0_0_30px_rgba(124,58,237,0.10)] ring-1 ring-white/5
              before:pointer-events-none before:absolute before:-inset-px before:rounded-2xl
              before:bg-[conic-gradient(at_top_right,_theme(colors.violet.500)_0%,_transparent_30%,_transparent_70%,_theme(colors.violet.500)_100%)]
              before:opacity-0 hover:before:opacity-30 before:transition
            "
          >
            <h3 className="text-lg font-semibold text-center mb-4 inline-flex items-center gap-2 justify-center">
              <ShieldCheck className="h-5 w-5 text-violet-400" />
              Send a Message
            </h3>

            {/* aria-live for feedback */}
            <p ref={liveRef} className="sr-only" aria-live="polite" />

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Honey-pot anti-spam (oculto) */}
              <input
                type="text"
                name="honey"
                value={form.honey}
                onChange={onChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <Field label="Your Name" required>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  aria-invalid={form.name && form.name.trim().length < 2}
                  className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40 caret-violet-500"
                  placeholder="Sam Smith"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Your Email" required>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    aria-invalid={form.email && !emailRx.test(form.email)}
                    className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40 caret-violet-500"
                    placeholder="sam.smith@gmail.com"
                  />
                </Field>
                <Field label="Subject">
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40 caret-violet-500"
                    placeholder="I'm not a robot"
                  />
                </Field>
              </div>

              <Field label={`Your Message (${chars}/${maxChars})`} required>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={6}
                  maxLength={maxChars}
                  className="w-full resize-y rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40 caret-violet-500"
                  placeholder="Hello, I'd like to talk about..."
                />
                <div className="mt-1 h-1 w-full rounded bg-foreground/10 overflow-hidden">
                  <div
                    className="h-full bg-violet-500/70 transition-[width]"
                    style={{ width: `${msgProgress}%` }}
                  />
                </div>
              </Field>

              {/* Estado */}
              {state.error && (
                <p className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {state.error}
                </p>
              )}
              {state.ok && (
                <p className="flex items-center gap-2 text-sm text-emerald-400">
                  <Check className="h-4 w-4" /> Thanks! I&apos;ll get back to you soon.
                </p>
              )}

              <button
                type="submit"
                disabled={state.sending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 text-white px-6 py-3
                           hover:bg-violet-500 active:scale-[.98] transition disabled:opacity-60"
              >
                {state.sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send Message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— subcomponentes ——— */
function InfoRow({ icon, title, value, href, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid place-items-center h-10 w-10 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-sm opacity-80">{title}</p>
        {href ? (
          <a href={href} className="font-medium hover:underline">{value}</a>
        ) : (
          <p className="font-medium">{value}</p>
        )}
        {children}
      </div>
    </div>
  );
}

function Field({ label, required = false, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm opacity-70">
        {label} {required && <span className="text-red-400">*</span>}
      </span>
      {children}
    </label>
  );
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-foreground/5 transition"
      title={label}
    >
      {children}
    </a>
  );
}
