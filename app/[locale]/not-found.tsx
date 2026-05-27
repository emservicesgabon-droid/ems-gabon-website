import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="hero-logo-bg relative overflow-hidden text-white min-h-[60vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(26,80,100,0.70) 0%, rgba(13,45,58,0.40) 50%, transparent 70%)" }}
        />
        <div className="orange-glow-blob-strong absolute -top-16 right-0 w-[420px] h-[420px] rounded-full" />
        <div
          className="absolute -bottom-24 right-1/3 w-[380px] h-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(56,216,255,0.22) 0%, rgba(56,216,255,0.07) 50%, transparent 70%)" }}
        />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38d8ff] to-transparent opacity-60" />
      </div>

      <Container className="relative text-center py-20">
        <div className="inline-flex items-center gap-2 border border-[#38d8ff]/30 bg-[#38d8ff]/8 text-[#8eeeff] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#38d8ff] animate-pulse shadow-[0_0_6px_#38d8ff]" />
          Erreur 404
        </div>
        <h1 className="text-neon-blue text-5xl sm:text-7xl font-bold mb-4">404</h1>
        <p className="text-neon-blue-sub text-lg sm:text-xl mb-8 max-w-md mx-auto">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/fr"
            className="inline-flex items-center gap-2 text-primary-900 text-sm font-bold px-6 py-3 rounded-lg hover:brightness-110 transition-all"
            style={{ background: "#f5a623", boxShadow: "0 0 12px rgba(245,166,35,0.4)" }}
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/fr/contact"
            className="inline-flex items-center gap-2 border-2 border-[#38d8ff]/40 text-[#8eeeff] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#38d8ff]/10 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </Container>
    </section>
  );
}
