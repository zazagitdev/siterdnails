"use client";

import { useId, useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionId = useId().replace(/:/g, "");

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const questionId = `${accordionId}-question-${index}`;
        const answerId = `${accordionId}-answer-${index}`;

        return (
          <article
            className={`faq-item${isOpen ? " is-open" : ""}`}
            key={item.question}
          >
            <h3>
              <button
                aria-controls={answerId}
                aria-expanded={isOpen}
                className="faq-question"
                id={questionId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                type="button"
              >
                <span className="faq-question-text">{item.question}</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h3>
            <div
              aria-hidden={!isOpen}
              aria-labelledby={questionId}
              className="faq-answer-shell"
              id={answerId}
              role="region"
            >
              <div className="faq-answer-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
