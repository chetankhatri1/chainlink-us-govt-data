import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { Container } from "@/components/ui/Container";
import { LabNotesList } from "./LabNotesList";

export const metadata: Metadata = {
  title: "Lab Notes",
  description:
    "Technical writing from Atlas Labs on RAG systems, data engineering, agentic workflows, entity resolution, and applied AI.",
};

export default function LabNotesPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <section className="py-16 lg:py-20 border-b border-zinc-200 dark:border-zinc-800">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            Lab Notes
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            From the research log
          </h1>
          <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
            Technical notes on applied AI, data engineering, and systems that
            work in production.
          </p>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <LabNotesList initialPosts={posts} allTags={tags} />
        </Container>
      </section>
    </>
  );
}
