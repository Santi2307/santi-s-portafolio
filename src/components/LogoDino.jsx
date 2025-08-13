// src/components/LogoDino.jsx
export default function LogoDino({ size = 22, className = "" }) {
  return (
    <img
      src="/dino.png"                // viene de /public
      alt="SantiTech logo"
      width={size}
      height={size}
      style={{ imageRendering: "pixelated" }} // look 8-bit nítido
      className={`inline-block align-middle ${className}`}
    />
  );
}

/* OPCIONAL (look con degradado usando el PNG como máscara):
export default function LogoDino({ size = 22, className = "" }) {
  return (
    <span
      aria-hidden
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size,
        WebkitMask: "url(/dino.png) center / contain no-repeat",
        mask: "url(/dino.png) center / contain no-repeat",
        background: "linear-gradient(45deg,#8b5cf6,#6366f1)",
        filter: "drop-shadow(0 0 6px rgba(139,92,246,.45))",
      }}
      title="SantiTech"
    />
  );
}
*/

