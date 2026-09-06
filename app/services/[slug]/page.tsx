import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading, ButtonLink } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { services } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.title, description: service.promise };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "الرئيسية", path: "/" },
          { name: "الخدمات", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ])}
      />

      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">الوحدة {service.number}</span>
          <h1>{service.title}</h1>
          <p className="lead">{service.promise}</p>
          <div className="actions">
            <ButtonLink href="/contact">ناقش هذه الخدمة</ButtonLink>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="ماذا نقدم" title={service.marketing} />
          <p className="lead">{service.broader}</p>
          <h3>{service.headline}</h3>
          <div className="grid-4">
            {service.outputs.map((output, index) => (
              <div key={index} className="card">
                <span className="mini-label">مخرج</span>
                <p>{output}</p>
                <h3>{output}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading eyebrow="الإطار" title="ما نحلّه / ما نقدمه / ما يتغيّر" />
          {service.problems.map((problem, index) => (
            <div key={index} className="triple">
              <div className="card">
                <span className="mini-label">ما نحلّه</span>
                <p>{problem.problem}</p>
              </div>
              <div className="card">
                <span className="mini-label">ماذا نقدم</span>
                <p>{problem.offer}</p>
              </div>
              <div className="card">
                <span className="mini-label">ما يتغيّر</span>
                <p>{problem.change}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {service.blocks.map((block, blockIndex) => {
        switch (block.kind) {
          case "phases":
            return (
              <section key={blockIndex} className="section">
                <div className="container">
                  <SectionHeading eyebrow="المنهج" title={block.title} />
                  <p className="lead">{block.intro}</p>
                  <div className="grid-3">
                    {block.items.map((item, index) => (
                      <div key={index} className="card">
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case "audiences":
            return (
              <section key={blockIndex} className="section section-muted">
                <div className="container">
                  <SectionHeading eyebrow="الفئات" title={block.title} />
                  <div className="grid-4">
                    {block.items.map((item, index) => (
                      <div key={index} className="card">
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case "stages":
            return (
              <section key={blockIndex} className="section">
                <div className="container">
                  <SectionHeading eyebrow="المراحل" title={block.title} />
                  <p className="note">{block.note}</p>
                  <ul className="steps-list">
                    {block.items.map((item, index) => (
                      <li key={index}>
                        <strong>{item.title}</strong> {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          case "responsible":
            return (
              <section key={blockIndex} className="section section-muted">
                <div className="container">
                  <div className="quote">{block.text}</div>
                </div>
              </section>
            );
          default:
            return null;
        }
      })}

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>ابدأ بالحوار الأول: قرار أو أولوية أو مسار جاهزية واضح.</h2>
            <ButtonLink href="/contact">اطلب جلسة تشخيصية</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}