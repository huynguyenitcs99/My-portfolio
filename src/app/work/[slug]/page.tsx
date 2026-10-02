import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { projects, legacySlugs } from "@/content/projects";
import { AgentArtwork, MenuArtwork, SlideArtwork } from "@/components/artwork";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.title} · Huy Nguyen`,
      description: project.summary,
      url: `/work/${slug}`,
    },
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  if (Object.hasOwn(legacySlugs, slug))
    permanentRedirect(`/work/${legacySlugs[slug]}`);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main id="main" className="shell case-page">
      <Link href="/work" className="case-back">
        ← All work
      </Link>
      <header className="case-heading">
        <p className="eyebrow">{project.eyebrow}</p>
        <h1>
          {project.title}
          <em>.</em>
        </h1>
        <p>{project.intro}</p>
      </header>
      <dl className="case-meta">
        <div>
          <dt>My contribution</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Context</dt>
          <dd>{project.company}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{project.status}</dd>
        </div>
      </dl>
      <figure className="case-cover">
        <div className="case-cover-media">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} — existing public project media`}
              fill
              preload
              sizes="(max-width: 700px) 92vw, 1240px"
            />
          ) : project.slug === "creative-studio" ? (
            <MenuArtwork />
          ) : project.slug === "daily-smith" ? (
            <AgentArtwork />
          ) : (
            <SlideArtwork />
          )}
        </div>
        <figcaption>
          {project.image
            ? "Existing public case media, retained from my earlier portfolio."
            : "Illustrative concept graphic · not product output or a live demonstration."}
        </figcaption>
      </figure>
      <div className="case-content">
        {project.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
        <div className="case-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.link && (
          <a
            className="inline-link case-source"
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.link.label} ↗
          </a>
        )}
      </div>
      {project.media && (
        <div className="case-gallery">
          {project.media.map((media) => (
            <figure key={media.src}>
              <div className="case-gallery-media">
                <Image
                  src={media.src}
                  alt={media.caption}
                  fill
                  sizes="(max-width: 700px) 92vw, 46vw"
                />
              </div>
              <figcaption>{media.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
      <div className="case-next">
        <span>Keep exploring</span>
        <Link href={`/work/${next.slug}`}>{next.title} ↗</Link>
      </div>
    </main>
  );
}
