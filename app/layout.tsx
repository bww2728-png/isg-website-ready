import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, financialServiceJsonLd, baseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "ISG | بوابة الحلول المبتكرة — استشارات مالية وتجارية",
    template: "%s | ISG — بوابة الحلول المبتكرة",
  },
  description:
    "ISG شريك مالي وتجاري يعمل مع الملاك والإدارات على تشخيص الأداء، تحسين الربحية والتشغيل، بناء قدرات الفرق، وتأهيل الشركات للاستثمار.",
  metadataBase: new URL(baseUrl()),
  alternates: { canonical: "/" },
  openGraph: {
    title: "ISG | بوابة الحلول المبتكرة",
    description: "نبني شركات أقوى. ونجهز فرصاً أكثر احترافية.",
    type: "website",
    locale: "ar_SA",
    siteName: "ISG — بوابة الحلول المبتكرة",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={financialServiceJsonLd()} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          تجاوز إلى المحتوى
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}