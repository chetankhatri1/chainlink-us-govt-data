import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { LabNotesTeaser } from "@/components/home/LabNotesTeaser";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Atlas Labs — Applied AI, Data Engineering & Agentic Systems",
  description:
    "Atlas Labs builds production-grade AI systems: retrieval, agents, automation, and analytics. Enterprise-grade reliability with rigorous evals, governance, and observability.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesSection />
      <FeaturedWork />
      <LabNotesTeaser />
      <ContactCTA />
    </>
  );
}
