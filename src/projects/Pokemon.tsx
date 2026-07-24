export default function Pokemon() {
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
            PROJECT // 2024
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
            Pokémon Fusion
            <br />
            Team Builder
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
            }}
          >
            A desktop team-building application created for Pokémon Infinite
            Fusion. Users could create an account, log into a personal profile,
            and build customized Pokémon teams. Each profile preserved the
            user's saved team information between sessions through a local
            SQLite database.
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
              The JavaFX interface handled account authentication, profile
              navigation, and team-building operations. User accounts and saved
              Pokémon selections were stored in SQLite and associated with the
              active profile. CRUD operations allowed users to create, view,
              update, and delete saved team configurations.
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
              {["Java", "JavaFX", "SQLite", "SQL", "CRUD"].map(
                (technology) => (
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
                ),
              )}
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
              <li>User registration and login</li>
              <li>Persistent profile-specific data</li>
              <li>Custom Pokémon team creation</li>
              <li>Saved team editing and deletion</li>
              <li>Local SQLite data storage</li>
            </ul>
          </div>
        </div>

        {/* Screenshot */}
        <section>
        </section>
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
              src="/images/pokemon-app.png"
              alt="Pokémon Infinite Fusion team builder application"
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