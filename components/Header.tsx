"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, ctas } from "@/lib/content";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <nav className="nav" aria-label="التنقل الرئيسي">
          <Logo />
          <div className="nav-links">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={active ? "active" : undefined}>
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <ThemeToggle />
            <Link className="button button-primary" href="/contact">
              {ctas.consultation}
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              onClick={() => setOpen((value) => !value)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                {open ? (
                  <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                ) : (
                  <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
        <div id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`} hidden={!open}>
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={active ? "active" : undefined}>
                {link.label}
              </Link>
            );
          })}
          <Link className="mob-cta" href="/contact" onClick={() => setOpen(false)}>
            <span className="button button-primary">{ctas.consultation}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}