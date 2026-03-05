import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

const CASE_STUDIES = [
  {
    label: "Financial services",
    title: "RAG system for regulatory document Q&A",
    description:
      "Deployed a production retrieval system over 40,000+ regulatory documents with citation tracing, automated eval harness, and drift alerting. Replaced a manual analyst review process.",
    outcomes: ["~70% reduction in research time", "Citation accuracy tracked weekly", "Zero hallucinations in flagged domain"],
    tags: ["RAG", "Evals", "Compliance"],
    status: "Production",
  },
  {
    label: "Healthcare operations",
    title: "Agentic workflow for insurance prior-auth",
    description:
      "Multi-step agent pipeline that gathers clinical evidence, drafts prior-authorization requests, and routes to human reviewers only when confidence is below threshold.",
    outcomes: ["Handles 80% of cases end-to-end", "Full audit trail per decision", "Integrated with existing EHR system"],
    tags: ["Agents", "Healthcare", "Orchestration"],
    status: "Production",
  },
  {
    label: "Asset management",
    title: "Entity resolution across financial instrument master data",
    description:
      "Unified fragmented instrument data across 6 source systems using deterministic matching on ISIN/CUSIP, probabilistic fuzzy matching, and LLM disambiguation for edge cases.",
    outcomes: ["99.4% match rate on golden dataset", "Halved data reconciliation cost", "MDM layer adopted org-wide"],
    tags: ["MDM", "Entity resolution", "LLM"],
    status: "Production",
  },
];

export function FeaturedWork() {
  return (
    <Section>
      <Container>
        <SectionHeader
          label="Featured work"
          title="Systems built for the real world"
          description="A selection of production deployments across industries. Details are illustrative; specifics are kept confidential."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <article
              key={cs.title}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {cs.label}
                </span>
                <Badge variant="green">{cs.status}</Badge>
              </div>

              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 leading-snug mb-3">
                {cs.title}
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 flex-1">
                {cs.description}
              </p>

              <div className="space-y-1.5 mb-5">
                {cs.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-2">
                    <span className="mt-0.5 text-blue-600 dark:text-blue-400 text-xs flex-shrink-0">✓</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{outcome}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {cs.tags.map((tag) => (
                  <Badge key={tag} variant="zinc">
                    {tag}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
