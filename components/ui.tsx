import type { ReactNode } from "react";
import Link from "next/link";

export function Section({
  id,
  muted = false,
  className = "",
  children,
}: {
  id?: string;
  muted?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section${muted ? " section-muted" : ""} ${className}`.trim()}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {description ? <p className="lead">{description}</p> : null}
    </div>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`.trim()}>
      {children}
    </Link>
  );
}

export function Chip({ children, gold = false }: { children: ReactNode; gold?: boolean }) {
  return <span className={`chip${gold ? " chip-gold" : ""}`}>{children}</span>;
}