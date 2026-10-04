import { ActionIcon } from "@/components/action-icon";
import Image from "next/image";
import Link from "next/link";
import { CosmicExperience } from "@/components/cosmic/experience";
import { ProjectArt } from "@/components/cosmic/project-art";
import { MotionStudy } from "@/components/motion-study";
import { Nekomata } from "@/components/marks";
import { contact, projects } from "@/content/projects";

const currentProjects = ["daily-smith", "creative-studio", "slide-design"].map(
  (slug) => projects.find((p) => p.slug === slug)!,
);
const chapters = [
  {
    slug: "daily-smith",
    number: "01",
    category: "CONTEXT → CLARITY",
    title: (
      <>
        Context becomes
        <br />
        <em>clarity.</em>
      </>
    ),
    description:
      "Your day is scattered across emails and calendars. I build the AI layer that connects that context, surfaces what matters, and keeps the conversation going.",
    role: "PIC · AI pipeline & LLM-agent layer",
    steps: [
      "Email + calendar",
      "Connected context",
      "Priorities + conversation",
    ],
    result:
      "My work connects provider tools, data flow and agent reasoning into the daily experience.",
    status: "Released · Chat Smith",
  },
  {
    slug: "creative-studio",
    number: "02",
    category: "REFERENCE → VISUAL DNA",
    title: (
      <>
        One visual language,
        <br />
        <em>carried through.</em>
      </>
    ),
    description:
      "I adapted a poster pipeline for menus, then redesigned how visual references guide generation: a coherent design language, captured as visual DNA.",
    role: "Contributor · Menu pipeline & visual DNA research",
    steps: ["Reference images", "Visual DNA / JSONL", "Guided generation"],
    result:
      "The poster pipeline owner adopted my method across posters, flyers, business cards and social content.",
    status: "Released · Chat Smith",
  },
  {
    slug: "slide-design",
    number: "03",
    category: "IMAGE → EDITABLE",
    title: (
      <>
        From an image
        <br />
        <em>to editable elements.</em>
      </>
    ),
    description:
      "A slide image is a starting point. One module in my Slide Design work explores turning image-based slides into editable slides, so the creative work can continue.",
    role: "Main PIC · Slide Design",
    steps: ["Image-based slide", "Conversion workflow", "Editable slide"],
    result:
      "Currently in development. This is a concept overview of the workflow, ahead of a public release.",
    status: "In development",
  },
];

export default function Home() {
  return (
    <main id="main">
      <CosmicExperience projects={currentProjects}>
        <section
          id="identity"
          className="identity-chapter"
          aria-labelledby="hero-title"
        >
          <div className="identity-copy">
            <h1 id="hero-title" className="hero-name" aria-label="Huy Nguyen">
              <span className="hero-row-huy"><span className="hero-name-ink">Hu<span className="hero-y">y</span></span></span>
              <span className="hero-row-nguyen"><span className="hero-name-ink">Nguyen</span></span>
            </h1>
            <div className="hero-positioning">
              <h2>
                AI engineer.
                <br className="mobile-break" /> Creative by instinct.
              </h2>
              <p className="hero-description">
                AI agents, generative design
                <br />
                and tools for creative work.
              </p>
              <a className="hero-explore" href="#work">
                Explore the work <ActionIcon name="right" />
              </a>
            </div>
          </div>
          <div
            className="arrival-proof"
            aria-label="Creative Studio contribution overview"
          >
            <svg className="arrival-horizon" viewBox="0 0 1536 96" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="horizon-light"><stop stopColor="#e9e6df" /><stop offset=".45" stopColor="#a6c8ed" /><stop offset=".72" stopColor="#647f9b" /><stop offset="1" stopColor="#d6eaff" /></linearGradient></defs>
              <path className="horizon-surface" d="M-32 19 C400 42 980 77 1568 22 L1568 96 L-32 96Z" />
              <path className="horizon-halo" d="M-32 19 C400 42 980 77 1568 22" />
              <path className="horizon-edge" d="M-32 19 C400 42 980 77 1568 22" />
            </svg>
            <div className="arrival-proof-copy">
              <span className="proof-sequence">02 /</span>
              <h2>
                One visual language,
                <br />
                carried through.
              </h2>
              <p>A reference image layout becomes a compact guideline, then a menu.</p>
              <span>Contributor · Released<br />Menu pipeline + Visual DNA · Concept artwork</span>
            </div>
            <div className="arrival-proof-flow" aria-hidden="true">
              <ProjectArt slug="creative-studio" className="proof-flow-art" progress={1} />
              <span className="proof-transfer proof-transfer-one"><ActionIcon name="right" /></span>
              <span className="proof-transfer proof-transfer-two"><ActionIcon name="right" /></span>
              <div className="proof-flow-labels">
                <span>Reference images</span><span>Visual DNA guidelines</span><span>Menu design</span>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <span>Engineering × imagination</span>
            <span>
              Scroll to explore <ActionIcon name="down" />
            </span>
          </div>
        </section>
        <div id="work" className="work-anchor" />
        {chapters.map((chapter) => (
          <section
            id={chapter.slug}
            className={`project-chapter chapter-${chapter.number}`}
            key={chapter.slug}
            aria-labelledby={`heading-${chapter.slug}`}
          >
            <div className="chapter-copy">
              <h2 id={`heading-${chapter.slug}`}>{chapter.title}</h2>
              <div className="chapter-meta">
                <strong>
                  {currentProjects.find((p) => p.slug === chapter.slug)?.title}
                </strong>
                <span className="status-tag">{chapter.status}</span>
              </div>
              <div className="contribution">
                <small>MY CONTRIBUTION</small>
                <strong>{chapter.role}</strong>
              </div>
              <div className="chapter-mobile-art">
                <ProjectArt slug={chapter.slug} />
              </div>
              <p className="chapter-description">{chapter.description}</p>

              <ol className="flow-steps">
                {chapter.steps.map((step, i) => (
                  <li key={step}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="chapter-result">{chapter.result}</p>
              <Link className="inline-link" href={`/work/${chapter.slug}`}>
                Inside{" "}
                {currentProjects.find((p) => p.slug === chapter.slug)?.title}{" "}
                <span>
                  <ActionIcon />
                </span>
              </Link>
              <p className="art-note">
                Concept artwork ·{" "}
                {chapter.slug === "slide-design"
                  ? "unreleased team project"
                  : "team product"}
              </p>
            </div>
          </section>
        ))}
      <section id="engineering" className="engineering-section">
        <div className="section-intro">
          <h2>
            Built beyond
            <br />
            <em>the concept.</em>
          </h2>
          <p>
            Before agents and generative design: production inspection,
            multi-camera vision, and real-time audio. The work that taught me to
            connect models to the world.
          </p>
        </div>
        <div className="foundation-list">
          {projects.slice(3).map((project) => (
            <Link
              href={`/work/${project.slug}`}
              className="foundation-project"
              key={project.slug}
            >
              <div className="foundation-image">
                <Image
                  src={project.image!}
                  alt={`${project.title} project interface`}
                  fill
                  sizes="(max-width: 700px) 80vw, 25vw"
                />
              </div>
              <div className="foundation-copy">
                <h3>{project.title}</h3>
                <p>
                  {project.slug === "nextsight"
                    ? "Segmentation, inference and camera integration for industrial inspection."
                    : project.slug === "multi-camera-reid"
                      ? "A four-camera proof of concept connecting detection, identity matching and runtime integration."
                      : "Audio pipelines, application integration and release tooling for AI noise cancellation."}
                </p>
                <span className="foundation-role">{project.role}</span>
              </div>
              <span className="foundation-arrow">
                <ActionIcon />
              </span>
            </Link>
          ))}
        </div>
        <Link className="inline-link" href="/work">
          The complete work index{" "}
          <span>
            <ActionIcon />
          </span>
        </Link>
      </section>
      <section id="playground" className="playground-section">
        <div className="section-intro">
          <h2>
            Ideas move.
            <br />
            <em>Then they become useful.</em>
          </h2>
          <p>
            Image and video tools, creative coding, motion, and ideas that don’t
            fit neatly into a job title. A space to try things and learn by
            building.
          </p>
        </div>
        <MotionStudy />
        <div className="playground-foot">
          <p>Context → clarity. Reference → design. Image → editable.</p>
          <span>Personal Remotion study · illustrative workflows</span>
        </div>
      </section>
      <section id="about" className="about-section">
        <div className="about-signal">
          <Image
            src="/images/cosmic/portrait-c-lit.webp"
            alt="Huy Nguyen"
            fill
            sizes="(max-width: 800px) 80vw, 45vw"
          />
          <div className="about-mark">
            <Nekomata size={72} />
            <span>
              One mind.
              <br />
              Two sides.
            </span>
          </div>
        </div>
        <div className="about-copy">
          <h2>
            Engineering meets
            <br />
            <em>imagination.</em>
          </h2>
          <p>
            I turn complex AI workflows into useful creative tools.
          </p>
          <p>
            My two-tailed Nekomata brings those sides together: engineering and
            imagination, moving in the same direction.
          </p>
          <Link className="inline-link" href="/about">
            A little more about me{" "}
            <span>
              <ActionIcon />
            </span>
          </Link>
      <section id="contact" className="contact-section">
        <h2>
          Let’s build something useful.
          <a
            className="contact-orb"
            href={`mailto:${contact.email}`}
            aria-label="Email Huy Nguyen"
          >
            <ActionIcon />
          </a>
        </h2>
        <div className="contact-details">
          <a className="email-link" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <div>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ActionIcon />
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub <ActionIcon />
            </a>
          </div>
        </div>
      </section>
          <div className="closing-work" aria-label="Continue exploring the work">
            <Link href="/work/creative-studio" aria-label="Explore Creative Studio"><div className="closing-reference" /></Link>
            <Link href="/work/slide-design" aria-label="Explore Slide Design"><Image src="/images/cosmic/slide-landscape-c.webp" alt="" fill sizes="15vw" /></Link>
            <Link href="/work" aria-label="Explore all work"><Nekomata size={46} /><ActionIcon name="right" /></Link>
          </div>
        </div>
      </section>

      </CosmicExperience>
    </main>
  );
}
