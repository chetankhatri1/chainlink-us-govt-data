import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export function LabNotesTeaser() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section className="bg-zinc-50 dark:bg-zinc-900/50">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            label="Lab Notes"
            title="From the research log"
            className="mb-0"
          />
          <Link
            href="/lab-notes"
            className="hidden sm:inline-flex text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 items-center gap-1 flex-shrink-0 ml-8"
          >
            All posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/lab-notes/${post.slug}`}
              className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:shadow-md dark:hover:shadow-zinc-900/50 transition-shadow"
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.frontmatter.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="blue">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                {post.frontmatter.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                {post.frontmatter.excerpt}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
                {formatDate(post.frontmatter.date)}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/lab-notes"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            All posts →
          </Link>
        </div>
      </Container>
    </Section>
  );
}
