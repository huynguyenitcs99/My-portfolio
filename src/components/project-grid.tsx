import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { AgentArtwork, MenuArtwork, SlideArtwork } from "./artwork";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <Link
          className="project-tile"
          key={project.slug}
          href={`/work/${project.slug}`}
        >
          <div className="project-tile-media">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} — existing public project media`}
                fill
                sizes="(max-width: 700px) 92vw, 30vw"
              />
            ) : project.slug === "creative-studio" ? (
              <MenuArtwork compact />
            ) : project.slug === "daily-smith" ? (
              <AgentArtwork compact />
            ) : (
              <SlideArtwork compact />
            )}
            <span className="tile-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <div className="tile-meta">
            <span>{project.eyebrow}</span>
            <span>{project.status}</span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </Link>
      ))}
    </div>
  );
}
