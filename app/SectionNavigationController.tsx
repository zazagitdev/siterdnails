"use client";

import { useEffect } from "react";
import { cancelSectionScroll, scrollToSection } from "./sectionNavigation";

const SECTION_LINKS = '.site-header a[href^="#"], footer a[href^="#"]';

export default function SectionNavigation() {
  useEffect(() => {
    function handleSectionLink(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>(SECTION_LINKS);

      if (
        !link?.hash ||
        link.closest("#mobile-navigation") ||
        link.origin !== window.location.origin ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
      ) {
        return;
      }

      event.preventDefault();
      scrollToSection(link.hash);
    }

    document.addEventListener("click", handleSectionLink);

    return () => {
      document.removeEventListener("click", handleSectionLink);
      cancelSectionScroll();
    };
  }, []);

  return null;
}
