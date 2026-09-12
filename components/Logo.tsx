import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/content";

export function Logo() {
  return (
    <Link href="/" className="brand" aria-label={`${site.shortcut} — ${site.nameAr}`}>
      <span className="brand-logo" aria-hidden="true">
        <Image
          src="/logo.jpg"
          alt=""
          width={100}
          height={156}
          priority
          quality={90}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </span>
      <span className="brand-word">
        {site.nameAr}
        <small>{site.tagline}</small>
      </span>
    </Link>
  );
}
