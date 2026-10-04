import { ActionIcon } from "@/components/action-icon";
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
          GitHub <ActionIcon />
        </a>
        <Link href="/#identity">
          Back to top <ActionIcon name="up" />
        </Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
      <details className="scene-credits">
        <summary>Cosmic scene credits</summary>
        <p>
          Sun observation courtesy of{" "}
          <a href="https://sdo.gsfc.nasa.gov/data/">
            NASA/SDO and the AIA, EVE, and HMI science teams
          </a>
          . Lunar maps:{" "}
          <a href="https://svs.gsfc.nasa.gov/4720/">
            NASA’s Scientific Visualization Studio, LRO, LROC and LOLA
          </a>
          . Earth textures:{" "}
          <a href="https://threejs.org/examples/">Three.js examples</a>. An
          art-directed scene with interpreted solar color, lighting and motion.
        </p>
      </details>
    </footer>
  );
}
