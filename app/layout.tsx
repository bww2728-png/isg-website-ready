import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, financialServiceJsonLd, baseUrl } from "@/lib/seo";

const plexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-latin",
  display: "swap",
});

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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ISG — بوابة الحلول المبتكرة" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISG | بوابة الحلول المبتكرة",
    description: "نبني شركات أقوى. ونجهز فرصاً أكثر احترافية.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a2540",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${plexSansArabic.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          تجاوز إلى المحتوى
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={financialServiceJsonLd()} />
      </body>
    </html>
  );
}
