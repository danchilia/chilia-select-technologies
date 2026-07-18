import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { CTA } from "@/components/sections/home/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/lib/data/blog";
import { SITE } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <section className="relative overflow-hidden border-b border-border bg-primary py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <Badge className="mt-6 border-white/20 bg-white/10 text-white">{post.category}</Badge>
            <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      <article className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            {post.content.map((section, i) => (
              <Reveal key={section.heading} delay={i * 0.06}>
                <h2 className="text-2xl font-bold text-text">{section.heading}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="leading-relaxed text-text-light">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </article>

      <CTA />
    </>
  );
}
