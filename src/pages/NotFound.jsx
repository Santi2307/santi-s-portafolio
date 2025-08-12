import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="opacity-70 mb-6">Page not found.</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-violet-600 text-white hover:opacity-90 transition"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
