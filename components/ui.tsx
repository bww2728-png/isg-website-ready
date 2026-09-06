import type { ReactNode } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";

export function Section({
  id,
  muted = false,
  tint = false,
  className = "",
  as,
  children,
}: {
  id?: string;
  muted?: boolean;
  tint?: boolean;
  className?: string;
  as?: "section" | "div";
  children: ReactNode;
}) {
  const Tag = as ?? "section";
  const tone = muted ? " section-muted" : tint ? " section-tint" : "";
  return (
    <Tag id={id} className={`section${tone} ${className}`.trim()}>
      <div className="container">{children}</div>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={`section-heading${align === "center" ? " center" : ""}`}>
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
  icon,
  className = "",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: IconName;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`.trim()}>
      {children}
      {icon ? <Icon name={icon} size={18} className="ico-arrow" /> : null}
    </Link>
  );
}

export function Chip({ children, gold = false, className = "" }: { children: ReactNode; gold?: boolean; className?: string }) {
  return <span className={`chip${gold ? " chip-gold" : ""} ${className}`.trim()}>{children}</span>;
}