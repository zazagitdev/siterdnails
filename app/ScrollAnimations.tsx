"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function ScrollAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const selectionTimers = new Set<number>();
    const serviceCards = Array.from(
      document.querySelectorAll<HTMLElement>(".service-card"),
    );
    const isMobile = window.matchMedia("(max-width: 959px)").matches;

    AOS.init({
      duration: 1150,
      easing: "ease-out-cubic",
      offset: 84,
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    const refresh = () => AOS.refresh();
    const refreshTimer = window.setTimeout(refresh, 240);

    window.addEventListener("load", refresh);

    const serviceObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              const card = entry.target as HTMLElement;
              const index = serviceCards.indexOf(card);
              const delay = isMobile ? 140 : Math.max(0, index % 3) * 140;
              const selectTimer = window.setTimeout(() => {
                card.classList.add("is-scroll-selected");

                const releaseTimer = window.setTimeout(() => {
                  card.classList.remove("is-scroll-selected");
                  selectionTimers.delete(releaseTimer);
                }, isMobile ? 850 : 1000);

                selectionTimers.add(releaseTimer);
                selectionTimers.delete(selectTimer);
              }, delay);

              selectionTimers.add(selectTimer);
              observer.unobserve(card);
            });
          },
          {
            rootMargin: isMobile ? "0px 0px -16% 0px" : "0px 0px -12% 0px",
            threshold: isMobile ? 0.6 : 0.42,
          },
        )
      : null;

    serviceCards.forEach((card) => serviceObserver?.observe(card));

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      serviceObserver?.disconnect();
      selectionTimers.forEach((timer) => window.clearTimeout(timer));
      serviceCards.forEach((card) => card.classList.remove("is-scroll-selected"));
    };
  }, []);

  return null;
}
