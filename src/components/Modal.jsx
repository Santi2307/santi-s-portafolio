import { useEffect } from "react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-[92vw] max-w-3xl rounded-2xl border bg-background/90 backdrop-blur p-6 ring-1 ring-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-md border px-2 py-1 text-sm opacity-80 hover:opacity-100"
        >
          Close
        </button>
        {title && <h3 className="text-xl font-bold mb-3">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
