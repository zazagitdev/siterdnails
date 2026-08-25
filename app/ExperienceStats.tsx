"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  start: number;
  end: number;
  duration: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

function AnimatedNumber({ start, end, duration, prefix = "", suffix = "", label }: AnimatedNumberProps) {
  const [value, setValue] = useState(start);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackFrame = requestAnimationFrame(() => setValue(end));
      return () => cancelAnimationFrame(fallbackFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();

        if (reduceMotion) {
          setValue(end);
          return;
        }

        const startedAt = performance.now();

        const update = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(start + (end - start) * easedProgress));

          if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, end, start]);

  return (
    <span
      className="stat-number"
      ref={numberRef}
      role="img"
      aria-label={`${prefix}${end}${suffix} ${label}`}
    >
      <span aria-hidden="true">{prefix}{value}{suffix}</span>
    </span>
  );
}

export default function ExperienceStats() {
  return (
    <section className="experience-stats" aria-labelledby="experiencia-titulo">
      <div className="container stats-shell">
        <div className="section-heading stats-intro" data-aos="fade-up">
          <p className="eyebrow">Experiência que acolhe</p>
          <h2 id="experiencia-titulo">Técnica aperfeiçoada. Cuidado sempre humano.</h2>
        </div>

        <div className="stats-grid">
          <article className="stat-card" data-aos="fade-up" data-aos-delay="80">
            <AnimatedNumber start={5} end={30} duration={2100} prefix="+" label="Anos de Especialização" />
            <p>Anos de Especialização</p>
          </article>
          <article className="stat-card stat-card-accent" data-aos="fade-up" data-aos-delay="160">
            <AnimatedNumber start={80} end={100} duration={2400} suffix="%" label="Atendimento Humanizado" />
            <p>Atendimento Humanizado</p>
          </article>
        </div>
      </div>
    </section>
  );
}
