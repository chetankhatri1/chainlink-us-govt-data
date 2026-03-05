import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atlas-labs.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Atlas Labs — Applied AI, Data Engineering & Agentic Systems",
    template: "%s | Atlas Labs",
  },
  description:
    "Atlas Labs builds production-grade AI systems: retrieval, agents, automation, and analytics. Enterprise-grade reliability with rigorous evals, governance, and observability.",
  keywords: [
    "AI engineering",
    "RAG systems",
    "data engineering",
    "agentic automation",
    "analytics",
    "MDM",
    "entity resolution",
    "LLM",
    "Databricks",
    "Power BI",
  ],
  authors: [{ name: "Atlas Labs" }],
  creator: "Atlas Labs",
  publisher: "Atlas Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Atlas Labs",
    title: "Atlas Labs — Applied AI, Data Engineering & Agentic Systems",
    description:
      "Production-grade AI systems: retrieval, agents, automation, and analytics. Built for reliability, observability, and scale.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlas Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Labs — Applied AI, Data Engineering & Agentic Systems",
    description:
      "Production-grade AI systems: retrieval, agents, automation, and analytics.",
    images: ["/og-image.png"],
    creator: "@atlaslabs_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
