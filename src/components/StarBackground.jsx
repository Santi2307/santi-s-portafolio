import { useEffect, useState } from "react";

export default function StarBackground() {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  // Estrellas según área de pantalla
  useEffect(() => {
    const generate = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 10000);
      const arr = Array.from({ length: count }, (_, i) => ({
        id: `s-${i}`,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 4 + 2,
      }));
      setStars(arr);
    };
    generate();
    window.addEventListener("resize", generate, { passive: true });
    return () => window.removeEventListener("resize", generate);
  }, []);

  // Meteoros adaptativos (pantalla completa)
  useEffect(() => {
    let alive = true;
    let t;

    const rand = (a, b) => Math.random() * (b - a) + a;

    const spawn = () => {
      if (!alive) return;
      const vw = window.innerWidth, vh = window.innerHeight;
      const diag = Math.hypot(vw, vh);
      const isMobile = vw < 480;

      const m = {
        id: `m-${Math.random().toString(36).slice(2)}`,
        left: rand(70, 110),            // %  (fuera/edge derecha)
        top: rand(-15, 65),             // %  (parte alta)
        length: isMobile ? rand(60,120) : rand(90,220),
        thickness: isMobile ? 1.5 : 2,
        duration: isMobile ? rand(1.2,2.2) : rand(2.0,3.6),
        angle: rand(205,235),
        dist: -diag * 0.9,
        opacity: rand(0.55,0.95),
      };

      setMeteors((p) => [...p, m]);
      setTimeout(() => setMeteors((p) => p.filter((x) => x.id !== m.id)), m.duration * 1000);
      t = setTimeout(spawn, isMobile ? rand(900,1500) : rand(700,1200));
    };

    spawn();
    return () => { alive = false; clearTimeout(t); };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor animate-meteor"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: `${m.length}px`,
            height: `${m.thickness}px`,
            opacity: m.opacity,
            animationDuration: `${m.duration}s`,
            "--angle": `${m.angle}deg`,
            "--dist": `${m.dist}px`,
          }}
        />
      ))}
    </div>
  );
}
