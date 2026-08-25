"use client";

import { useEffect, useState } from "react";

type WhatsAppFloatProps = {
  href: string;
  children: React.ReactNode;
};

export default function WhatsAppFloat({ href, children }: WhatsAppFloatProps) {
  const [isVisibleOnMobile, setIsVisibleOnMobile] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 960px)");

    function updateVisibility() {
      if (desktop.matches) {
        setIsVisibleOnMobile(true);
        return;
      }

      const firstScreen = document.querySelector<HTMLElement>(".hero-stage");
      setIsVisibleOnMobile(
        !firstScreen || firstScreen.getBoundingClientRect().bottom <= 72,
      );
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    if (typeof desktop.addEventListener === "function") {
      desktop.addEventListener("change", updateVisibility);
    } else {
      desktop.addListener(updateVisibility);
    }

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);

      if (typeof desktop.removeEventListener === "function") {
        desktop.removeEventListener("change", updateVisibility);
      } else {
        desktop.removeListener(updateVisibility);
      }
    };
  }, []);

  return (
    <a
      className={`whatsapp-float${isVisibleOnMobile ? " is-visible" : ""}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar pelo WhatsApp"
    >
      {children}
    </a>
  );
}
