import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SplashCursor from "@/components/ui/SplashCursor";
import BlogPostClient, { BlogPostData } from "@/components/sections/BlogPostClient";
import blogData from "@/content/blog.json";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getAllPosts(): BlogPostData[] {
  return [blogData.featured as BlogPostData, ...(blogData.posts as BlogPostData[])];
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

  return {
    title: `${post.title} | BrandThink Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | BrandThink Blog`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: [{ url: post.image }],
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

  return (
    <>
      <SplashCursor RAINBOW_MODE={false} COLOR="#E8000E" Z_INDEX={1} />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
