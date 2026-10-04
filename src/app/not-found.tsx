import { ActionIcon } from "@/components/action-icon";
import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="shell not-found">
      <p className="eyebrow">404 / a small detour</p>
      <h1>
        This page
        <br />
        <em>went exploring.</em>
      </h1>
      <p>Let’s get you back to the work.</p>
      <Link className="pill-link" href="/">
        Back to Huy’s portfolio <ActionIcon />
      </Link>
    </main>
  );
}
