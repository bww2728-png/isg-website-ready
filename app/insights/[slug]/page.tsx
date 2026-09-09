import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ButtonLink, Chip, Section, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { baseUrl } from "@/lib/seo";
import { ctas, insightsArticles } from "@/lib/content";

export function generateStaticParams() {
  return insightsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = insightsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: `${article.title} — ISG`,
      description: article.excerpt,
      url: `${baseUrl()}/insights/${article.slug}`,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = insightsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const others = insightsArticles.filter((a) => a.slug !== article.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "الرئيسية", path: "/" },
          { name: "الرؤى", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ])}
      />

      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="مسار التنقل">
            <Link href="/">الرئيسية</Link>
            <span aria-hidden="true">/</span>
            <Link href="/insights">الرؤى</Link>
          </nav>
          <span className="eyebrow">{article.axis}</span>
          <h1 style={{ maxWidth: "48rem" }}>{article.title}</h1>
          <p className="lead" style={{ color: "#d6e0ea", maxWidth: "44rem" }}>{article.excerpt}</p>
          <div className="flex" style={{ gap: "0.6rem", marginTop: "1rem" }}>
            <Chip gold>{article.week}</Chip>
            <Chip>{article.readingTime}</Chip>
          </div>
        </div>
      </div>

      <Section>
        <article style={{ maxWidth: "46rem" }}>
          {article.sections.map((section, index) => (
            <Reveal key={section.heading} delay={Math.min(index * 50, 150)}>
              <section style={{ marginBottom: "2.5rem" }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{section.heading}</h2>
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} style={{ lineHeight: 2, marginBottom: "1rem", color: "var(--body, #334155)", fontSize: "1.05rem" }}>
                    {paragraph}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}
          <Reveal>
            <div className="quote" style={{ marginTop: "3rem" }}>{article.closing}</div>
          </Reveal>
        </article>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="اقرأ أيضاً"
          title="مقالات من المحاور نفسها"
        />
        <div className="grid-2">
          {others.map((other, index) => (
            <Reveal key={other.slug} delay={index * 70}>
              <Link href={`/insights/${other.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card accent-top">
                  <span className="card-icon">
                    <Icon name="document" size={22} />
                  </span>
                  <h3 style={{ fontSize: "1.1rem" }}>{other.title}</h3>
                  <p className="mt-2" style={{ marginBottom: 0 }}>{other.excerpt}</p>
                  <p className="note mt-2" style={{ marginBottom: 0 }}>{other.readingTime}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="cta">
            <div>
              <h2>من القراءة إلى القرار.</h2>
              <p>{ctas.evaluate}</p>
            </div>
            <ButtonLink href="/contact" icon="arrow-left">
              {ctas.diagnostic}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
