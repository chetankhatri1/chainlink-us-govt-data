import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Atlas Labs capability areas: data platforms, RAG systems, agentic automation, analytics, and MDM/entity resolution.",
};

const CAPABILITIES = [
  {
    id: "data-platforms",
    label: "01",
    title: "Data Platforms & Pipelines",
    problem:
      "Most enterprise data is siloed, poorly documented, and inconsistently modeled. Teams spend more time fighting pipelines than extracting value from them.",
    approach:
      "We design and build end-to-end data platforms on SQL Server, Microsoft Fabric, Databricks, and Snowflake. This includes lakehouse architecture, schema design, orchestration (Airflow, Fabric Pipelines), data quality contracts (Great Expectations, dbt tests), and full lineage tracking.",
    outcomes: [
      "Unified, well-modeled data layers that downstream teams can depend on",
      "Automated data quality checks with alerting and SLA tracking",
      "Clear lineage from source to report — auditable and explainable",
      "Repeatable deployment via CI/CD, reducing ops overhead",
    ],
    tags: ["SQL Server", "Microsoft Fabric", "Databricks", "Snowflake", "dbt", "Airflow", "Great Expectations"],
  },
  {
    id: "rag-knowledge",
    label: "02",
    title: "RAG & Knowledge Systems",
    problem:
      "LLMs without grounding hallucinate. Most RAG implementations deployed in demos fail in production due to poor chunking, missing evals, and no drift detection.",
    approach:
      "We architect retrieval systems that are measurable from day one. We establish eval harnesses before writing retrieval code. We tune chunking, embedding models, and re-ranking strategies for your specific document corpus. We implement drift monitoring so you know when quality degrades.",
    outcomes: [
      "Production retrieval systems with documented accuracy benchmarks",
      "Automated eval pipelines that run on every model or data change",
      "Citation tracing and answer attribution for compliance-sensitive domains",
      "Drift detection so degradation is caught before users notice",
    ],
    tags: ["RAG", "Embeddings", "Vector search", "LLM evals", "OpenAI", "Azure AI Search", "pgvector"],
  },
  {
    id: "agentic-automation",
    label: "03",
    title: "Agentic Automation & Workflows",
    problem:
      "Agent demos are easy; production agents are hard. Most break on edge cases, lack observability, and have no recovery path when a step fails.",
    approach:
      "We design multi-step agent systems with LangGraph, custom orchestrators, or structured workflow engines depending on reliability requirements. Every agent system we build has full trace logging, guardrail layers, human-in-the-loop checkpoints, and well-defined failure modes.",
    outcomes: [
      "Agents that handle the 80% case autonomously with clear escalation paths",
      "Full execution traces for every run — auditable and debuggable",
      "Guardrail layers that prevent harmful or out-of-scope actions",
      "Cost and latency tracking per workflow step",
    ],
    tags: ["LangGraph", "LangChain", "Guardrails AI", "Langfuse", "Azure AI Foundry", "Orchestration"],
  },
  {
    id: "analytics-decisioning",
    label: "04",
    title: "Analytics & Decisioning",
    problem:
      "Dashboards proliferate but trust erodes. Different reports show different numbers. Analysts spend time reconciling figures instead of generating insight.",
    approach:
      "We build governed semantic layers and Power BI report suites with certified metrics. We implement row-level security, refresh SLAs, and automated anomaly detection. We also build AI-augmented reporting — natural language Q&A over your semantic layer, automated insight narratives, and proactive alerting.",
    outcomes: [
      "Single source of truth for key business metrics with governance controls",
      "Power BI reports with documented measure definitions and refresh SLAs",
      "AI-augmented insights: automated anomaly alerts and natural language summaries",
      "Reduced time-to-insight for operational decision-making",
    ],
    tags: ["Power BI", "DAX", "Semantic models", "Tabular", "Azure Analysis Services", "Natural language Q&A"],
  },
  {
    id: "mdm-entity-resolution",
    label: "05",
    title: "MDM & Entity Resolution",
    problem:
      "Customer, instrument, or entity data is fragmented across systems. Simple deduplication rules miss subtle duplicates; manual review doesn't scale.",
    approach:
      "We implement entity resolution pipelines combining deterministic matching (exact ISIN, CUSIP, LEI), probabilistic scoring (fuzzy name/address matching with learned thresholds), and LLM-assisted disambiguation for hard cases. The result feeds a governed master data layer with full match rationale stored for audit.",
    outcomes: [
      "Match rates exceeding 95%+ on golden test datasets before production rollout",
      "Full audit trail: why each pair was matched, merged, or rejected",
      "Ongoing reconciliation jobs that catch new duplicates as data arrives",
      "Governed master data entity that downstream systems can trust",
    ],
    tags: ["MDM", "Entity resolution", "Fuzzy matching", "LLM", "ISIN", "LEI", "Python", "Spark"],
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
              Capabilities
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              What we build, and how
            </h1>
            <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Five focused areas where rigorous engineering makes the difference
              between a pilot and a system you run in production for years.
            </p>
          </div>
        </Container>
      </section>

      {/* Capabilities detail */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {CAPABILITIES.map((cap, i) => (
          <Section key={cap.id} id={cap.id} tighter>
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left: title + label */}
                <div className="lg:col-span-4">
                  <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
                    {cap.label}
                  </span>
                  <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-snug">
                    {cap.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cap.tags.map((tag) => (
                      <Badge key={tag} variant="zinc">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Right: problem / approach / outcomes */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                      The problem
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {cap.problem}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                      Our approach
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {cap.approach}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                      Outcomes
                    </p>
                    <ul className="space-y-2">
                      {cap.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                        >
                          <span className="mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0">
                            →
                          </span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <Container>
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Ready to scope a project?
            </h2>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We work best with teams who have a defined problem and existing
              data. Tell us what you&apos;re working on and we&apos;ll give you
              an honest assessment.
            </p>
            <div className="mt-6">
              <Button href="/contact" size="lg">
                Get in touch
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
