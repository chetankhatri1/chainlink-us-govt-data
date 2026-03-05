"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Post } from "@/lib/mdx";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface LabNotesListProps {
  initialPosts: Post[];
  allTags: string[];
}

export function LabNotesList({ initialPosts, allTags }: LabNotesListProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let posts = initialPosts;

    if (selectedTag) {
      posts = posts.filter((p) =>
        p.frontmatter.tags?.includes(selectedTag)
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.frontmatter.title.toLowerCase().includes(q) ||
          p.frontmatter.excerpt?.toLowerCase().includes(q) ||
          p.frontmatter.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return posts;
  }, [initialPosts, query, selectedTag]);

  return (
    <div>
      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search posts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
              selectedTag === null
                ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 border-transparent"
                : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                selectedTag === tag
                  ? "bg-blue-600 dark:bg-blue-500 text-white border-transparent"
                  : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-zinc-400 dark:text-zinc-600 mb-6 font-mono">
        {filtered.length} post{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Post list */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">No posts match your search.</p>
          <button
            onClick={() => { setQuery(""); setSelectedTag(null); }}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {filtered.map((post) => (
            <article key={post.slug} className="py-8 first:pt-0">
              <Link
                href={`/lab-notes/${post.slug}`}
                className="group block"
              >
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {post.frontmatter.tags?.map((tag) => (
                    <Badge key={tag} variant="blue">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2">
                  {post.frontmatter.title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3 max-w-2xl">
                  {post.frontmatter.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-600 font-mono">
                  <time dateTime={post.frontmatter.date}>
                    {formatDate(post.frontmatter.date)}
                  </time>
                  {post.frontmatter.author && (
                    <>
                      <span>·</span>
                      <span>{post.frontmatter.author}</span>
                    </>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
