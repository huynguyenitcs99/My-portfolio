import { contact } from "@/content/projects";
import { Nekomata } from "./marks";

export function Footer() {
  return (
    <footer id="contact" className="contact-section shell">
      <div className="contact-top">
        <p className="eyebrow">Something on your mind?</p>
        <span>Let’s make it real.</span>
      </div>
      <a className="contact-title" href={`mailto:${contact.email}`}>
        Say <em>hello.</em>
        <span aria-hidden="true">↗</span>
      </a>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          <Nekomata size={36} /> Huy Nguyen · AI engineer × creative builder
        </span>
        <span>Built with curiosity. © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
