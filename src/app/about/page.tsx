import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Atlas Labs — our principles, how we work, and what makes our approach to applied AI different.",
};

const PRINCIPLES = [
  {
    icon: "◎",
    title: "Reliability over novelty",
    description:
      "We reach for the most boring reliable solution that meets the requirement. If a simple SQL query solves it, we write the SQL query. LLMs are powerful tools — not the answer to every question.",
  },
  {
    icon: "⬡",
    title: "Evals before code",
    description:
      "Every AI system we build starts with defining what success looks like and how we'll measure it. An eval harness is not an afterthought — it's the foundation.",
  },
  {
    icon: "▦",
    title: "Observability is not optional",
    description:
      "Production AI systems without tracing, logging, and alerting are systems you can't maintain. We instrument everything from the start: latency, cost, accuracy, and drift.",
  },
  {
    icon: "◈",
    title: "Data quality is load-bearing",
    description:
      "Sophisticated models on poor data produce confident wrong answers. We treat data quality as a first-class engineering concern, not a cleanup task after the real work.",
  },
  {
    icon: "⟳",
    title: "Governance enables scale",
    description:
      "Access controls, audit trails, and data lineage aren't compliance overhead — they're what lets an organisation expand AI use without accumulating technical and ethical debt.",
  },
  {
    icon: "—",
    title: "Honest scoping",
    description:
      "We tell clients when something won't work, when the timeline is unrealistic, and when a simpler approach exists. We'd rather decline a project than deliver a system we wouldn't put our name on.",
  },
];

const HOW_WE_WORK = [
  {
    step: "01",
    title: "Discovery",
    description:
      "A focused session to understand the problem, existing data landscape, and what success looks like. We ask hard questions about data quality, volume, and access before anything else.",
  },
  {
    step: "02",
    title: "Technical scoping",
    description:
      "We produce a written technical scope: proposed architecture, data requirements, eval criteria, risks, and a phased delivery plan. No vague roadmaps.",
  },
  {
    step: "03",
    title: "Prototype with evals",
    description:
      "We build a working prototype against real data with an eval harness from day one. This gives both sides a grounded view of what's achievable before a full build commitment.",
  },
  {
    step: "04",
    title: "Production delivery",
    description:
      "End-to-end delivery: infrastructure, pipelines, model integration, monitoring, and handover documentation. We stay engaged through the first weeks in production.",
  },
  {
    step: "05",
    title: "Ongoing support",
    description:
      "Optional retainer for eval monitoring, model updates, and incremental improvements. We prefer long-term relationships with clients who invest in their systems.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800">
        <Container narrow>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            About
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 text-balance">
            Why Atlas Labs
          </h1>
          <div className="mt-6 space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>
              Atlas Labs is an applied AI and data engineering practice. We work
              with enterprise teams to build AI systems that are production-ready
              — not just plausible in a demo.
            </p>
            <p>
              The industry has a surfeit of AI consultancies that produce slides,
              pilots, and proofs-of-concept that go nowhere. We exist to fill a
              different gap: the engineering work that gets from a working demo
              to a system that a business can depend on.
            </p>
            <p>
              That means rigorous evaluation, careful data engineering, proper
              observability, and honest conversations when something won&apos;t
              work. We specialise in retrieval systems, agentic workflows, data
              platforms, analytics, and master data — the parts of the AI stack
              where the engineering quality matters most.
            </p>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <Section>
        <Container>
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
              Principles
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              How we think about the work
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="space-y-2">
                <span
                  className="text-xl text-blue-600 dark:text-blue-400 font-mono"
                  aria-hidden="true"
                >
                  {p.icon}
                </span>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {p.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How we work */}
      <Section className="bg-zinc-50 dark:bg-zinc-900/50">
        <Container narrow>
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
              Process
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              How we work
            </h2>
          </div>

          <div className="space-y-8">
            {HOW_WE_WORK.map((step) => (
              <div
                key={step.step}
                className="flex gap-6 items-start border-b border-zinc-200 dark:border-zinc-800 pb-8 last:border-0 last:pb-0"
              >
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600 flex-shrink-0 pt-0.5 w-6">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-200 dark:border-zinc-800">
        <Container narrow>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Work with us
          </h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            We take on a small number of engagements at a time. If you have a
            concrete problem and want a direct technical conversation, reach out.
          </p>
          <div className="mt-6">
            <Button href="/contact" size="lg">
              Get in touch
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
