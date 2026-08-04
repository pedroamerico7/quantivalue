import { useEffect, useMemo, useRef, useState } from "react";

const sectors = [
  "AI Valuation",
  "Fintech Infrastructure",
  "Quantitative Finance",
  "Investment Intelligence",
  "M&A Technology",
  "Enterprise Analytics",
];


const opportunitySignals = [
  {
    label: "AI-native finance",
    title: "Explainability becomes a buying criterion",
    copy: "As financial teams adopt AI, transparent reasoning and reviewable evidence become part of the product promise.",
    index: "01",
  },
  {
    label: "Valuation infrastructure",
    title: "Decision workflows are moving beyond spreadsheets",
    copy: "The category is expanding from isolated models toward connected systems for valuation, scenarios and institutional review.",
    index: "02",
  },
  {
    label: "Strategic brand value",
    title: "A precise name compresses time to market",
    copy: "QuantiValue signals quantitative intelligence and commercial value before the first sales call, demo or transaction.",
    index: "03",
  },
];

const pillars = [
  {
    number: "01",
    title: "Immediate category signal",
    copy: "QuantiValue naturally connects quantitative intelligence with valuation, capital allocation and financial decision-making.",
  },
  {
    number: "02",
    title: "Institutional character",
    copy: "The name feels credible for enterprise software, investment platforms, research systems and global financial products.",
  },
  {
    number: "03",
    title: "Global brand architecture",
    copy: "Concise, pronounceable and commercially clear across international English-language markets.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function formatViews(value) {
  return value === null ? "—" : value.toLocaleString("en-US");
}

export default function App() {
  const [views, setViews] = useState(null);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerStatus, setOfferStatus] = useState({ state: "idle", message: "" });
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }),
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const storageKey = "quantivalue-view-counted-at";
    const last = Number(localStorage.getItem(storageKey) || 0);
    const shouldIncrement = Date.now() - last > 24 * 60 * 60 * 1000;

    fetch("/api/views", {
      method: shouldIncrement ? "POST" : "GET",
      headers: { Accept: "application/json" },
    })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        setViews(Number(data.views) || 0);
        if (shouldIncrement) localStorage.setItem(storageKey, String(Date.now()));
      })
      .catch(() => setViews(null));
  }, []);

  useEffect(() => {
    if (!offerOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleModalKeys(event) {
      if (event.key === "Escape") {
        setOfferOpen(false);
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
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

    window.addEventListener("keydown", handleModalKeys);
    return () => {
      window.removeEventListener("keydown", handleModalKeys);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [offerOpen]);

  async function submitOffer(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setOfferStatus({ state: "sending", message: "Encrypting and submitting your offer…" });

    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: { "content-type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit the offer.");

      form.reset();
      setOfferStatus({
        state: "success",
        message: `Offer received. Confidential reference: ${result.reference}`,
      });
    } catch (error) {
      setOfferStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Unable to submit the offer.",
      });
    }
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="QuantiValue home">
          <img className="logo-symbol" src="/quantum-ring.svg" alt="" aria-hidden="true" />
          <span className="logo-name">QuantiValue</span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#thesis">Platform</a>
          <a href="#technology">Technology</a>
          <a href="#brand">Brand</a>
          <a href="#acquire">Contact</a>
        </nav>

        <button
          ref={triggerRef}
          className="header-offer"
          type="button"
          onClick={() => setOfferOpen(true)}
        >
          Private discussion <Arrow />
        </button>
      </header>

      <main id="main-content" tabIndex="-1">
        <section className="hero">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-aura aura-one" aria-hidden="true" />
          <div className="hero-aura aura-two" aria-hidden="true" />

          <div className="hero-orbital" aria-hidden="true">
            <span className="orbital-ring orbital-ring-one" />
            <span className="orbital-ring orbital-ring-two" />
            <span className="orbital-ring orbital-ring-three" />
            <span className="orbital-node orbital-node-one" />
            <span className="orbital-node orbital-node-two" />
            <span className="orbital-node orbital-node-three" />
            <span className="orbital-node orbital-node-four" />
          </div>

          <div className="hero-content" data-reveal>
            <div className="availability">
              <span className="live-dot" />
              Premium .COM available for acquisition
            </div>

            <h1>
              <span className="hero-title-main">Financial Intelligence.</span>
              <span className="hero-title-signature">Built on Explainability.</span>
            </h1>

            <p className="hero-description">
              Enterprise-grade brand for explainable AI, valuation technology and
              institutional financial intelligence. Built for investors, M&amp;A advisors,
              private equity and financial institutions.
            </p>

            <div className="hero-actions">
              <button
                className="primary-cta"
                type="button"
                onClick={(event) => { triggerRef.current = event.currentTarget; setOfferOpen(true); }}
              >
                Request private discussion <Arrow />
              </button>
              <a className="secondary-cta" href="#thesis">
                Read the brand thesis <span>↓</span>
              </a>
            </div>

            <p className="hero-trust">
              Acquisition <span>•</span> Licensing <span>•</span> Strategic partnership
            </p>

            <div className="hero-proof">
              <div>
                <strong>Premium .COM</strong>
                <span>global digital asset</span>
              </div>
              <div>
                <strong>Category-ready</strong>
                <span>AI · finance · valuation</span>
              </div>
              <div>
                <strong>Private</strong>
                <span>direct owner acquisition</span>
              </div>
            </div>
          </div>

          <div className="dashboard-showcase" data-reveal aria-label="Conceptual QuantiValue dashboard preview">
            <div className="dashboard-chrome">
              <div className="dashboard-brand">
                <img src="/quantum-ring.svg" alt="" aria-hidden="true" />
                <span>QuantiValue Intelligence</span>
              </div>
              <div className="dashboard-status"><i /> Live model</div>
            </div>

            <div className="dashboard-body">
              <aside className="dashboard-sidebar" aria-hidden="true">
                <span className="active">Overview</span>
                <span>Valuation</span>
                <span>Scenarios</span>
                <span>Evidence</span>
              </aside>

              <div className="dashboard-main">
                <div className="dashboard-heading">
                  <div>
                    <small>ENTERPRISE OVERVIEW</small>
                    <strong>Northstar Analytics</strong>
                  </div>
                  <span>Updated now</span>
                </div>

                <div className="dashboard-kpis">
                  <article><small>Enterprise value</small><strong>$2.43B</strong><span>+4.2%</span></article>
                  <article><small>AI confidence</small><strong>98%</strong><span>High</span></article>
                  <article><small>Risk score</small><strong>18</strong><span>Low</span></article>
                </div>

                <div className="dashboard-chart">
                  <div className="chart-meta"><span>Valuation range</span><strong>$2.18B — $2.67B</strong></div>
                  <svg viewBox="0 0 520 180" role="img" aria-label="Conceptual valuation trend chart">
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B63FF" stopOpacity="0.32" />
                        <stop offset="100%" stopColor="#3B63FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="chart-area" d="M0 150 C65 140 92 118 138 126 S220 96 270 103 S350 55 405 72 S472 34 520 22 L520 180 L0 180 Z" />
                    <path className="chart-line" d="M0 150 C65 140 92 118 138 126 S220 96 270 103 S350 55 405 72 S472 34 520 22" />
                    <circle cx="520" cy="22" r="5" />
                  </svg>
                </div>

                <div className="dashboard-insight">
                  <div className="insight-mark">AI</div>
                  <div><small>EXPLAINABLE INSIGHT</small><p>Value increased as recurring revenue improved and the discount rate declined.</p></div>
                  <strong>94%</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sector-rail" aria-label="Target markets">
          <div className="sector-track">
            {[...sectors, ...sectors].map((sector, index) => (
              <span key={`${sector}-${index}`}>{sector}<i /></span>
            ))}
          </div>
        </section>


        <section className="technology" id="technology">
          <div className="technology-heading" data-reveal>
            <p className="section-tag">Technology vision</p>
            <h2>Three systems.<br />One verifiable decision.</h2>
            <p>
              QuantiValue is positioned around the infrastructure required to turn
              complex financial information into decisions that can be reviewed,
              challenged and trusted.
            </p>
          </div>

          <div className="technology-grid">
            <article className="technology-card" data-reveal>
              <div className="technology-visual explainable-visual" aria-hidden="true">
                <span className="tech-core">AI</span>
                <span className="tech-node tech-node-a">Data</span>
                <span className="tech-node tech-node-b">Logic</span>
                <span className="tech-node tech-node-c">Evidence</span>
                <i className="tech-line tech-line-a" />
                <i className="tech-line tech-line-b" />
                <i className="tech-line tech-line-c" />
              </div>
              <small>01 · EXPLAINABILITY</small>
              <h3>Explainable AI Engine</h3>
              <p>
                Models designed to reveal assumptions, evidence and reasoning — not
                just produce an opaque output.
              </p>
              <span className="technology-link">Trace every conclusion <Arrow /></span>
            </article>

            <article className="technology-card" data-reveal>
              <div className="technology-visual valuation-visual" aria-hidden="true">
                <span className="valuation-axis axis-y" />
                <span className="valuation-axis axis-x" />
                <span className="valuation-bar bar-one" />
                <span className="valuation-bar bar-two" />
                <span className="valuation-bar bar-three" />
                <span className="valuation-range">$2.18B — $2.67B</span>
              </div>
              <small>02 · VALUATION</small>
              <h3>Institutional Valuation</h3>
              <p>
                A brand architecture built for DCF, comparables, scenario analysis
                and enterprise-grade financial modeling.
              </p>
              <span className="technology-link">Model with discipline <Arrow /></span>
            </article>

            <article className="technology-card" data-reveal>
              <div className="technology-visual decision-visual" aria-hidden="true">
                <span className="decision-ring ring-one" />
                <span className="decision-ring ring-two" />
                <span className="decision-dot dot-one" />
                <span className="decision-dot dot-two" />
                <span className="decision-dot dot-three" />
                <span className="decision-center">QV</span>
              </div>
              <small>03 · DECISIONS</small>
              <h3>Decision Intelligence</h3>
              <p>
                A system positioned to connect valuation outputs with risk,
                confidence and strategic action.
              </p>
              <span className="technology-link">Move from model to action <Arrow /></span>
            </article>
          </div>
        </section>

        <section className="thesis" id="thesis">
          <div className="section-intro" data-reveal>
            <p className="section-tag">Brand thesis</p>
            <h2>Quantitative intelligence.<br />Commercial value.</h2>
            <p>
              A category-ready name that makes the product promise legible before
              the first demo, model or transaction.
            </p>
          </div>

          <div className="equation" data-reveal>
            <article>
              <small>QUANTI</small>
              <strong>Models</strong>
              <span>Data, forecasting, precision and machine intelligence.</span>
            </article>
            <div className="equation-mark">×</div>
            <article>
              <small>VALUE</small>
              <strong>Outcomes</strong>
              <span>Valuation, investment insight and strategic decisions.</span>
            </article>
            <div className="equation-result">
              <small>RESULT</small>
              <strong>QuantiValue</strong>
            </div>
          </div>
        </section>

        <section className="market-opportunity" id="markets">
          <div className="opportunity-heading" data-reveal>
            <p className="section-tag">Market opportunity</p>
            <h2>Positioned where finance, AI and strategic value converge.</h2>
            <p>
              QuantiValue is designed to sit at the intersection of categories that
              increasingly depend on trust, explainability and institutional-grade decision systems.
            </p>
          </div>

          <div className="opportunity-signals">
            {opportunitySignals.map((signal) => (
              <article key={signal.index} data-reveal>
                <small>{signal.index}</small>
                <div>
                  <span>{signal.label}</span>
                  <h3>{signal.title}</h3>
                  <p>{signal.copy}</p>
                </div>
                <Arrow />
              </article>
            ))}
          </div>

          <div className="opportunity-categories" data-reveal>
            <div className="opportunity-orbit" aria-hidden="true">
              <span className="opportunity-core">QV</span>
              <i className="opportunity-ring ring-a" />
              <i className="opportunity-ring ring-b" />
              <b className="opportunity-dot dot-a" />
              <b className="opportunity-dot dot-b" />
              <b className="opportunity-dot dot-c" />
            </div>
            <div className="category-list">
              <p>Category architecture</p>
              {sectors.map((sector, index) => (
                <div key={sector}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{sector}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="brand-film" id="brand">
          <div className="film-light film-light-a" aria-hidden="true" />
          <div className="film-light film-light-b" aria-hidden="true" />
          <div className="film-copy" data-reveal>
            <p className="section-tag light">Positioning</p>
            <blockquote>
              “A name that sounds established before the company is built.”
            </blockquote>
          </div>
          <div className="film-word" aria-hidden="true">QV</div>
        </section>

        <section className="pillars">
          <div className="pillars-heading" data-reveal>
            <p className="section-tag">Why it works</p>
            <h2>Designed for institutional ambition.</h2>
          </div>

          <div className="pillar-list">
            {pillars.map((pillar) => (
              <article key={pillar.number} data-reveal>
                <small>{pillar.number}</small>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="acquire" id="acquire">
          <div className="acquire-grid" aria-hidden="true" />
          <div className="acquire-copy" data-reveal>
            <p className="section-tag light">Private acquisition</p>
            <h2>Acquire the name behind intelligent valuation.</h2>
            <p>
              QuantiValue.com is available through a direct, confidential owner
              transaction. Serious strategic inquiries are welcome.
            </p>
            <div className="acquire-details">
              <span>Premium .COM</span>
              <span>Secure transfer</span>
              <span>Global rights</span>
            </div>
          </div>

          <button
            className="acquire-button"
            type="button"
            onClick={(event) => { triggerRef.current = event.currentTarget; setOfferOpen(true); }}
          >
            <span>Start a confidential conversation</span>
            <strong>Make an Offer</strong>
            <Arrow />
          </button>
        </section>
      </main>

      <footer>
        <a className="logo footer-logo" href="#top">
          <img className="logo-symbol" src="/quantum-ring.svg" alt="" aria-hidden="true" />
          <span className="logo-name">QuantiValue</span>
        </a>
        <span>Premium brand available for acquisition</span>
        <a href="mailto:sales@quantivalue.com">sales@quantivalue.com</a>
      </footer>

      {offerOpen && (
        <div className="modal-backdrop" onMouseDown={() => setOfferOpen(false)}>
          <section
            ref={modalRef}
            className="offer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="modal-close"
              type="button"
              onClick={() => setOfferOpen(false)}
              aria-label="Close acquisition dialog"
            >
              ×
            </button>

            <div className="modal-brand">
              <p className="section-tag light">Confidential acquisition</p>
              <h2 id="offer-title">Make an Offer</h2>
              <p>
                Submit a serious proposal for QuantiValue.com. Details are encrypted
                in transit and stored privately for owner review.
              </p>
              <div className="modal-stat">
                <span className="live-dot" />
                <strong>{formatViews(views)}+ recorded visits</strong>
              </div>
            </div>

            <form className="offer-form" onSubmit={submitOffer}>
              <div className="form-row">
                <label>
                  Name
                  <input name="name" required minLength="2" maxLength="100" placeholder="Your name" />
                </label>
                <label>
                  Company
                  <input name="company" required minLength="2" maxLength="120" placeholder="Organization" />
                </label>
              </div>
              <label>
                Business email
                <input name="email" type="email" required maxLength="160" placeholder="name@company.com" />
              </label>
              <label>
                Offer amount (USD)
                <input name="amount" type="number" min="1" step="1" required placeholder="25000" />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows="4"
                  required
                  minLength="10"
                  maxLength="2000"
                  defaultValue="I would like to discuss an acquisition of QuantiValue.com."
                />
              </label>
              <label className="honeypot" aria-hidden="true">
                Website
                <input name="website" tabIndex="-1" autoComplete="off" />
              </label>

              <button type="submit" disabled={offerStatus.state === "sending"}>
                {offerStatus.state === "sending" ? "Submitting securely…" : "Submit confidential offer"}
                <Arrow />
              </button>

              <p className="privacy-note">Private owner review • No public disclosure</p>

              {offerStatus.state !== "idle" && (
                <p className={`status ${offerStatus.state}`} role="status" aria-live="polite">
                  {offerStatus.message}
                </p>
              )}
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
