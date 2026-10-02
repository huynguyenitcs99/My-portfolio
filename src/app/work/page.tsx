import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/content/projects";
export const metadata: Metadata = {
  title: "Selected work",
  alternates: { canonical: "/work" },
};
export default function WorkPage() {
  return (
    <main id="main" className="shell work-page">
      <header className="page-heading">
        <p className="eyebrow">Agents / design / engineering</p>
        <h1>
          Ideas into
          <br />
          <em>things.</em>
        </h1>
        <p>
          Current AI work and earlier engineering foundations. Each case
          explains my part in the product, the approach and its public scope.
        </p>
      </header>
      <ProjectGrid projects={projects} />
    </main>
  );
}
