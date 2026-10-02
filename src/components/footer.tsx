import { contact } from "@/content/projects";
import { Nekomata } from "./marks";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="story-footer shell">
      <span>
        <Nekomata size={30} />
        Huy Nguyen · AI engineer × creative builder
      </span>
      <div>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
        <Link href="/#identity">Back to top ↑</Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
