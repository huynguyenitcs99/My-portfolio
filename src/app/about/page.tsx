import { ActionIcon } from "@/components/action-icon";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <main id="main" className="shell">
      <header className="page-heading">
        <p className="eyebrow">Huy Nguyen / AI engineer × creative builder</p>
        <h1>
          Curious by default.
          <br />
          <em>Building by doing.</em>
        </h1>
        <p>
          I build the intelligence behind useful tools — and keep exploring what
          else those tools could become.
        </p>
      </header>
      <div className="about-page-body">
        <div className="about-page-image">
          <Image
            src="/images/cosmic/portrait-smooth.webp"
            alt="Huy Nguyen"
            fill
            preload
            sizes="(max-width: 600px) 300px, 40vw"
          />
        </div>
        <div>
          <h2>What I’m building</h2>
          <p>
            I’m an AI engineer and creative builder. My current work spans
            context-aware agents and generative design: the AI pipeline behind
            Daily Smith, menu-generation and visual DNA research for Creative
            Studio, and Slide Design, where I’m the main PIC. Slide Design is in
            development.
          </p>
          <h2>The foundation</h2>
          <p>
            Before this, I worked across industrial computer vision,
            multi-camera re-identification and real-time audio software. Those
            projects taught me to think beyond a model: about the data,
            interfaces, runtime and delivery that make an AI system useful.
          </p>
          <p>
            I studied Computer Science and Technology in the honors program at
            Ho Chi Minh City University of Technology.
          </p>
          <h2>Room for both sides</h2>
          <p>
            I enjoy creative coding, image and video tools, and
            design-to-editable workflows. Claude Code and Codex are part of how
            I explore ideas and build. My two-tailed Nekomata signature
            represents that mix of engineering, imagination and a curious mind.
          </p>
          <Link className="inline-link" href="/#work">
            Explore the work <ActionIcon />
          </Link>
        </div>
      </div>
    </main>
  );
}
