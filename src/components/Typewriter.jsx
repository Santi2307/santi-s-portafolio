// src/components/Typewriter.jsx
import { useEffect, useMemo, useRef, useState } from "react";

export default function Typewriter({
  segments = [{ text: "" }],       // [{ text, className? }]
  speed = 28,                      // ← faster (ms per char)
  startDelay = 300,
  showCursor = true,
  className = "",
}) {
  const full = useMemo(() => segments.map(s => s.text).join(""), [segments]);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef();

  useEffect(() => {
    const kickoff = setTimeout(() => {
      timer.current = setInterval(() => {
        setCount(c => {
          if (c + 1 >= full.length) {
            clearInterval(timer.current);
            setDone(true);
            return full.length;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);
    return () => { clearTimeout(kickoff); clearInterval(timer.current); };
  }, [full, speed, startDelay]);

  // figure out how much of each segment is currently visible
  let remaining = count;
  const pieces = segments.map((seg, i) => {
    const take = Math.max(0, Math.min(seg.text.length, remaining));
    remaining -= take;
    return (
      <span key={i} className={seg.className}>
        {seg.text.slice(0, take)}
      </span>
    );
  });

  return (
    <span className={`relative inline-flex items-baseline ${className}`}>
      {/* typed text */}
      <span className="relative">{pieces}</span>

      {/* caret */}
      {showCursor && (
        <span
          aria-hidden
          className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-foreground/90 animate-pulse"
        />
      )}

      {/* a quick glint once typing finishes */}
      {done && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="absolute top-0 -left-1/3 h-full w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
        </span>
      )}
    </span>
  );
}
