import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SplashCursor from "@/components/ui/LazySplashCursor";
import BlogPostClient, { BlogPostData } from "@/components/sections/BlogPostClient";
import blogData from "@/content/blog.json";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getAllPosts(): BlogPostData[] {
  const map = new Map<string, BlogPostData>();
  if (blogData.featured) {
    map.set(blogData.featured.slug, blogData.featured as BlogPostData);
  }
  ((blogData.posts || []) as BlogPostData[]).forEach((post) => {
    if (!map.has(post.slug)) {
      map.set(post.slug, post);
    }
  });
  return Array.from(map.values());
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "";
  const slug = decodeURIComponent(rawSlug).replace(/\/$/, "");
  const post = getAllPosts().find((p) => p.slug === slug || p.slug === rawSlug);

  if (!post) {
    return {
      title: "Post Not Found | BrandThink",
    };
  }

  const title = post.metaTitle ? `${post.metaTitle} | BrandThink` : `${post.title} | BrandThink Blog`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "";
  const slug = decodeURIComponent(rawSlug).replace(/\/$/, "");
  const allPosts = getAllPosts();
  const post = allPosts.find((p) => p.slug === slug || p.slug === rawSlug);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.metaTitle || post.title,
    "description": post.metaDescription || post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "BrandThink",
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrandThink",
      "logo": {
        "@type": "ImageObject",
        "url": "/brandthink-logo.webp",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SplashCursor RAINBOW_MODE={false} COLOR="#E8000E" Z_INDEX={1} />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
