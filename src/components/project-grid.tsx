import { ActionIcon } from "@/components/action-icon";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectArt } from "@/components/cosmic/project-art";

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
            ) : (
              <ProjectArt slug={project.slug} />
            )}
            <span className="tile-arrow" aria-hidden="true">
              <ActionIcon />
            </span>
          </div>
          <h3>{project.title}</h3>
          <div className="tile-meta">
            <span>{project.eyebrow}</span>
            <span>{project.status}</span>
          </div>
          <p>{project.summary}</p>
        </Link>
      ))}
    </div>
  );
}
