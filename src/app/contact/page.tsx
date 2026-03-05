import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Atlas Labs to discuss your AI, data, or automation project.",
};

export default function ContactPage() {
  return (
    <>
      <section className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
                Contact
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 text-balance">
                Let&apos;s talk about your project
              </h1>
              <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                We work best when there&apos;s a concrete problem on the table.
                Tell us what you&apos;re trying to solve, what data you have,
                and what success looks like.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                    Good fit for Atlas Labs
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Enterprise teams with existing data infrastructure",
                      "Specific, scoped AI or data problems",
                      "Projects where quality and reliability matter more than speed",
                      "Teams who want an honest technical partner, not a yes-shop",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                      >
                        <span className="mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0">
                          →
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:hello@atlas-labs.ai"
                    className="text-sm text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    hello@atlas-labs.ai
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
