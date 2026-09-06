import Link from "next/link";
import { site } from "@/lib/content";

export function Logo() {
  return (
    <Link href="/" className="brand" aria-label={`${site.shortcut} — ${site.nameAr}`}>
      <span className="mark-ring" aria-hidden="true">
        IS<b>G</b>
      </span>
      <span className="brand-word">
        {site.nameAr}
        <small>{site.tagline}</small>
      </span>
    </Link>
  );
}