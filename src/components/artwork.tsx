export function MenuArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`menu-art ${compact ? "compact" : ""}`} aria-hidden="true">
      <div className="menu-art-sheet sheet-back">
        <span>
          VISUAL
          <br />
          LANGUAGE
        </span>
        <div className="art-bars">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="menu-art-sheet sheet-front">
        <span className="art-overline">A STUDY IN TASTE & FORM</span>
        <strong>
          Form
          <br />
          <em>& flavour.</em>
        </strong>
        <svg className="botanical" viewBox="0 0 220 240" fill="none">
          <path
            d="M110 222C74 140 124 98 102 10M110 180C29 196 19 131 13 105C88 102 89 139 110 180ZM109 131C195 148 207 71 206 43C128 48 116 87 109 131ZM105 77C41 76 38 24 38 5C81 13 99 34 105 77Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M108 175L27 116M109 123L188 59M105 71L48 17"
            stroke="currentColor"
          />
        </svg>
        <span className="menu-art-footer">
          REFERENCE → RHYTHM → COMPOSITION
        </span>
      </div>
      <div className="art-disc" />
      <span className="art-corner">01 / DNA</span>
    </div>
  );
}

export function AgentArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`agent-art ${compact ? "compact" : ""}`} aria-hidden="true">
      <div className="agent-source source-mail">
        @<small>Email</small>
      </div>
      <div className="agent-source source-calendar">
        24<small>Calendar</small>
      </div>
      <div className="agent-core">
        <span>context</span>
        <b>→</b>
        <span>clarity</span>
      </div>
      <div className="agent-orbit orbit-one" />
      <div className="agent-orbit orbit-two" />
      <span className="art-corner">02 / AGENT</span>
    </div>
  );
}

export function SlideArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`slide-art ${compact ? "compact" : ""}`} aria-hidden="true">
      <div className="slide-layer layer-shape">
        <div className="slide-shape" />
      </div>
      <div className="slide-layer layer-image">
        <div className="slide-landscape" />
      </div>
      <div className="slide-layer layer-text">
        <small>A NEW PERSPECTIVE</small>
        <strong>
          Ideas,
          <br />
          <em>in layers.</em>
        </strong>
      </div>
      <span className="layer-label">text / image / shape</span>
      <span className="art-corner">03 / EDITABLE</span>
    </div>
  );
}
