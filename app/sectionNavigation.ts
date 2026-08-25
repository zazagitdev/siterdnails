const SCROLLING_CLASS = "is-section-scrolling";

let animationFrame: number | null = null;
let removeInterruptionListeners: (() => void) | null = null;

function finishSectionScroll() {
  animationFrame = null;
  removeInterruptionListeners?.();
  removeInterruptionListeners = null;
  document.documentElement.classList.remove(SCROLLING_CLASS);
}

export function cancelSectionScroll() {
  if (animationFrame !== null) {
    window.cancelAnimationFrame(animationFrame);
  }

  finishSectionScroll();
}

export function scrollToSection(hash: string) {
  const sectionId = decodeURIComponent(hash.replace(/^#/, ""));
  const destination = document.getElementById(sectionId);

  if (!destination) return false;

  cancelSectionScroll();

  const root = document.documentElement;
  const headerHeight =
    document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect()
      .height ?? 0;
  const startTop = window.scrollY;
  const maximumTop = Math.max(0, root.scrollHeight - window.innerHeight);
  const destinationTop = Math.min(
    maximumTop,
    Math.max(
      0,
      destination.getBoundingClientRect().top + startTop - headerHeight,
    ),
  );
  const distance = destinationTop - startTop;

  root.classList.add(SCROLLING_CLASS);

  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || Math.abs(distance) < 2) {
    window.scrollTo({ top: destinationTop, left: 0, behavior: "auto" });
    finishSectionScroll();
    return true;
  }

  const interrupt = () => cancelSectionScroll();
  const interruptFromKeyboard = (event: KeyboardEvent) => {
    if (
      [
        "ArrowDown",
        "ArrowUp",
        "End",
        "Home",
        "PageDown",
        "PageUp",
        " ",
      ].includes(event.key)
    ) {
      interrupt();
    }
  };

  window.addEventListener("wheel", interrupt, { passive: true });
  window.addEventListener("touchstart", interrupt, { passive: true });
  window.addEventListener("pointerdown", interrupt, { passive: true });
  window.addEventListener("keydown", interruptFromKeyboard);

  removeInterruptionListeners = () => {
    window.removeEventListener("wheel", interrupt);
    window.removeEventListener("touchstart", interrupt);
    window.removeEventListener("pointerdown", interrupt);
    window.removeEventListener("keydown", interruptFromKeyboard);
  };

  const duration = Math.min(520, Math.max(320, 260 + Math.abs(distance) * 0.06));
  let startedAt: number | null = null;

  const animate = (timestamp: number) => {
    startedAt ??= timestamp;

    const progress = Math.min(1, (timestamp - startedAt) / duration);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    window.scrollTo({
      top: startTop + distance * easedProgress,
      left: 0,
      behavior: "auto",
    });

    if (progress < 1) {
      animationFrame = window.requestAnimationFrame(animate);
      return;
    }

    window.scrollTo({ top: destinationTop, left: 0, behavior: "auto" });
    finishSectionScroll();
  };

  animationFrame = window.requestAnimationFrame(animate);
  return true;
}
