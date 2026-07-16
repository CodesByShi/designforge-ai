import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/footer";
import { DocsSidebar, docsNav } from "@/components/docs/docs-sidebar";
import { PropsTable } from "@/components/docs/props-table";
import { ComponentPreview } from "@/components/docs/component-preview";

const mdxComponents = { PropsTable, ComponentPreview };

async function getDoc(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content", "docs", `${slug}.mdx`);
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return docsNav.map((d) => ({ slug: d.slug }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = await getDoc(slug);
  if (!source) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl gap-10 px-6 py-12">
        <DocsSidebar activeSlug={slug} />
        <article className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-ember prose-code:text-ember flex-1">
          <MDXRemote source={source} components={mdxComponents} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
