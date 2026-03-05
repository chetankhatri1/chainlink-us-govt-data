import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ContactCTA() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 dark:bg-zinc-950 overflow-hidden p-8 sm:p-12 lg:p-16">
          {/* Subtle gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          />

          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Work with us
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight text-balance">
              Have a real AI or data problem to solve?
            </h2>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed max-w-lg">
              We work with enterprise teams on specific, scoped engagements.
              Bring us a hard problem — not a vague brief. If we can&apos;t
              help, we&apos;ll tell you.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="secondary" size="lg">
                Start a conversation
              </Button>
              <Button href="/capabilities" variant="ghost" size="lg" className="text-zinc-300 hover:text-white hover:bg-white/10">
                View capabilities
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
