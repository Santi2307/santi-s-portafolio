import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Download, Search, Sparkles } from "lucide-react";
import CertificateModal from "./CertificateModal.jsx";

/** DATA — añade más si quieres */
const CERTS = [
  {
    id: "aws",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "October 2023",
    image: "/certs/aws.webp",
    description:
      "Foundational certification covering AWS services, pricing, security and architecture.",
    tags: ["cloud", "aws", "security"],
    verifyUrl: "https://verification.link/aws",
    pdf: "/certs/aws.pdf",
  },
  {
    id: "meta-fe",
    title: "Front-End Developer",
    issuer: "Meta",
    date: "May 2024",
    image: "/certs/meta-fe.webp",
    description:
      "Certification focused on modern front-end stacks, accessibility and performance.",
    tags: ["frontend", "react", "accessibility"],
    verifyUrl: "https://verification.link/meta",
  },
];

/** filtros bonitas */
const FILTERS = [
  { id: "all", label: "All" },
  { id: "cloud", label: "Cloud" },
  { id: "frontend", label: "Frontend" },
  { id: "security", label: "Security" },
];

export default function CertificationsSection() {
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const current = CERTS.find((c) => c.id === openId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CERTS.filter((c) => {
      const matchesText =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || c.tags.includes(filter);
      return matchesText && matchesFilter;
    });
  }, [query, filter]);

  /** reveal-on-scroll */
  const gridRef = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      className="scroll-mt-24 pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 [caret-color:transparent]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="text-center mb-8">
          <h2 className="text-[clamp(1.75rem,4.5vw,2.5rem)] font-extrabold mb-2">
            My <span className="text-violet-400">Certifications</span>
          </h2>
          <p className="opacity-80 max-w-2xl mx-auto">
            A few credentials I&apos;m proud of. Click a card for details.
          </p>
        </div>

        {/* controls */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-2 bg-background/60 border rounded-full px-3 py-2 w-full sm:max-w-md">
            <Search className="h-4 w-4 opacity-60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, issuer, or description…"
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`text-sm rounded-full border px-3 py-1.5 transition
                  ${filter === f.id ? "bg-violet-600 text-white border-violet-600" : "hover:bg-foreground/5"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm opacity-70">
            <Sparkles className="h-4 w-4" />
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* grid */}
        <div
          ref={gridRef}
          className={`grid gap-6 sm:grid-cols-2 transition-all duration-700
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          {filtered.map((c) => (
            <CertCard key={c.id} cert={c} onOpen={() => setOpenId(c.id)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <CertificateModal open={!!openId} onClose={() => setOpenId(null)} cert={current} />
    </section>
  );
}

/* ---------- Card con tilt + acciones ---------- */
function CertCard({ cert, onOpen }) {
  const cardRef = useRef(null);

  function handleMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    const rotX = (y / (r.height / 2)) * -4;
    const rotY = (x / (r.width / 2)) * 4;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
  }
  function resetTilt() {
    const el = cardRef.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="
        group relative overflow-hidden rounded-2xl border bg-background/60 p-4
        ring-1 ring-white/5 transition will-change-transform
        hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]
      "
    >
      {/* glowing border on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl
                   bg-[conic-gradient(at_top_right,_theme(colors.violet.500)_0%,_transparent_30%,_transparent_70%,_theme(colors.violet.500)_100%)]
                   opacity-0 group-hover:opacity-30 blur-lg transition"
      />

      <div className="relative flex items-center gap-4">
        <img
          src={cert.image}
          alt={cert.title}
          className="h-16 w-16 rounded-lg object-cover bg-foreground/5"
          loading="lazy"
        />
        <div className="min-w-0">
          <h3 className="font-semibold truncate">{cert.title}</h3>
          <p className="text-sm opacity-80 truncate">{cert.issuer} • {cert.date}</p>
        </div>
      </div>

      <p className="relative mt-3 text-sm opacity-80 line-clamp-2">{cert.description}</p>

      <div className="relative mt-3 flex flex-wrap gap-2">
        {cert.tags.map((t) => (
          <span key={t} className="rounded-full border px-2 py-0.5 text-xs opacity-80 capitalize">{t}</span>
        ))}
      </div>

      {/* actions */}
      <div className="relative mt-4 flex items-center gap-2">
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm hover:bg-foreground/5 transition"
          title="Verify certificate"
        >
          Verify <ExternalLink className="h-3.5 w-3.5" />
        </a>

        {cert.pdf && (
          <a
            href={cert.pdf}
            className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm hover:bg-foreground/5 transition"
            title="Download PDF"
            download
          >
            PDF <Download className="h-3.5 w-3.5" />
          </a>
        )}

        <button
          onClick={onOpen}
          className="ml-auto inline-flex items-center gap-1 rounded-full bg-violet-600 text-white px-3 py-1.5 text-sm
                     hover:bg-violet-500 active:scale-[.98] transition"
          title="More details"
        >
          Details
          <Sparkles className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
