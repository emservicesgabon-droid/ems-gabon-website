"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Smooth scroll type Apple (Lenis) appliqué globalement.
 * - Respecte prefers-reduced-motion (accessibilité).
 * - Gère les ancres #id (que Lenis neutraliserait sinon) : au clic même-page
 *   et après une navigation vers une URL avec hash (ex. /services#webdev).
 * - Annule proprement la boucle RAF + détruit l'instance au démontage.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // scroll natif (les ancres fonctionnent nativement)
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Ancres même-page : défilement fluide vers la cible.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname === window.location.pathname && url.hash && url.hash !== "#") {
        const el = document.querySelector(url.hash);
        if (el) {
          e.preventDefault();
          history.pushState(null, "", url.hash);
          lenis.scrollTo(el as HTMLElement, { offset: -90, immediate: true });
        }
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Après une navigation, défiler vers l'ancre présente dans l'URL.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!lenis || !hash || hash === "#") return;
    let done = false;
    const timers: number[] = [];
    const attempt = () => {
      if (done) return;
      const el = document.querySelector(hash);
      if (el) {
        done = true;
        lenis.scrollTo(el as HTMLElement, { offset: -90, immediate: true });
      }
    };
    // Essais échelonnés : on laisse le temps à la page de rendre l'ancre
    // et on repasse après le scroll-to-top éventuel du router.
    [0, 60, 150, 300, 500].forEach((d) => {
      timers.push(window.setTimeout(attempt, d));
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, [pathname]);

  return <>{children}</>;
}
