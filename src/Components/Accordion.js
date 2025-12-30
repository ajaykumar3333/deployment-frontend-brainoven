// frontend/src/Components/Accordion.js
import React from "react";

/**
 * Accordion component
 * - faqs: array of { _id, question, answer }
 * - parentId: unique id for accordion container (avoid collisions across pages)
 */
function Accordion({ faqs = [], parentId = "accordionExample" }) {
  const fallback = [
    { _id: "f-1", question: "Accordion Item #1", answer: "This is a fallback item." },
    { _id: "f-2", question: "Accordion Item #2", answer: "Fallback item #2." },
  ];
  const items = faqs.length ? faqs : fallback;

  return (
    <div className="accordion" id={parentId}>
      {items.map((item, idx) => {
        const safeId = String(item._id || idx).replace(/[^a-zA-Z0-9-_]/g, "-");
        const headingId = `heading-${parentId}-${safeId}`;
        const collapseId = `collapse-${parentId}-${safeId}`;

        return (
          <div className="accordion-item" key={item._id || idx}>
            <h2 className="accordion-header" id={headingId}>
              <button
                className={`accordion-button ${idx === 0 ? "" : "collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded={idx === 0 ? "true" : "false"}
                aria-controls={collapseId}
              >
                {item.question}
              </button>
            </h2>

            <div
              id={collapseId}
              className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
              aria-labelledby={headingId}
              data-bs-parent={`#${parentId}`}
            >
              <div className="accordion-body">
                <div dangerouslySetInnerHTML={{ __html: item.answer || "" }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
