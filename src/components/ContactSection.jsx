import { useState } from "react";
import {
  Mail, Phone, MapPin, Linkedin, Github, Instagram, Twitch, Send
} from "lucide-react";

/**
 * Para que el formulario FUNCIONE:
 * 1) Crea un form en https://formspree.io (gratuito).
 * 2) Copia el endpoint, por ej: https://formspree.io/f/abcdwxyz
 * 3) Pégalo en FORMSPREE_ENDPOINT abajo.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REEMPLAZA_AQUI"; // <- cambia esto

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState({ sending: false, ok: null, error: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (form.name.trim().length < 2) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (form.message.trim().length < 10) return "Write at least 10 characters.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setState({ sending: false, ok: null, error: v });

    try {
      setState({ sending: true, ok: null, error: "" });
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send. Try again later.");
      setState({ sending: false, ok: true, error: "" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setState({ sending: false, ok: false, error: err.message || "Error sending message." });
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-[clamp(1.75rem,4.5vw,2.5rem)] font-extrabold mb-3">
            Get In <span className="text-violet-400">Touch</span>
          </h2>
          <p className="opacity-80 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out.
            I&apos;m always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contact Information</h3>

            <InfoRow
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              value="santiagodelgadosanchez9@gmail.com"
              href="mailto:santiagodelgadosanchez9@gmail.com"
            />
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
                <Social href="https://twitch.tv/" label="Twitch">
                  <Twitch className="h-5 w-5" />
                </Social>
              </div>
            </div>
          </div>

          {/* Right: Form card */}
          <div className="rounded-2xl border bg-background/60 backdrop-blur p-5 sm:p-6 shadow-[0_0_30px_rgba(124,58,237,0.06)]">
            <h3 className="text-lg font-semibold text-center mb-4">Send a Message</h3>
            <form onSubmit={onSubmit} className="space-y-4">
              <Field label="Your Name">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="Santiago"
                />
              </Field>
              <Field label="Your Email">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="santiago@example.com"
                />
              </Field>
              <Field label="Your Message">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  className="w-full resize-y rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="Hello, I'd like to talk about..."
                />
              </Field>

              {/* Estado */}
              {state.error && (
                <p className="text-sm text-red-400">{state.error}</p>
              )}
              {state.ok && (
                <p className="text-sm text-emerald-400">Thanks! I&apos;ll get back to you soon.</p>
              )}

              <button
                type="submit"
                disabled={state.sending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 text-white px-6 py-3
                           hover:bg-violet-500 transition disabled:opacity-60"
              >
                {state.sending ? "Sending…" : "Send Message"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— subcomponentes ——— */
function InfoRow({ icon, title, value, href }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid place-items-center h-10 w-10 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
        {icon}
      </span>
      <div>
        <p className="text-sm opacity-80">{title}</p>
        {href ? (
          <a href={href} className="font-medium hover:underline">{value}</a>
        ) : (
          <p className="font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm opacity-70">{label}</span>
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
