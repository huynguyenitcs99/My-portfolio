import type { CSSProperties, ReactNode } from "react";

type ArtIconName =
  | "email"
  | "calendar"
  | "brief"
  | "conversation"
  | "check"
  | "image"
  | "text"
  | "layout"
  | "arrow";

function ArtIcon({
  name,
  className = "",
}: {
  name: ArtIconName;
  className?: string;
}) {
  const paths: Record<ArtIconName, ReactNode> = {
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18m-12 4h2m3 0h2m-7 4h2" />
      </>
    ),
    brief: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </>
    ),
    conversation: (
      <>
        <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5l-5 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M7 9h10M7 13h7" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8" cy="9" r="1.5" />
        <path d="m3 17 6-6 4 4 3-3 5 5" />
      </>
    ),
    text: (
      <>
        <path d="M4 5h16M12 5v15M8 20h8" />
      </>
    ),
    layout: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 9v12" />
      </>
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  };
  return (
    <svg
      className={`art-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function SignalPaths({ kind }: { kind: "daily" | "creative" | "slide" }) {
  const focused =
    kind === "daily"
      ? [
          "M112 159C213 159 204 220 310 220",
          "M112 174C213 174 224 228 310 228",
          "M112 298C213 298 204 235 310 235",
          "M112 310C213 310 224 243 310 243",
          "M474 228C511 228 523 215 569 215",
        ]
      : kind === "creative"
        ? ["M220 250H267", "M468 250H520"]
        : [
            "M232 265C277 265 279 250 327 250",
            "M232 278C280 278 294 275 345 275",
          ];
  const overview =
    kind === "daily"
      ? [
          "M265 130C366 130 343 245 445 245",
          "M265 146C366 146 363 253 445 253",
          "M265 352C366 352 343 261 445 261",
          "M265 366C366 366 363 267 445 267",
        ]
      : kind === "creative"
        ? ["M222 250H266", "M470 250H515"]
        : ["M180 250H227", "M456 250H502"];
  return (
    <svg
      className={`art-signal-paths art-signal-${kind}`}
      viewBox="0 0 740 500"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <g className="art-signal-focused">
        <g className="art-path-underlay">
          {focused.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g className="art-path-flow">
          {focused.map((d, i) => (
            <path key={i} d={d} pathLength="1" />
          ))}
        </g>
      </g>
      <g className="art-signal-overview">
        <g className="art-path-underlay">
          {overview.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g className="art-path-flow">
          {overview.map((d, i) => (
            <path key={i} d={d} pathLength="1" />
          ))}
        </g>
      </g>
    </svg>
  );
}

function DailyArt() {
  return (
    <div className="art-stage art-daily-stage">
      <SignalPaths kind="daily" />
      <div className="art-context-stack">
        <div className="art-source art-email-source">
          <div className="art-source-title">
            <ArtIcon name="email" />
            <span>Email</span>
          </div>
          <div className="art-source-copy">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="art-source art-calendar-source">
          <div className="art-source-title">
            <ArtIcon name="calendar" />
            <span>Calendar</span>
          </div>
          <div className="art-calendar-events">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="art-brief-panel">
        <div className="art-primary-icon">
          <ArtIcon name="brief" />
        </div>
        <strong>
          Your
          <br />
          daily brief.
        </strong>
        <div className="art-brief-preview">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="art-brief-details">
          <div className="art-brief-priority">
            <ArtIcon name="check" />
            <span>Project update summary</span>
          </div>
          <div className="art-brief-priority">
            <ArtIcon name="check" />
            <span>Upcoming meetings</span>
          </div>
          <div className="art-brief-priority">
            <ArtIcon name="check" />
            <span>What needs attention</span>
          </div>
          <div className="art-brief-priority">
            <ArtIcon name="check" />
            <span>Context for the next step</span>
          </div>
        </div>
      </div>
      <div className="art-conversation-panel">
        <div className="art-primary-icon">
          <ArtIcon name="conversation" />
        </div>
        <strong>
          Follow-up
          <br />
          conversation.
        </strong>
        <div className="art-chat-message">
          Here is your daily brief. What would you like to explore?
        </div>
        <div className="art-chat-message art-chat-question">
          Show me the context for the review.
        </div>
      </div>
      <div className="art-workflow-footer">
        <span>Context</span>
        <ArtIcon name="arrow" />
        <span>Priorities</span>
        <ArtIcon name="arrow" />
        <span>Conversation</span>
      </div>
      <span className="art-concept-note">Concept illustration</span>
    </div>
  );
}

function ReferenceTile({
  sample,
  className = "",
}: {
  sample: number;
  className?: string;
}) {
  return (
    <div className={`art-reference-sample art-sample-${sample} ${className}`} />
  );
}

function CreativeArt() {
  return (
    <div className="art-stage art-creative-stage">
      <SignalPaths kind="creative" />
      <div className="art-reference-wall">
        <div className="art-reference-grid">
          {[0, 1, 3, 2, 4, 5].map((sample) => (
            <ReferenceTile key={sample} sample={sample} />
          ))}
        </div>
        <span className="art-piece-label">Reference images</span>
      </div>
      <div className="art-guideline-panel">
        <div className="art-guideline-heading">
          VISUAL DNA
          <br />
          GUIDELINES
        </div>
        <div className="art-guideline-swatches">
          <i />
          <i />
          <i />
        </div>
        <div className="art-guideline-copy">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="art-guideline-image-row">
          <ReferenceTile sample={2} />
          <ReferenceTile sample={5} />
          <ReferenceTile sample={4} />
        </div>
        <span className="art-piece-label">Visual DNA guidelines</span>
      </div>
      <div className="art-menu-output">
        <div className="art-menu-cover">
          <span className="art-menu-name">CÔTE</span>
          <span className="art-menu-subtitle">MODERN COASTAL CUISINE</span>
          <ReferenceTile sample={0} className="art-menu-hero" />
        </div>
        <div className="art-menu-page">
          <span className="art-menu-page-name">CÔTE</span>
          <b>SMALL PLATES</b>
          <div className="art-menu-line">
            <i />
            <i />
          </div>
          <div className="art-menu-line">
            <i />
            <i />
          </div>
          <div className="art-menu-line">
            <i />
            <i />
          </div>
          <b>MAINS</b>
          <div className="art-menu-line">
            <i />
            <i />
          </div>
          <div className="art-menu-line">
            <i />
            <i />
          </div>
          <div className="art-menu-line">
            <i />
            <i />
          </div>
          <b>DESSERTS</b>
          <div className="art-menu-line">
            <i />
            <i />
          </div>
        </div>
        <span className="art-piece-label">Menu concept</span>
      </div>
      <div className="art-jsonl-format">
        {'{ "visual_dna": "…", "format": "menu" }'}
      </div>
      <div className="art-format-family">
        <span>Menu</span>
        <i />
        <span>Poster</span>
        <span>Flyer</span>
        <span>Card</span>
        <span>Social</span>
      </div>
      <span className="art-concept-note">Concept illustration</span>
    </div>
  );
}

function SlideVisual({ final = false }: { final?: boolean }) {
  return (
    <div
      className={`art-slide-visual ${final ? "art-slide-final-visual" : ""}`}
    >
      <div className="art-slide-photo" />
      <div className="art-slide-title">
        A clearer
        <br />
        tomorrow.
      </div>
      <div className="art-slide-footnote">Ideas deserve another draft.</div>
    </div>
  );
}

function SlideArt() {
  return (
    <div className="art-stage art-slide-stage">
      <SignalPaths kind="slide" />
      <div className="art-flat-slide">
        <span className="art-layer-label">
          <ArtIcon name="image" />
          Image
        </span>
        <SlideVisual />
      </div>
      <div className="art-editable-scene">
        <div className="art-slide-layout-plane">
          <span className="art-layer-label">Layout</span>
          <div className="art-layout-region" />
          <div className="art-layout-footer" />
        </div>
        <div className="art-slide-image-plane">
          <span className="art-layer-label">Image</span>
          <div className="art-slide-photo" />
        </div>
        <div className="art-slide-text-plane">
          <span className="art-layer-label">Text</span>
          <div className="art-editable-text">
            <span className="art-editable-before">
              A clearer
              <br />
              tomorrow.
            </span>
            <span className="art-editable-after">
              A clearer
              <br />
              vision.
            </span>
            <i />
            <i />
            <i />
            <i />
            <b />
          </div>
          <div className="art-slide-footnote">Ideas deserve another draft.</div>
        </div>
      </div>
      <div className="art-slide-final">
        <SlideVisual final />
      </div>
      <div className="art-workflow-footer">
        <span>Image</span>
        <ArtIcon name="arrow" />
        <span>Editable text, image & layout</span>
      </div>
      <span className="art-concept-note">Concept illustration</span>
    </div>
  );
}

/** Public-safe mechanism studies. Real role and release metadata stays in semantic page text. */
export function ProjectArt({
  slug,
  className = "",
  progress,
}: {
  slug: string;
  className?: string;
  progress?: number;
}) {
  const style =
    progress === undefined
      ? undefined
      : ({ "--workflow": Math.max(0, Math.min(1, progress)) } as CSSProperties);
  return (
    <div
      className={`project-art art-${slug} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {slug === "daily-smith" ? (
        <DailyArt />
      ) : slug === "creative-studio" ? (
        <CreativeArt />
      ) : (
        <SlideArt />
      )}
    </div>
  );
}
