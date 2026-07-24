export default function NewsAggregation() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid Background */}
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
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Accent Glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -200,
          top: 120,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(61,255,160,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <main
        style={{
          position: "relative",
          maxWidth: 1000,
          margin: "0 auto",
          padding: "120px 48px",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: ".7rem",
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: ".15em",
            textTransform: "uppercase",
          }}
        >
          ← Back Home
        </a>

        {/* Project Header */}
        <div
          style={{
            marginTop: 48,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: ".7rem",
              color: "var(--accent)",
              letterSpacing: ".2em",
              marginBottom: 16,
            }}
          >
            PROJECT // 2025
          </div>

          <h1
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              margin: 0,
              lineHeight: 1,
            }}
          >
            News
            <br />
            Aggregation
          </h1>

          <div
            style={{
              width: 220,
              height: 1,
              background:
                "linear-gradient(90deg, var(--accent), transparent)",
              marginTop: 28,
              marginBottom: 36,
            }}
          />

          <p
            style={{
              maxWidth: 720,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "var(--text-dim)",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            A Python application that aggregates worldwide news articles from
            GDELT and extracts meaningful entities, including people,
            organizations, locations, timestamps, and topics. The project
            transforms unstructured news data into structured, searchable
            records suitable for further analysis.
          </p>
        </div>

        {/* Project Details */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            paddingBottom: 48,
          }}
        >
          {/* Architecture */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              padding: 28,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: ".65rem",
                color: "var(--accent)",
                letterSpacing: ".15em",
                marginBottom: 14,
              }}
            >
              ARCHITECTURE
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "var(--text-dim)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              GDELT article data is processed individually or in batches.
              Locations, people, topics, companies, and other article
              attributes are extracted and stored in DuckDB. Each stored record
              links back to its original article, allowing related articles to
              be queried and traversed efficiently by topic or entity.
            </p>
          </div>

          {/* Technologies */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              padding: 28,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: ".65rem",
                color: "var(--accent)",
                letterSpacing: ".15em",
                marginBottom: 14,
              }}
            >
              TECHNOLOGIES
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {["Python", "DuckDB", "GDELT"].map((technology) => (
                <span
                  key={technology}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: ".65rem",
                    color: "var(--text-dim)",
                    border: "1px solid var(--border)",
                    padding: "5px 9px",
                  }}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              padding: 28,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: ".65rem",
                color: "var(--accent)",
                letterSpacing: ".15em",
                marginBottom: 14,
              }}
            >
              KEY FEATURES
            </div>

            <ul
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "var(--text-dim)",
                lineHeight: 1.8,
                margin: 0,
                paddingLeft: 20,
              }}
            >
              <li>Individual and batch article processing</li>
              <li>Entity and topic extraction</li>
              <li>Structured DuckDB storage</li>
              <li>Links to original source articles</li>
              <li>Topic- and entity-based article traversal</li>
            </ul>
          </div>
        </div>

        {/* Screenshot */}
        <section>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: ".65rem",
              color: "var(--accent)",
              letterSpacing: ".15em",
              marginBottom: 18,
            }}
          >
            APPLICATION PREVIEW
          </div>

          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              padding: 12,
            }}
          >
            <img
              src="/images/gdelt.png"
              alt="News aggregation application interface"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}