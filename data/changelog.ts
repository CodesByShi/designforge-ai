export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: "feature" | "improvement" | "fix";
  items: string[];
}

/** Static changelog data — edit this file to publish a new release note. */
export const changelog: ChangelogEntry[] = [
  {
    version: "2.4.0",
    date: "2026-07-01",
    title: "AI Component Generator",
    type: "feature",
    items: [
      "Added the AI-assisted variant generator to the playground",
      "Automatic mock fallback when no API key is configured",
      "New Modal and Toast components in the Feedback category",
    ],
  },
  {
    version: "2.3.0",
    date: "2026-06-10",
    title: "My Kit & ZIP export",
    type: "feature",
    items: [
      "Favorite components and organize them into collections",
      "Export any collection as a ready-to-use ZIP of .tsx files",
      "Collections and favorites persist locally via Zustand + localStorage",
    ],
  },
  {
    version: "2.2.0",
    date: "2026-05-18",
    title: "Theme engine",
    type: "improvement",
    items: [
      "Dark/light mode toggle with persisted preference",
      "Brand accent swapping (ember / blueprint / copper)",
      "Adjustable font scale for accessibility",
    ],
  },
  {
    version: "2.1.0",
    date: "2026-04-22",
    title: "Playground v2",
    type: "improvement",
    items: [
      "Responsive preview modes (desktop / tablet / mobile)",
      "Shiki syntax highlighting replaces the old plain-text code view",
      "Copy-to-clipboard success animation",
    ],
  },
  {
    version: "2.0.0",
    date: "2026-03-05",
    title: "Component library rewrite",
    type: "feature",
    items: [
      "Migrated to Next.js 15 App Router",
      "Rebuilt all components on Radix UI primitives for accessibility",
      "Introduced the design token system (ink / graphite / ember / copper / blueprint)",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-01-14",
    title: "Initial release",
    type: "feature",
    items: ["First public release with 18 components across 5 categories", "Basic search and category filters"],
  },
];
