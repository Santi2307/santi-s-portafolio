// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StarBackground from "./components/StarBackground.jsx";
import { Navbar } from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      {/* Fondo ocupa TODA la pantalla */}
      <StarBackground />

      <BrowserRouter>
        <Navbar />
        {/* ancho cómodo para desktop, y respira en TV */}
        <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}


