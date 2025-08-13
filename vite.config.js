// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// PON aquí EXACTAMENTE el nombre del repo de GitHub
const repo = "santi-s-portafolio";

export default defineConfig({
  plugins: [react()],
  base: `/${repo}/`,  
});



