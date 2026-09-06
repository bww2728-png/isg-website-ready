import Link from "next/link";
import { site, services } from "@/lib/content";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p style={{ marginTop: "1rem" }}>{site.descriptor}</p>
            <p style={{ margin: 0 }}>{site.positioning}</p>
          </div>
          <div>
            <h3>الخدمات</h3>
            <span className="h-rule" />
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                {service.title}
              </Link>
            ))}
          </div>
          <div>
            <h3>الشركة</h3>
            <span className="h-rule" />
            <Link href="/about">عن ISG</Link>
            <Link href="/industries">القطاعات</Link>
            <Link href="/insights">الرؤى والمحتوى</Link>
            <Link href="/tools/self-assessment">التقييم الذاتي</Link>
            <Link href="/privacy-policy">سياسة الخصوصية</Link>
            <Link href="/investment-disclaimer">بيان الإخلاء الاستثماري</Link>
          </div>
          <div>
            <h3>تواصل</h3>
            <span className="h-rule" />
            <p className="flex gap-sm" style={{ margin: 0 }}>
              <Icon name="mail" size={17} />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="flex gap-sm" style={{ margin: 0 }}>
              <Icon name="pin" size={17} />
              <span className="plain">{site.city}</span>
            </p>
            <p className="flex gap-sm" style={{ margin: 0 }}>
              <Icon name="trend" size={17} />
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn — ISG Advisory
              </a>
            </p>
            <p style={{ margin: "1rem 0 0" }}>شريك التنفيذ: العربي الاستشاري</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{site.footerTagline}</span>
          <span className="flex gap-sm">
            {site.copyright}
            <a className="back-top" href="#top" aria-label="العودة إلى الأعلى">
              <Icon name="arrow-up" size={16} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}