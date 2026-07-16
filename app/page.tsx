import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { ComponentShowcase } from "@/components/landing/showcase";
import { DeveloperCta } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeatureGrid />
        <ComponentShowcase />
        <DeveloperCta />
      </main>
      <SiteFooter />
    </>
  );
}
