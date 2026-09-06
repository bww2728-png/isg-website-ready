"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks, ctas } from "@/lib/content";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav" aria-label="التنقل الرئيسي">
          <Logo />
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
                  <path
                    fill="currentColor"
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
        <div className={`mobile-menu${open ? " open" : ""}`} id="mobile-menu" hidden={!open}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link className="button button-primary" href="/contact" onClick={() => setOpen(false)}>
            {ctas.consultation}
          </Link>
        </div>
      </div>
    </header>
  );
}