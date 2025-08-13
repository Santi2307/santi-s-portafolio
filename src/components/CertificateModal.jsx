import { X, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export default function CertificateModal({ open, onClose, cert }) {
  if (!open || !cert) return null;

  useEffect(() => {
    // bloquear scroll del body mientras el modal está abierto
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div
        className="group relative w-full max-w-3xl max-h-[85vh] overflow-y-auto
                   rounded-2xl bg-background/95 border border-violet-500/30
                   shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Borde morado luminoso */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl
                     bg-[conic-gradient(from_0deg,theme(colors.violet.500),theme(colors.fuchsia.500),theme(colors.violet.500))]
                     opacity-50 blur-md animate-spin-slow group-hover:opacity-80 transition-opacity"
        />

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center
                     rounded-full bg-foreground/10 hover:bg-foreground/20 transition"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Imagen */}
        <div className="relative">
          {imgOk ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full aspect-[16/9] object-contain bg-foreground/5"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="w-full aspect-[16/9] grid place-items-center bg-foreground/5">
              <div className="h-10 w-10 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="relative p-5 sm:p-6">
          <h3 className="text-xl font-semibold mb-1">{cert.title}</h3>
          <div className="text-sm opacity-80 mb-4">
            <div><span className="opacity-70">Issuer:</span> {cert.issuer}</div>
            <div><span className="opacity-70">Date:</span> {cert.date}</div>
          </div>

          <p className="opacity-90 leading-relaxed mb-4">{cert.description}</p>

          {cert.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {cert.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-3 py-1 text-xs opacity-80"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2
                           bg-violet-600 text-white hover:bg-violet-500 transition
                           shadow-[0_0_18px_rgba(139,92,246,0.35)]"
              >
                Verify <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {cert.pdf && (
              <a
                href={cert.pdf}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border px-4 py-2 hover:bg-foreground/5 transition"
              >
                View PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
