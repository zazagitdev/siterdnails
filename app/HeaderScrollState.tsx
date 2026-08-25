"use client";

import { useEffect } from "react";

export default function HeaderScrollState() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector<HTMLElement>(".hero");
    const mobileHero = document.querySelector<HTMLElement>(".hero-stage");
    const desktopHeroCta = document.querySelector<HTMLElement>(
      ".hero-schedule-button",
    );
    const desktopNavigation = document.querySelector<HTMLElement>(".desktop-nav");
    const navigationLinks = Array.from(
      desktopNavigation?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]') ?? [],
    );

    const linkedSections = Array.from(
      new Set(
        navigationLinks
          .map((link) => link.getAttribute("href")?.slice(1))
          .filter((id): id is string => Boolean(id)),
      ),
    )
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!header || !hero) return;

    let frame = 0;

    const updateHeader = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollTop = Math.max(
          window.scrollY || 0,
          document.documentElement.scrollTop || 0,
        );
        const hasStartedScrolling = scrollTop > 8;
        const isDesktop = window.matchMedia("(min-width: 960px)").matches;
        const activeHeroSurface = !isDesktop && mobileHero ? mobileHero : hero;
        const separationBoundary = isDesktop && desktopHeroCta
          ? desktopHeroCta
          : activeHeroSurface;
        const isPastHero = hasStartedScrolling
          && separationBoundary.getBoundingClientRect().bottom <= header.offsetHeight;

        header.dataset.scrollState = isPastHero
          ? "past-hero"
          : hasStartedScrolling
            ? "hero-scroll"
            : "hero-top";
        header.classList.toggle("is-at-hero", !hasStartedScrolling);
        header.classList.toggle("is-scrolling-hero", hasStartedScrolling && !isPastHero);
        header.classList.toggle("is-past-hero", isPastHero);

        const sectionMarker = header.offsetHeight
          + Math.min(window.innerHeight * 0.28, 220);
        let activeSection = "";

        if (isDesktop) {
          linkedSections.forEach((section) => {
            if (section.getBoundingClientRect().top <= sectionMarker) {
              activeSection = section.id;
            }
          });
        }

        let activeLink: HTMLAnchorElement | undefined;

        navigationLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${activeSection}`;
          link.classList.toggle("is-active", isActive);

          if (isActive) {
            activeLink = link;
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });

        if (desktopNavigation) {
          desktopNavigation.classList.toggle("has-active-section", Boolean(activeLink));

          if (activeLink) {
            desktopNavigation.style.setProperty(
              "--active-indicator-left",
              `${activeLink.offsetLeft}px`,
            );
            desktopNavigation.style.setProperty(
              "--active-indicator-width",
              `${activeLink.offsetWidth}px`,
            );
          }
        }

        if (activeSection) {
          header.dataset.activeSection = activeSection;
        } else {
          delete header.dataset.activeSection;
        }
      });
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    window.addEventListener("pageshow", updateHeader);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
      window.removeEventListener("pageshow", updateHeader);
      header.classList.remove("is-at-hero");
      header.classList.remove("is-scrolling-hero");
      header.classList.remove("is-past-hero");
      delete header.dataset.scrollState;
      delete header.dataset.activeSection;
      desktopNavigation?.classList.remove("has-active-section");
      desktopNavigation?.style.removeProperty("--active-indicator-left");
      desktopNavigation?.style.removeProperty("--active-indicator-width");
      navigationLinks.forEach((link) => {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      });
    };
  }, []);

  return null;
}
