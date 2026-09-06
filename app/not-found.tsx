import { Section, ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="tool-shell">
      <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          404
        </span>
        <h1 style={{ fontSize: "2.4rem", marginTop: "1rem" }}>الصفحة غير موجودة</h1>
        <p className="lead" style={{ marginInline: "auto", marginTop: "0.75rem" }}>
          ربما تم نقل هذه الصفحة أو حذفها.
        </p>
        <div className="actions" style={{ justifyContent: "center" }}>
          <ButtonLink href="/" icon="arrow-left">
            العودة إلى الرئيسية
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}