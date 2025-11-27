import { AdBanner } from "@/components/ad-banner";
import { ToolGrid } from "@/components/tool-grid";
import { Button } from "@/components/ui/button";
import { tools } from "@/lib/tools";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section id="hero" className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary-foreground bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
          Your Daily Tools, All in One Place
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          OneKit brings you a suite of fast, reliable, and easy-to-use tools that work entirely in your browser. No uploads, no waiting—just instant results.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="font-semibold">
            <Link href="#tools">
              Explore Tools
              <ArrowDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <div className="my-8 flex justify-center">
        <AdBanner />
      </div>

      <section id="tools" className="py-16">
        <Suspense fallback={<div>Loading tools...</div>}>
            <ToolGrid tools={tools} />
        </Suspense>
      </section>
    </div>
  );
}
