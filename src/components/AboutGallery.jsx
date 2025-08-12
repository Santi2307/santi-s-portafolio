// src/components/AboutGallery.jsx
import { useEffect, useMemo, useState } from "react";

export default function AboutGallery({
  images = [
    "/about/me1.jpg",
    "/about/me2.jpg",
    "/about/me3.jpg",
    "/about/me4.jpg", // <-- 4 imágenes
  ],
  intervalMs = 4000,
  maxHeight = 420, // limita crecimiento para que no aparezca “gigante”
  className = "",
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ratios, setRatios] = useState([]); // "w / h"

  useEffect(() => {
    let mounted = true;
    Promise.all(
      images.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () =>
              resolve({ w: img.naturalWidth || 1, h: img.naturalHeight || 1 });
            img.onerror = () => resolve({ w: 16, h: 10 }); // fallback
            img.src = src;
          })
      )
    ).then((dims) => {
      if (!mounted) return;
      setRatios(dims.map(({ w, h }) => `${w} / ${h}`));
    });
    return () => {
      mounted = false;
    };
  }, [images]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [paused, images.length, intervalMs]);

  const currentRatio = useMemo(
    () => (ratios.length === images.length ? ratios[i] : "16 / 10"),
    [ratios, images.length, i]
  );

  const prev = () => setI((v) => (v - 1 + images.length) % images.length);
  const next = () => setI((v) => (v + 1) % images.length);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        style={{ aspectRatio: currentRatio, maxHeight: `${maxHeight}px` }}
        className="relative w-full overflow-hidden rounded-2xl border bg-background/60 backdrop-blur ring-1 ring-white/5 shadow-[0_0_20px_rgba(124,58,237,0.06)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Photo ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/1200x800?text=Photo";
            }}
          />
        ))}

        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-black/35 text-white backdrop-blur hover:bg-black/55"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-black/35 text-white backdrop-blur hover:bg-black/55"
        >
          ›
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Ir a foto ${idx + 1}`}
              className={`h-1.5 w-5 rounded-full transition ${
                i === idx ? "bg-violet-500" : "bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
