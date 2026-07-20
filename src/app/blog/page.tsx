import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/layout/page-hero";
import { CTA } from "@/components/sections/home/cta";
import { blogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical insights on business websites, conversion, SEO, and software, from the team at Chilia Select Technologies.",
  alternates: { canonical: "/blog" },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights on websites, software, and growth"
        description="Practical, no-fluff articles on what actually helps businesses succeed online."
        image="/images/hero-blog.jpg"
      />

      <section className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-border bg-surface p-8 lg:grid-cols-[1fr_1fr] lg:p-12">
                <div className="flex flex-col justify-center">
                  <Badge>{featured.category}</Badge>
                  <h2 className="mt-4 text-balance text-2xl font-bold text-text sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-text-light">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center gap-4 text-sm text-text-light">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featured.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read Article
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <div className="relative hidden overflow-hidden rounded-2xl bg-ink lg:block">
                  <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.1]" />
                </div>
              </div>
            </Link>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
                  <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border bg-ink">
                    <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
                  </div>
                  <Badge className="mt-4 w-fit">{post.category}</Badge>
                  <h3 className="mt-3 flex-1 text-lg font-semibold text-text">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-light">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-light">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
