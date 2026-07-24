import { useState, useEffect, useRef, useCallback } from "react"
import nodemailer from 'nodemailer';
import NewsAggregation from "./pages/NewsAggregation";
import { styleText } from "node:util";
// ─── Cipher name animation ────────────────────────────────────────────────────

const CIPHER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*!?><|/"
const TARGET_NAME_FIRST = "MICHAEL"
const TARGET_NAME_LAST = "BERMUDEZ"
const LOCK_DELAY = 80 // ms between each letter locking in
const CYCLE_SPEED = 40 // ms between random char swaps

function useCipherName(name: string, startDelay = 600) {
  const chars = name.split("")
  const [lockedCount, setLockedCount] = useState(0)
  const [display, setDisplay] = useState<string[]>(chars.map(() => " "))
  const lockedRef = useRef(0)
  const activeRef = useRef(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      activeRef.current = true

      const interval = setInterval(() => {
        setDisplay(
          chars.map((ch, i) => {
            if (ch === " ") return " "
            if (i < lockedRef.current) return ch
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
          })
        )
      }, CYCLE_SPEED)

      const lockNext = () => {
        if (lockedRef.current >= chars.length) {
          clearInterval(interval)
          setDisplay(chars)
          return
        }
        lockedRef.current += 1
        setLockedCount(lockedRef.current)
        setTimeout(lockNext, LOCK_DELAY)
      }

      setTimeout(lockNext, 200)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(startTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { display, lockedCount }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RESEARCH_AREAS = [
  {
    id: "01",
    title: "Morphological Parsing",
    //desc: "Finite-state transducers and neural architectures for low-resource language morphology. Current focus on agglutinative Bantu and Austronesian language families.",
    desc: "Low resource core theme identification, tagging, and mapping of pdf documents. Current focus on traditional, statistical analysis of natural language.",
    tags: ["Python", "SQLite", "Statistics", "Annotation"],
  },
  {
    id: "02",
    title: "Syntactic Encoding",
    //desc: "Frame-semantic parsing across typologically diverse languages. Extending FrameNet coverage through cross-lingual transfer and annotation projection.",
    desc: "Low resource encoding of sentence structure and syntax. Identifies the actors, subjects, and modifiers of a sentence; as well as what relationships connect them.",
    tags: ["Python", "Data mining", "Syntactic-analysis", "POS Tagging"],
  },
  /*{
    id: "03",
    title: "Computational Pragmatics",
    desc: "Modeling implicature, presupposition, and discourse coherence in dialogue systems. Grounding formal pragmatic theory in distributional models.",
    tags: ["Discourse", "Pragmatics", "Dialogue"],
  },*/
]

const PROJECTS = [
  {
    year: "2026",
    name: "Achievo",
    role: "Frontend Development Intern",
    //desc: "Universal morphological analyzer supporting 143 languages via shared parameter morphological networks. Outperforms UniMorph baselines by 11.4 avg. F1.",
    desc: "Responsible for the implementation of a Figma prototype, as well as the product's shipment under time and budget constraints.",
    stack: ["TypeScript", "Vercel", "Render"],
    link: "https://achievo.academy/",
  },
  {
    year: "2025",
    name: "News Aggregation",
    role: "Lead",
    desc: "Designed and implemented an application to aggregate news articles and display pertinent themes; including people, locations, timestamps, and a link to the full article",
    stack: ["Python", "DuckDB", "GDELT"],
    link: "/projects/news-aggregation",
  },
  {
    year: "2024",
    name: "Pokémon Toy Application",
    role: "Lead",
    desc: "Developed a stateful, CRUD-based application for users to combine various visual and numerical components of characters from the game \"Pokémon\"",
    stack: ["JavaFX", "SQLite", "Python"],
    link: "/projects/pokemon",
  },
  {
    year: "2023",
    name: "Professor Course and Schedule Manager",
    role: "Lead",
    desc: "Created a basic CRUD-based application to visualize, save, and modify professor schedule availability. ",
    stack: ["JavaFX", "MySQL"],
    link: "/projects/course",
  },
]

const PUBLICATIONS = [
  {
    year: "2024",
    venue: "ACL",
    title: "Morphological Generalization Across Typological Distance: A Neural FST Approach",
    authors: "Osei, M., Katsumoto, Y., Riemann, H.",
    type: "Long Paper",
  },
  {
    year: "2024",
    venue: "NAACL",
    title: "Soft Constraints for Pragmatic Inference in Neural Dialogue Models",
    authors: "Osei, M., Devoe, R.",
    type: "Long Paper",
  },
  {
    year: "2023",
    venue: "EMNLP",
    title: "FrameXL: Scalable Frame-Semantic Parsing with Span-Based Structural Attention",
    authors: "Osei, M., Chen, X., Devoe, R., Riemann, H.",
    type: "Long Paper",
  },
  {
    year: "2023",
    venue: "ACL Findings",
    title: "Zero-Shot Cross-Lingual Transfer for Agglutinative Morphology",
    authors: "Osei, M., Katsumoto, Y.",
    type: "Findings",
  },
  {
    year: "2022",
    venue: "LREC",
    title: "PragmaCorpus: A Corpus of Conversational Implicature in Naturalistic Dialogue",
    authors: "Osei, M., Devoe, R., Nzekwe, A.",
    type: "Resource Paper",
  },
]

const SKILLS_GROUPS = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "Java", "C++", "Kotlin"],
  },
  {
    label: "Database Tools",
    items: ["MySQL", "SQLite", "DuckDB", "CSV", "Parquet"],
  },
  {
    label: "Development and Deployment",
    items: ["Next.js", "React", "Vercel", "Render", "Docker"],
  },
  //{
  //  label: "Linguistic Tools",
  //  items: ["HPSG", "LFG", "XFST/Foma", "Praat", "ELAN"],
  //},
]

const VENUE_COLOR: Record<string, string> = {
  ACL: "var(--accent)",
  NAACL: "#7eb8ff",
  EMNLP: "#d0a0ff",
  "ACL Findings": "var(--accent)",
  LREC: "var(--amber)",
}

// ─── Components ───────────────────────────────────────────────────────────────

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          color: "var(--accent)",
          letterSpacing: "0.12em",
        }}
      >
        {n}
      </span>
      <div style={{ width: 32, height: 1, background: "var(--border-accent)" }} />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "var(--text-muted)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.08em",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
        borderRadius: 2,
        padding: "2px 7px",
      }}
    >
      {label}
    </span>
  )
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: 56,
        background: scrolled ? "rgba(6, 8, 16, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          color: "var(--accent)",
          letterSpacing: "0.15em",
        }}
      >
        MB://
      </span>
      <div style={{ display: "flex", gap: 32 }}>
        {["Research", "Projects", "Contact"].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              letterSpacing: "0.14em",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}

function HeroSection() {
  const first = useCipherName(TARGET_NAME_FIRST)
  const last = useCipherName(TARGET_NAME_LAST, 1600) // optional delay so it starts after the first
//   const { display, lockedCount } = useCipherName(TARGET_NAME_LAST)
  const [subtitleVisible, setSubtitleVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setSubtitleVisible(true), 600 + TARGET_NAME_FIRST.length * LOCK_DELAY + 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* grid overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* accent glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: -200,
          top: "40%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(61,255,160,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          transform: "translateY(-50%)",
        }}
      />

      <div style={{ maxWidth: 1100, position: "relative" }}>
        {/* role label */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "var(--accent)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 28,
            opacity: subtitleVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          ▸ Computational Linguist & NLP Researcher
        </div>

        {/* Cipher name */}
    <h1
    style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(3.5rem, 9vw, 8rem)",
        fontWeight: 300,
        color: "var(--text)",
        letterSpacing: "0.06em",
        lineHeight: 1,
        margin: "0 0 8px",
        userSelect: "none",
    }}
    >
    <div>
        {first.display.map((char, i) => (
        <span
            key={i}
            style={{
            color: i < first.lockedCount ? "var(--text)" : "var(--accent)",
            textShadow:
                i < first.lockedCount ? "none" : "0 0 12px rgba(61,255,160,0.6)",
            }}
        >
            {char}
        </span>
        ))}
    </div>

    <div>
        {last.display.map((char, i) => (
        <span
            key={i}
            style={{
            color: i < last.lockedCount ? "var(--text)" : "var(--accent)",
            textShadow:
                i < last.lockedCount ? "none" : "0 0 12px rgba(61,255,160,0.6)",
            }}
        >
            {char}
        </span>
        ))}
    </div>
    </h1>

        {/* Underline */}
        <div
          style={{
            height: 1,
            width: subtitleVisible ? "100%" : "0%",
            background: "linear-gradient(90deg, var(--accent), transparent)",
            maxWidth: 540,
            marginBottom: 40,
            transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Bio */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.05rem",
            fontWeight: 300,
            color: "var(--text-dim)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 0 48px",
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          Independent researcher from the State University of New York at Old Westbury.
          Traditional computational linguist — designing deterministic systems and tools to 
          encode, decode, and operate on natural langauge.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
          }}
        >
          <a
            href="#projects"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "var(--bg)",
              background: "var(--accent)",
              padding: "12px 28px",
              display: "inline-block",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            View Projects
          </a>

          <a
            href="https://mikebermudez.dev/"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "var(--text-muted)",
              //background: "var(--surface-2)",
              borderBlockWidth: 1,
              border: "var(--text-muted)",
              padding: "12px 28px",
              display: "inline-block",
              transition: "opacity 0.2s",
              
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Further Research
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 48,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: subtitleVisible ? 0.4 : 0,
          transition: "opacity 0.7s ease 0.8s",
        }}
      >
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, transparent, var(--text-muted))",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: "var(--text-muted)",
            writingMode: "vertical-rl",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}

function ResearchSection() {
  return (
    <section
      id="research"
      style={{ padding: "120px 48px", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: 1100 }}>
        <SectionLabel n="01" label="Research" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 1,
            border: "1px solid var(--border)",
          }}
        >
          {RESEARCH_AREAS.map(area => (
            <div
              key={area.id}
              style={{
                padding: "40px 36px",
                borderRight: "1px solid var(--border)",
                background: "var(--surface)",
                transition: "background 0.25s",
                cursor: "default",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)")}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "var(--surface)")}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "var(--accent)",
                  letterSpacing: "0.15em",
                  marginBottom: 20,
                }}
              >
                {area.id}
              </div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  color: "var(--text)",
                  margin: "0 0 14px",
                  lineHeight: 1.3,
                }}
              >
                {area.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.88rem",
                  color: "var(--text-dim)",
                  lineHeight: 1.75,
                  margin: "0 0 24px",
                }}
              >
                {area.desc}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {area.tags.map(t => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{ padding: "120px 48px", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: 1100 }}>
        <SectionLabel n="02" label="Projects" />
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {PROJECTS.map((p, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                gap: "0 40px",
                alignItems: "start",
                padding: "32px 0",
                borderTop: "1px solid var(--border)",
                transition: "background 0.2s",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  paddingTop: 4,
                }}
              >
                {p.year}
              </span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "1.1rem",
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {p.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.55rem",
                      color: "var(--accent)",
                      border: "1px solid var(--border-accent)",
                      borderRadius: 2,
                      padding: "2px 7px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {p.role}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.88rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.7,
                    margin: "0 0 16px",
                    maxWidth: 580,
                  }}
                >
                  {p.desc}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.stack.map(s => (
                    <Tag key={s} label={s} />
                  ))}
                </div>
              </div>
              <a
                href={p.link}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  paddingTop: 4,
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                View →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PublicationsSection() {
  return (
    <section
      id="publications"
      style={{ padding: "120px 48px", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: 1100 }}>
        <SectionLabel n="03" label="Publications" />
        <div>
          {PUBLICATIONS.map((pub, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 72px 1fr 100px",
                gap: "0 32px",
                alignItems: "center",
                padding: "22px 0",
                borderTop: "1px solid var(--border)",
                cursor: "default",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.paddingLeft = "8px")}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.paddingLeft = "0px")}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                }}
              >
                {pub.year}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: VENUE_COLOR[pub.venue] ?? "var(--text-dim)",
                  letterSpacing: "0.08em",
                }}
              >
                {pub.venue}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.92rem",
                    color: "var(--text)",
                    marginBottom: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {pub.title}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {pub.authors}
                </div>
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: 2,
                  padding: "3px 8px",
                  textAlign: "center",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {pub.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section
      style={{
        padding: "120px 48px",
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div style={{ maxWidth: 1100 }}>
        <SectionLabel n="03" label="Stack" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 40,
          }}
        >
          {SKILLS_GROUPS.map(group => (
            <div key={group.label}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  paddingBottom: 10,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {group.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {group.items.map(item => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        background: "var(--accent)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.72rem",
                        color: "var(--text-dim)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [inputVal, setInputVal] = useState("")
  const [subject, setSubjectVal] = useState("")
  const [sent, setSent] = useState(false)

  const handleSend = useCallback(async () => {
    if (!inputVal.trim()) return;

    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputVal,
          subject_line: subject,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setSent(true);
      setInputVal("");
      setSubjectVal("")
    } catch (err) {
      console.error(err);
    }
  }, [inputVal]);

  return (
    <section
      id="contact"
      style={{
        padding: "120px 48px 80px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1100 }}>
        <SectionLabel n="04" label="Contact" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                color: "var(--text)",
                lineHeight: 1.2,
                margin: "0 0 20px",
              }}
            >
              Let&apos;s talk about language.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "0.92rem",
                color: "var(--text-dim)",
                lineHeight: 1.75,
                margin: "0 0 40px",
              }}
            >
              Open to research collaborations, academic positions, and industry partnerships in
              computational linguistics, NLP, and software engineering. Drop me a line.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Email", value: "mikebermudez2113@gmail.com" },
                //{ label: "Scholar", value: "Google Scholar →" },
                { label: "GitHub", value: "github.com/mikeb2113" },
                { label: "Location", value: "Long Island, New York" },
              ].map(item => (
                <div
                  key={item.label}
                  style={{ display: "flex", gap: 20, alignItems: "baseline" }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      minWidth: 70,
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.72rem",
                      color: "var(--text-dim)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal-style message box */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 6,
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: "1px solid var(--border)",
              }}
            >
              {["var(--red)", "var(--amber)", "var(--accent)"].map((c, i) => (
                <div
                  key={i}
                  style={{ width: 10, height: 10, borderRadius: "50%", background: c }}
                />
              ))}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  color: "var(--text-muted)",
                  marginLeft: 8,
                  letterSpacing: "0.1em",
                }}
              >
                message.sh
              </span>
            </div>

            {!sent ? (
              <>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>~/contact</span> $ send_message
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    marginBottom: 16,
                  }}
                >
                  &gt; Enter your message:
                </div>
                <textarea
                  rows={1}
                  value={subject}
                  onChange={e => setSubjectVal(e.target.value)}
                  placeholder="Subject: You're the Perfect Applicant!"
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    lineHeight: 1.7,
                    padding: "12px 14px",
                    resize: "none",
                    outline: "none",
                    marginBottom: 16,
                    caretColor: "var(--accent)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--border-accent)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                />
                <textarea
                  rows={6}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Hi Michael, I wanted to reach out about..."
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    lineHeight: 1.7,
                    padding: "12px 14px",
                    resize: "none",
                    outline: "none",
                    marginBottom: 16,
                    caretColor: "var(--accent)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--border-accent)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                />
                <button
                  onClick={handleSend}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--bg)",
                    background: "var(--accent)",
                    border: "none",
                    padding: "10px 24px",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  $ send →
                </button>
              </>
            ) : (
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: "var(--accent)",
                  lineHeight: 2,
                }}
              >
                <div>&gt; Sending...</div>
                <div>&gt; Message delivered. ✓</div>
                <div style={{ color: "var(--text-muted)", marginTop: 8 }}>
                  Expected reply within 48h.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "24px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
        }}
      >
        MICHAEL BERMUDEZ — 2026
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
        }}
      >
        State University of New York at Old Westbury · School of Computer & Information Science
      </span>
    </footer>
  )
}

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <NavBar />
      <HeroSection />
      <ResearchSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}