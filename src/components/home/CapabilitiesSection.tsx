import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

const CAPABILITIES = [
  {
    id: "data-platforms",
    icon: "⬡",
    title: "Data Platforms & Pipelines",
    description:
      "End-to-end data engineering on SQL Server, Microsoft Fabric, Databricks, and Snowflake. Schema design, orchestration, data quality contracts, and lineage.",
    tags: ["Fabric", "Databricks", "dbt", "Airflow"],
  },
  {
    id: "rag-knowledge",
    icon: "◎",
    title: "RAG & Knowledge Systems",
    description:
      "Retrieval-augmented generation architectures that hold up in production — with evals, drift monitoring, chunking strategy, and index maintenance.",
    tags: ["Embeddings", "Evals", "Vector search", "LLM"],
  },
  {
    id: "agentic-automation",
    icon: "⟳",
    title: "Agentic Automation",
    description:
      "Multi-step agent workflows with guardrails, observability, and graceful failure modes. We design for reliability, not just capability.",
    tags: ["LangGraph", "Guardrails", "Tracing", "Orchestration"],
  },
  {
    id: "analytics-decisioning",
    icon: "▦",
    title: "Analytics & Decisioning",
    description:
      "Semantic layers, Power BI report suites, and automated insight delivery. From raw warehouse to board-level dashboards with governed metrics.",
    tags: ["Power BI", "Semantic layer", "DAX", "OLAP"],
  },
  {
    id: "mdm-entity-resolution",
    icon: "◈",
    title: "MDM & Entity Resolution",
    description:
      "Master data management with deterministic matching, probabilistic scoring, and LLM-assisted reconciliation for complex entity graphs.",
    tags: ["MDM", "Matching", "Deduplication", "Graphs"],
  },
];

export function CapabilitiesSection() {
  return (
    <Section className="bg-zinc-50 dark:bg-zinc-900/50">
      <Container>
        <SectionHeader
          label="What we do"
          title="Five areas of applied AI"
          description="We focus on the parts of the AI stack where engineering rigour makes the difference between a proof-of-concept and a system you can depend on."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap, i) => (
            <Card
              key={cap.id}
              className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="text-2xl text-blue-600 dark:text-blue-400 font-mono select-none"
                  aria-hidden="true"
                >
                  {cap.icon}
                </span>
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
                  0{i + 1}
                </span>
              </div>
              <CardTitle className="mb-2">{cap.title}</CardTitle>
              <CardDescription className="mb-4">{cap.description}</CardDescription>
              <div className="flex flex-wrap gap-1.5">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/capabilities"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 inline-flex items-center gap-1"
          >
            See full capability detail →
          </Link>
        </div>
      </Container>
    </Section>
  );
}
