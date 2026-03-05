import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { title, excerpt, tags } = post.frontmatter;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atlas-labs.ai";

  return {
    title,
    description: excerpt,
    keywords: tags,
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      url: `${SITE_URL}/lab-notes/${slug}`,
      publishedTime: post.frontmatter.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
    },
  };
}

export default async function LabNotePost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { title, date, tags, author, excerpt } = post.frontmatter;

  return (
    <>
      {/* Header */}
      <section className="py-12 lg:py-16 border-b border-zinc-200 dark:border-zinc-800">
        <Container narrow>
          <Link
            href="/lab-notes"
            className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors mb-6"
          >
            ← Lab Notes
          </Link>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags?.map((tag) => (
              <Badge key={tag} variant="blue">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight text-balance">
            {title}
          </h1>

          {excerpt && (
            <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-600 font-mono">
            <time dateTime={date}>{formatDate(date)}</time>
            {author && (
              <>
                <span>·</span>
                <span>{author}</span>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Article body */}
      <section className="py-12 lg:py-16">
        <Container narrow>
          <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, rehypeHighlight],
                },
              }}
            />
          </article>
        </Container>
      </section>

      {/* Back link */}
      <section className="py-8 border-t border-zinc-200 dark:border-zinc-800">
        <Container narrow>
          <Link
            href="/lab-notes"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            ← Back to Lab Notes
          </Link>
        </Container>
      </section>
    </>
  );
}
