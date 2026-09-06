import { ButtonLink, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section>
      <h1>الصفحة غير موجودة</h1>
      <p className="lead">ربما تم نقل هذه الصفحة أو حذفها.</p>
      <ButtonLink href="/">العودة إلى الرئيسية</ButtonLink>
    </Section>
  );
}