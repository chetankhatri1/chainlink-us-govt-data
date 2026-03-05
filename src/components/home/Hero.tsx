import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      {/* Gradient blob */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-32 -z-10 w-[600px] h-[600px] rounded-full bg-blue-600/5 dark:bg-blue-500/5 blur-3xl"
      />

      <Container>
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Applied AI · Data Engineering · Agentic Systems
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1] text-balance">
            Atlas Labs
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-light text-zinc-500 dark:text-zinc-400 leading-snug max-w-2xl">
            We build production-grade AI systems: retrieval, agents, automation,
            and analytics.
          </p>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
            Practical, enterprise-grade AI for teams that care about
            reliability, evals, governance, and data quality — not just demos.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/capabilities" size="lg">
              Explore capabilities
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact us
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-sm">
            {[
              { value: "10+", label: "Production deployments" },
              { value: "5", label: "AI capability areas" },
              { value: "100%", label: "Enterprise focus" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
