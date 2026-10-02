import Image from "next/image";
import Link from "next/link";
import { OrbitShowcase } from "@/components/orbit";
import { Reveal } from "@/components/reveal";
import { ProjectGrid } from "@/components/project-grid";
import { Nekomata, TwinPaths } from "@/components/marks";
import { SlideStudy } from "@/components/slide-study";
import { MotionStudy } from "@/components/motion-study";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-positioning">
        <div className="hero-topline">
          <span>
            <i className="status-dot" /> AI Engineer at Vulcan Labs
          </span>
          <span>HO CHI MINH CITY, VIETNAM</span>
        </div>
        <div className="hero-name" aria-label="Huy Nguyen">
          <span>HUY</span>
          <span>
            NGUYEN
            <svg className="name-star" viewBox="0 0 60 60" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <line
                  key={i}
                  x1="30"
                  y1="8"
                  x2="30"
                  y2="20"
                  transform={`rotate(${i * 45} 30 30)`}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </span>
        </div>
        <div className="hero-bottom">
          <div className="hero-copy">
            <h1 id="hero-positioning">
              AI engineer.
              <br />
              <em>Creative builder.</em>
            </h1>
            <p>
              I turn AI into things people can use.
              <br />
              From agents that understand context
              <br />
              to tools that open up creative possibilities.
            </p>
            <a className="pill-link" href="#work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="portrait-composition">
            <div className="portrait-frame">
              <Image
                src="/images/avatar.jpg"
                alt="Huy Nguyen"
                fill
                preload
                sizes="(max-width: 600px) 42vw, 390px"
              />
            </div>
            <span className="portrait-note">hi, I’m Huy.</span>
            <span className="portrait-stamp">
              <Nekomata size={88} />
            </span>
            <TwinPaths className="portrait-paths" />
          </div>
          <div className="hero-aside">
            <span className="vertical-note">ENGINEERING × IMAGINATION</span>
            <span className="hero-index">
              A little curiosity.
              <br />A lot of making.
            </span>
          </div>
        </div>
        <div className="hero-foot">
          <span>LLM agents / generative design / creative tools</span>
          <span>Keep scrolling. There’s more to the story. ↓</span>
        </div>
      </section>

      <OrbitShowcase />

      <section
        id="creative-method"
        className="method-section shell"
        aria-labelledby="method-title"
      >
        <Reveal className="method-heading">
          <p className="eyebrow">The contribution behind the creative</p>
          <h2 id="method-title">
            A visual language.
            <br />
            <em>Not just a prompt.</em>
          </h2>
        </Reveal>
        <div className="method-body">
          <div className="method-text">
            <p className="large-copy">
              A reference carries a whole design direction. I wanted the
              pipeline to learn from that coherence.
            </p>
            <p>
              I adapted the existing poster pipeline for menus, then researched
              a method to extract visual DNA from reference images into JSONL
              descriptions used as generation guidelines.
            </p>
            <p>
              The original poster pipeline’s owner later adopted my approach for
              posters, flyers, business cards and social content.
            </p>
            <span className="role-note">
              My role: contributor · menu pipeline + visual DNA research
            </span>
            <Link className="inline-link" href="/work/creative-studio">
              Read the approach <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <Reveal className="dna-diagram">
            <div className="dna-step">
              <small>01 / OBSERVE</small>
              <div className="reference-stack">
                <i />
                <i />
                <i />
              </div>
              <strong>Reference images</strong>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              ↓
            </span>
            <div className="dna-step dna-step-json">
              <small>02 / DESCRIBE</small>
              <span className="json-glyph" aria-hidden="true">
                {"{ : }"}
              </span>
              <strong>
                DNA descriptions <span>(JSONL)</span>
              </strong>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              ↓
            </span>
            <div className="dna-step">
              <small>03 / GUIDE</small>
              <div className="guideline-lines" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <strong>Generation guidelines</strong>
            </div>
            <p className="diagram-caption">
              Illustrative method overview · not a production schema
            </p>
          </Reveal>
        </div>
        <div className="method-formats">
          <span>One approach. More creative formats.</span>
          <div>
            <span>Menus</span>
            <span>Posters</span>
            <span>Flyers</span>
            <span>Business cards</span>
            <span>Social</span>
          </div>
        </div>
      </section>

      <section
        id="daily-smith"
        className="daily-section"
        aria-labelledby="daily-title"
      >
        <div className="shell">
          <div className="daily-heading">
            <div>
              <p className="eyebrow">02 — Daily Smith / Chat Smith</p>
              <h2 id="daily-title">
                From context
                <br />
                to <em>clarity.</em>
              </h2>
            </div>
            <div className="daily-summary">
              <span className="dark-tag">AI pipeline / LLM-agent PIC</span>
              <p>
                I design the AI pipeline and data flow that turn connected
                information into a useful daily overview and follow-up
                conversation.
              </p>
              <Link className="inline-link" href="/work/daily-smith">
                Inside the pipeline <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <Reveal className="daily-flow">
            <div className="source-group">
              <span className="flow-label">CONNECTED CONTEXT</span>
              <div className="source-pill">
                <span aria-hidden="true">@</span>Email
              </div>
              <div className="source-pill">
                <span aria-hidden="true">▦</span>Calendar
              </div>
              <small>MCP / provider tools</small>
            </div>
            <div className="flow-connector" aria-hidden="true">
              <i />
              <i />
            </div>
            <div className="context-core">
              <span className="core-orbit" />
              <span className="core-orbit second" />
              <span>
                LLM
                <br />
                <b>context</b>
              </span>
            </div>
            <div className="flow-connector" aria-hidden="true">
              <i />
            </div>
            <div className="daily-brief">
              <span className="flow-label">A CLEARER DAY</span>
              <div>
                <small>01</small>
                <span>Daily priorities</span>
              </div>
              <div>
                <small>02</small>
                <span>Important emails & updates</span>
              </div>
              <div>
                <small>03</small>
                <span>Information to pay attention to</span>
              </div>
              <p>
                Then, ask a follow-up. <span aria-hidden="true">↗</span>
              </p>
            </div>
          </Reveal>
          <div className="daily-caption">
            <span>Connect → understand → prioritize → converse</span>
            <span>Illustrative flow · no private account data</span>
          </div>
        </div>
      </section>

      <section
        id="slide-design"
        className="slide-section shell"
        aria-labelledby="slide-title"
      >
        <div className="slide-copy">
          <p className="eyebrow">03 — Slide Design</p>
          <span className="development-badge">
            <i />
            In development
          </span>
          <h2 id="slide-title">
            An image.
            <br />
            <em>New possibilities.</em>
          </h2>
          <p className="large-copy">
            From image-based slides
            <br />
            to editable slides.
          </p>
          <p>
            I’m the main PIC for Slide Design. Image-to-editable conversion is
            one module: a practical bridge between a visual idea and a slide
            someone can keep working with.
          </p>
          <Link className="inline-link" href="/work/slide-design">
            Explore the development note ↗
          </Link>
        </div>
        <SlideStudy />
      </section>

      <section
        id="engineering"
        className="engineering-section shell"
        aria-labelledby="engineering-title"
      >
        <Reveal className="section-intro">
          <p className="eyebrow">04 — Engineering roots</p>
          <div>
            <h2 id="engineering-title">
              Built beyond
              <br />
              <em>the prototype.</em>
            </h2>
            <p>
              The computer vision, audio and application work that shaped how I
              build.
            </p>
          </div>
        </Reveal>
        <ProjectGrid projects={projects.slice(3)} />
      </section>

      <section
        id="playground"
        className="playground-section shell"
        aria-labelledby="playground-title"
      >
        <div className="playground-heading">
          <p className="eyebrow">05 — Experiments & interests</p>
          <h2 id="playground-title">
            Serious curiosity.
            <br />
            <em>Room to play.</em>
          </h2>
          <p>
            Creative coding, image and video tools, and workflows that make
            designs editable. I like finding out what happens when engineering
            meets a new medium.
          </p>
        </div>
        <MotionStudy />
        <div className="interest-strip">
          <span>Creative coding</span>
          <span>Image & video tools</span>
          <span>Design-to-editable workflows</span>
          <span>Claude Code / Codex</span>
        </div>
      </section>

      <section
        id="about"
        className="about-section shell"
        aria-labelledby="about-title"
      >
        <div className="about-mark">
          <Nekomata size={320} />
          <span>TWO TAILS. ONE CURIOUS MIND.</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">The person behind the pipelines</p>
          <h2 id="about-title">
            Curious by default.
            <br />
            <em>Building by doing.</em>
          </h2>
          <p className="large-copy">I’m Huy, an AI engineer at Vulcan Labs.</p>
          <p>
            I build agents and generative AI pipelines, with a background in
            computer vision and audio software. I’m drawn to the space where a
            technical system becomes a useful creative tool.
          </p>
          <p>
            My Nekomata signature brings together a cat, Gemini’s duality and
            two tails that look a little like connected ideas. Engineering and
            imagination, in the same silhouette.
          </p>
          <Link className="inline-link" href="/about">
            A little more about me ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
