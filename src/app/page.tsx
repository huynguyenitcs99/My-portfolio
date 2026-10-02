import Image from "next/image";
import Link from "next/link";
import { Arrival, OrbitShowcase } from "@/components/orbit";
import { Reveal } from "@/components/reveal";
import { Nekomata } from "@/components/marks";
import { SlideStudy } from "@/components/slide-study";
import { MotionStudy } from "@/components/motion-study";
import { AtlasTile } from "@/components/artwork";
import { contact } from "@/content/projects";
import { UIIcon } from "@/components/ui-icon";

const roots = [
  [
    "NextSight",
    "nextsight",
    "Industrial defect inspection using computer vision.",
  ],
  [
    "Multi-camera ReID",
    "multi-camera-reid",
    "Person re-identification across multiple cameras.",
  ],
  [
    "CrystalSound",
    "crystalsound",
    "Audio software integration for clearer sound.",
  ],
];
const scenes = [
  "Identity",
  "Work",
  "Visual DNA",
  "Daily Smith",
  "Slide Design",
  "Engineering",
  "Experiments",
  "Contact",
];
const sceneIds = [
  "identity",
  "work",
  "creative-method",
  "daily-smith",
  "slide-design",
  "engineering",
  "playground",
  "contact",
];

export default function Home() {
  return (
    <main id="main" className="story-home">
      <Arrival />
      <OrbitShowcase />
      <section
        id="creative-method"
        className="story-scene method-scene shell"
        aria-labelledby="method-title"
      >
        <div className="botanical-corner method-botanical" aria-hidden="true">
          <Image src="/images/story/botanical.png" alt="" fill sizes="300px" />
        </div>
        <Reveal>
          <p className="scene-kicker">03 / Visual DNA method</p>
          <h2 id="method-title">
            Better guidelines.
            <br />
            Better visual coherence.
          </h2>
          <p className="scene-subtitle">
            A method first developed for menus, then adopted across other
            formats.
          </p>
        </Reveal>
        <div className="method-cards">
          <Reveal className="method-card references-card">
            <h3>Reference images</h3>
            <div className="reference-mosaic">
              {[0, 1, 2, 3].map((i) => (
                <div
                  className={`reference-detail reference-detail-${i}`}
                  key={i}
                >
                  <Image
                    src="/images/story/creative.png"
                    alt={
                      i === 0
                        ? "Botanical menu concept details — illustrative visual references"
                        : ""
                    }
                    fill
                    sizes="(max-width: 600px) 200px, 420px"
                  />
                </div>
              ))}
            </div>
          </Reveal>
          <span className="method-arrow" aria-hidden="true">
            →
          </span>
          <Reveal className="method-card json-card">
            <h3>
              DNA descriptions <span>(JSONL)</span>
            </h3>
            <pre aria-label="Illustrative description, not the production schema">
              {
                '{\n  "subject": "food_menu",\n  "style": "natural editorial",\n  "tone": "warm, textured",\n  "elements": ["botanical",\n               "paper"],\n  "typography": "serif"\n}'
              }
            </pre>
            <small>Illustrative description</small>
          </Reveal>
          <span className="method-arrow" aria-hidden="true">
            →
          </span>
          <Reveal className="method-card guidelines-card">
            <h3>
              Generation
              <br />
              guidelines
            </h3>
            <ul>
              <li>Visual direction</li>
              <li>Composition rules</li>
              <li>Color palette</li>
              <li>Typography notes</li>
              <li>Element vocabulary</li>
              <li>Usage guidance</li>
            </ul>
            <div className="guideline-leaf" aria-hidden="true">
              <Image
                src="/images/story/botanical.png"
                alt=""
                fill
                sizes="100px"
              />
            </div>
          </Reveal>
        </div>
        <div className="method-context">
          <p>
            I ported the existing poster pipeline to menus, then researched
            visual DNA extraction from reference images into JSONL descriptions
            for generation guidelines. The poster pipeline’s owner later adopted
            my approach for posters, flyers, business cards and social content.
          </p>
          <Link href="/work/creative-studio" className="inline-link">
            Menu pipeline + visual DNA research · Contributor{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <p className="concept-note">
          Method illustration · not a production schema or measured output
          comparison
        </p>
      </section>
      <section
        id="daily-smith"
        className="story-scene daily-scene shell"
        aria-labelledby="daily-title"
      >
        <Image
          className="daily-backdrop"
          src="/images/story/daily.png"
          alt=""
          fill
          sizes="(max-width: 800px) 100vw, 1240px"
        />
        <div className="daily-content">
          <p className="scene-kicker">04 / Daily Smith — Chat Smith</p>
          <h2 id="daily-title">
            From context
            <br />
            to clarity.
          </h2>
          <p className="daily-role">
            Daily Smith — AI pipeline / LLM-agent PIC
          </p>
          <div className="agent-flow">
            <Reveal className="agent-sources">
              <h3>
                Sources <small>(Confirmed)</small>
              </h3>
              <div>
                <UIIcon name="mail" />
                Email
              </div>
              <div>
                <UIIcon name="calendar" />
                Calendar
              </div>
            </Reveal>
            <div className="agent-engine">
              <span>
                MCP / Provider tools
                <br />
                (Context processing)
              </span>
            </div>
            <Reveal className="agent-outputs">
              <h3>Outputs</h3>
              <div>
                <UIIcon name="context" />
                Context understanding
              </div>
              <div>
                <UIIcon name="priorities" />
                Daily priorities
              </div>
              <div>
                <UIIcon name="chat" />
                Follow-up conversation
              </div>
            </Reveal>
          </div>
          <div className="daily-scene-foot">
            <Link href="/work/daily-smith">
              Inside the AI pipeline <span aria-hidden="true">↗</span>
            </Link>
            <span>Illustrative flow · no private account data</span>
          </div>
        </div>
        <span className="handwritten daily-hand" aria-hidden="true">
          Same information.
          <br />
          Clearer thinking.
        </span>
      </section>
      <section
        id="slide-design"
        className="story-scene slide-scene shell"
        aria-labelledby="slide-title"
      >
        <div className="slide-scene-heading">
          <p className="scene-kicker">05 / Slide Design</p>
          <div>
            <h2 id="slide-title">Slide Design</h2>
            <span className="development-badge">In development</span>
          </div>
          <p className="scene-subtitle">Main PIC · Concept preview</p>
        </div>
        <div className="slide-scene-body">
          <div className="slide-scene-copy">
            <h3>
              From image
              <br />
              to editable slides.
            </h3>
            <p>
              Turn static designs into structured, editable layers using AI.
            </p>
            <Link href="/work/slide-design" className="inline-link">
              Development note ↗
            </Link>
          </div>
          <SlideStudy />
          <div className="editable-tags">
            {["Text", "Image", "Shape", "Vector"].map((label, i) => (
              <div key={label}>
                <span aria-hidden="true">{["T", "▧", "□", "⌁"][i]}</span>
                {label} layer
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="engineering"
        className="story-scene roots-scene shell"
        aria-labelledby="engineering-title"
      >
        <Reveal>
          <p className="scene-kicker">06 / Engineering roots</p>
          <h2 id="engineering-title">Built on real engineering work.</h2>
        </Reveal>
        <div className="roots-grid">
          {roots.map(([title, slug, summary], i) => (
            <Link href={`/work/${slug}`} className="root-card" key={slug}>
              <h3>{title}</h3>
              <AtlasTile source="engineering" index={i} />
              <p>
                {summary}
                <span aria-hidden="true">↗</span>
              </p>
            </Link>
          ))}
        </div>
        <p className="concept-note">
          Illustrative covers · real project media and contribution details
          inside each case study
        </p>
      </section>
      <section
        id="playground"
        className="story-scene gallery-scene shell"
        aria-labelledby="playground-title"
      >
        <Reveal>
          <p className="scene-kicker">07 / Experiments & interests</p>
          <h2 id="playground-title">Things I’m exploring.</h2>
          <p className="scene-subtitle">
            Generative art, video editing, design tools and more.
          </p>
        </Reveal>
        <div className="gallery-composition">
          <div className="creative-gallery">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Reveal key={i} className="gallery-tile">
                <AtlasTile index={i} />
                {i === 4 && <MotionStudy />}
              </Reveal>
            ))}
          </div>
          <div className="cat-sticker">
            <Nekomata size={180} />
            <span className="handwritten">
              Ideas
              <br />
              into
              <br />
              things.
            </span>
          </div>
        </div>
        <div className="gallery-interests">
          {[
            "Generative art",
            "Video editing",
            "Design tools",
            "Creative workflows",
            "Experiments",
            "More to come",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <p className="concept-note">
          Personal concept artwork · the timeline tile is animated with Remotion
        </p>
      </section>
      <section
        id="about"
        className="story-scene person-scene shell"
        aria-labelledby="about-title"
      >
        <div className="botanical-corner person-botanical" aria-hidden="true">
          <Image src="/images/story/botanical.png" alt="" fill sizes="250px" />
        </div>
        <div className="person-portrait">
          <Image
            src="/images/story/portrait.png"
            alt="Huy Nguyen"
            fill
            sizes="(max-width: 600px) 85vw, 550px"
          />
          <span className="handwritten" aria-hidden="true">
            Same curiosity.
            <br />
            More things.
          </span>
        </div>
        <div className="person-copy" id="contact">
          <p className="scene-kicker">08 / Person + contact</p>
          <h2 id="about-title">
            Curious by default.
            <br />
            Building by doing.
          </h2>
          <p className="person-byline">
            <strong>Huy Nguyen</strong>
            <span>AI engineer at Vulcan Labs</span>
          </p>
          <p className="person-description">
            I build agents and generative AI pipelines, with roots in computer
            vision and audio software. I like making technical ideas useful,
            visual and editable.
          </p>
          <a className="hello-button" href={`mailto:${contact.email}`}>
            Say hello <span aria-hidden="true">→</span>
            <span className="hello-envelope">
              <UIIcon name="mail" />
            </span>
          </a>
          <div className="person-links">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href={`mailto:${contact.email}`}>Email ↗</a>
            <Link href="/about">About me ↗</Link>
          </div>
        </div>
        <nav className="scene-index" aria-label="Story index">
          {scenes.map((scene, i) => (
            <a href={`#${sceneIds[i]}`} key={scene}>
              <small>{String(i + 1).padStart(2, "0")}</small>
              {scene}
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
