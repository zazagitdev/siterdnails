"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { scrollToSection } from "./sectionNavigation";

type MobileMenuProps = {
  whatsappUrl: string;
};

export default function MobileMenu({ whatsappUrl }: MobileMenuProps) {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu(returnFocus = false) {
    setIsOpen(false);
    if (returnFocus) {
      window.requestAnimationFrame(() =>
        toggleRef.current?.focus({ preventScroll: true }),
      );
    }
  }

  function navigateToSection(event: MouseEvent<HTMLAnchorElement>) {
    const hash = event.currentTarget.hash;
    if (!hash) return;

    event.preventDefault();
    document.documentElement.classList.remove("mobile-menu-open");
    document.body.classList.remove("mobile-menu-open");
    closeMenu(true);

    window.requestAnimationFrame(() => {
      scrollToSection(hash);
    });
  }

  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const body = document.body;
    const desktop = window.matchMedia("(min-width: 960px)");

    root.classList.add("mobile-menu-open");
    body.classList.add("mobile-menu-open");

    const focusFrame = window.requestAnimationFrame(() => {
      navigationRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();
    });

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = [
        toggleRef.current,
        ...Array.from(
          navigationRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
        ),
      ].filter((element): element is HTMLElement => Boolean(element));

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeydown);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeydown);
      desktop.removeEventListener("change", closeOnDesktop);
      root.classList.remove("mobile-menu-open");
      body.classList.remove("mobile-menu-open");
    };
  }, [isOpen]);

  return (
    <div className={`mobile-menu${isOpen ? " is-open" : ""}`}>
      <button
        className="mobile-menu-toggle"
        ref={toggleRef}
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="mobile-menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav
        id="mobile-navigation"
        ref={navigationRef}
        aria-label="Navegação mobile"
        aria-hidden={!isOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu(true);
        }}
      >
        <a
          className="mobile-menu-brand"
          href="#inicio"
          aria-label="Renata Dias — início"
          onClick={navigateToSection}
        >
          <img
            src="/images/renata-dias-logo-transparent-2026.png"
            alt=""
            width="718"
            height="497"
          />
        </a>

        <div className="mobile-menu-content">
          <p className="mobile-menu-kicker">Navegue pelo site</p>
          <div className="mobile-menu-links">
            <a href="#servicos" onClick={navigateToSection}>Serviços</a>
            <a href="#resultado" onClick={navigateToSection}>Resultados</a>
            <a href="#sobre" onClick={navigateToSection}>Sobre</a>
            <a href="#localizacao" onClick={navigateToSection}>Localização</a>
            <a href="#duvidas" onClick={navigateToSection}>Dúvidas</a>
          </div>
        </div>

        <a
          className="mobile-menu-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => closeMenu()}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.892-9.884a9.82 9.82 0 0 1 7.021 2.91 9.83 9.83 0 0 1 2.897 7.028c-.002 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.79 11.79 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.14 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
          </svg>
          Agendar pelo WhatsApp
        </a>

        <p className="mobile-menu-note">Atendimento com hora marcada</p>
      </nav>
    </div>
  );
}
