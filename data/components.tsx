import * as React from "react";
import { Heart, Plus, Search as SearchIcon, Home, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchBar } from "@/components/ui/search-bar";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Navbar } from "@/components/ui/navbar";
import { Sidebar } from "@/components/ui/sidebar";
import { ProfileCard } from "@/components/ui/profile-card";
import { ProductCard } from "@/components/ui/product-card";
import { PricingCard } from "@/components/ui/pricing-card";
import { GlassCard } from "@/components/ui/glass-card";
import { Alert } from "@/components/ui/alert";
import { ProgressBar } from "@/components/ui/progress";
import { Tooltip } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/ui/stats-card";
import { Timeline } from "@/components/ui/timeline";
import { DataTable } from "@/components/ui/table";
import { Modal, ModalTrigger, ModalContent } from "@/components/ui/modal";
import { useToastStore } from "@/store/useToastStore";

export type Category = "Buttons" | "Forms" | "Navigation" | "Cards" | "Feedback" | "Data Display";

export interface PlaygroundControl {
  key: string;
  label: string;
  type: "select" | "boolean" | "text";
  options?: string[];
}

export interface ComponentEntry {
  id: string;
  name: string;
  category: Category;
  description: string;
  tags: string[];
  code: string;
  controls: PlaygroundControl[];
  defaultProps: Record<string, string | boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- each entry renders a
  // different real component with its own literal-union prop types (e.g. Button's
  // size/variant), so the shared playground prop bag is deliberately untyped here.
  render: (props: Record<string, any>) => React.ReactNode;
}

export const CATEGORIES: Category[] = ["Buttons", "Forms", "Navigation", "Cards", "Feedback", "Data Display"];

export const componentRegistry: ComponentEntry[] = [
  // ───────────────────────── Buttons ─────────────────────────
  {
    id: "primary-button",
    name: "Primary Button",
    category: "Buttons",
    description: "The default call-to-action button, built on the shared Button primitive.",
    tags: ["cta", "action"],
    code: `<Button variant="primary" size="md">Get Started</Button>`,
    controls: [
      { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] },
      { key: "disabled", label: "Disabled", type: "boolean" },
    ],
    defaultProps: { size: "md", disabled: false },
    render: (p) => <Button variant="primary" size={p.size} disabled={p.disabled}>Get Started</Button>,
  },
  {
    id: "gradient-button",
    name: "Gradient Button",
    category: "Buttons",
    description: "High-emphasis button with an animated ember-to-blueprint gradient sweep.",
    tags: ["cta", "gradient"],
    code: `<Button variant="gradient" size="md">Upgrade Plan</Button>`,
    controls: [{ key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] }],
    defaultProps: { size: "md" },
    render: (p) => <Button variant="gradient" size={p.size}>Upgrade Plan</Button>,
  },
  {
    id: "ghost-button",
    name: "Ghost Button",
    category: "Buttons",
    description: "Low-emphasis transparent button for secondary actions.",
    tags: ["secondary"],
    code: `<Button variant="ghost" size="md">Cancel</Button>`,
    controls: [{ key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] }],
    defaultProps: { size: "md" },
    render: (p) => <Button variant="ghost" size={p.size}>Cancel</Button>,
  },
  {
    id: "icon-button",
    name: "Icon Button",
    category: "Buttons",
    description: "Square button sized for a single icon, with a required aria-label.",
    tags: ["icon", "compact"],
    code: `<Button variant="outline" size="icon" aria-label="Add to favorites">\n  <Heart className="h-4 w-4" />\n</Button>`,
    controls: [{ key: "variant", label: "Variant", type: "select", options: ["outline", "primary", "ghost"] }],
    defaultProps: { variant: "outline" },
    render: (p) => (
      <Button variant={p.variant} size="icon" aria-label="Add to favorites">
        <Heart className="h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "loading-button",
    name: "Loading Button",
    category: "Buttons",
    description: "Button with an isLoading prop that swaps in a spinner and disables interaction.",
    tags: ["async", "state"],
    code: `<Button isLoading={true}>Saving…</Button>`,
    controls: [{ key: "isLoading", label: "Loading", type: "boolean" }],
    defaultProps: { isLoading: true },
    render: (p) => <Button isLoading={p.isLoading}>Saving…</Button>,
  },

  // ───────────────────────── Forms ─────────────────────────
  {
    id: "input",
    name: "Input",
    category: "Forms",
    description: "Text input with label, hint, and error states wired via aria-describedby.",
    tags: ["form", "text"],
    code: `<Input label="Email address" placeholder="you@company.com" hint="We'll never share your email." />`,
    controls: [{ key: "error", label: "Show error", type: "boolean" }],
    defaultProps: { error: false },
    render: (p) => (
      <Input
        label="Email address"
        placeholder="you@company.com"
        hint={p.error ? undefined : "We'll never share your email."}
        error={p.error ? "Enter a valid email address." : undefined}
      />
    ),
  },
  {
    id: "select",
    name: "Select",
    category: "Forms",
    description: "Accessible dropdown built on Radix Select — full keyboard support.",
    tags: ["form", "dropdown"],
    code: `<Select>\n  <SelectTrigger><SelectValue placeholder="Framework" /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="next">Next.js</SelectItem>\n    <SelectItem value="remix">Remix</SelectItem>\n  </SelectContent>\n</Select>`,
    controls: [],
    defaultProps: {},
    render: () => (
      <Select>
        <SelectTrigger className="w-48"><SelectValue placeholder="Framework" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
          <SelectItem value="astro">Astro</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description: "Accessible checkbox with associated label and focus ring.",
    tags: ["form"],
    code: `<Checkbox label="Email me product updates" />`,
    controls: [],
    defaultProps: {},
    render: () => <Checkbox label="Email me product updates" />,
  },
  {
    id: "toggle",
    name: "Toggle",
    category: "Forms",
    description: "Switch control for binary settings, built on Radix Switch.",
    tags: ["form", "switch"],
    code: `<Toggle label="Enable dark mode" />`,
    controls: [],
    defaultProps: {},
    render: () => <Toggle label="Enable dark mode" defaultChecked />,
  },
  {
    id: "search-bar",
    name: "Search Bar",
    category: "Forms",
    description: "Search field with icon and clear button, used across the library search.",
    tags: ["form", "search"],
    code: `<SearchBar value={query} onChange={setQuery} placeholder="Search components…" />`,
    controls: [],
    defaultProps: {},
    render: () => <SearchBar value="glass card" onChange={() => {}} className="w-64" />,
  },

  // ───────────────────────── Navigation ─────────────────────────
  {
    id: "navbar",
    name: "Navbar",
    category: "Navigation",
    description: "Responsive top nav with a mobile disclosure menu and CTA.",
    tags: ["layout", "responsive"],
    code: `<Navbar\n  brand="Acme"\n  links={[{ label: "Docs", href: "#" }, { label: "Pricing", href: "#" }]}\n/>`,
    controls: [],
    defaultProps: {},
    render: () => (
      <div className="w-full max-w-md rounded-sf border border-graphite-border overflow-hidden">
        <Navbar brand="Acme" links={[{ label: "Docs", href: "#" }, { label: "Pricing", href: "#" }]} />
      </div>
    ),
  },
  {
    id: "sidebar",
    name: "Sidebar",
    category: "Navigation",
    description: "Left navigation rail with active-state and icon labels.",
    tags: ["layout", "dashboard"],
    code: `<Sidebar\n  activeHref="/"\n  items={[{ label: "Home", icon: Home, href: "/" }, { label: "Settings", icon: Settings, href: "/settings" }]}\n/>`,
    controls: [],
    defaultProps: {},
    render: () => (
      <div className="h-56 rounded-sf border border-graphite-border overflow-hidden">
        <Sidebar
          activeHref="/"
          items={[
            { label: "Home", icon: Home, href: "/" },
            { label: "Notifications", icon: Bell, href: "/notif" },
            { label: "Settings", icon: Settings, href: "/settings" },
          ]}
        />
      </div>
    ),
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Radix-powered tabs with arrow-key navigation and active indicator.",
    tags: ["navigation"],
    code: `<Tabs defaultValue="preview">\n  <TabsList>\n    <TabsTrigger value="preview">Preview</TabsTrigger>\n    <TabsTrigger value="code">Code</TabsTrigger>\n  </TabsList>\n  <TabsContent value="preview">…</TabsContent>\n</Tabs>`,
    controls: [],
    defaultProps: {},
    render: () => (
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="text-sm text-paper-dim">Live preview panel</TabsContent>
        <TabsContent value="code" className="text-sm text-paper-dim">Code panel</TabsContent>
      </Tabs>
    ),
  },
  {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    category: "Navigation",
    description: "Semantic breadcrumb trail for deep documentation hierarchies.",
    tags: ["navigation"],
    code: `<Breadcrumbs items={[{ label: "Docs", href: "/docs" }, { label: "Button" }]} />`,
    controls: [],
    defaultProps: {},
    render: () => <Breadcrumbs items={[{ label: "Docs", href: "/docs" }, { label: "Components", href: "/docs" }, { label: "Button" }]} />,
  },

  // ───────────────────────── Cards ─────────────────────────
  {
    id: "profile-card",
    name: "Profile Card",
    category: "Cards",
    description: "Avatar, name, role, and a follow action.",
    tags: ["card", "profile"],
    code: `<ProfileCard name="Ava Chen" role="Design Engineer" avatarUrl="/avatar.png" bio="Building design systems." />`,
    controls: [],
    defaultProps: {},
    render: () => (
      <ProfileCard
        name="Ava Chen"
        role="Design Engineer"
        avatarUrl="https://i.pravatar.cc/128?img=47"
        bio="Building design systems at scale."
      />
    ),
  },
  {
    id: "product-card",
    name: "Product Card",
    category: "Cards",
    description: "Image, star rating, price, and an add-to-cart action.",
    tags: ["card", "commerce"],
    code: `<ProductCard name="Mechanical Keyboard" price="$149" imageUrl="/product.jpg" rating={4} />`,
    controls: [{ key: "rating", label: "Rating", type: "select", options: ["3", "4", "5"] }],
    defaultProps: { rating: "4" },
    render: (p) => (
      <ProductCard
        name="Mechanical Keyboard"
        price="$149"
        imageUrl="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
        rating={Number(p.rating)}
      />
    ),
  },
  {
    id: "pricing-card",
    name: "Pricing Card",
    category: "Cards",
    description: "Plan tier with feature checklist and a highlighted 'recommended' state.",
    tags: ["card", "pricing"],
    code: `<PricingCard tier="Pro" price="$29" features={["Unlimited components", "AI generator", "Priority support"]} highlighted />`,
    controls: [{ key: "highlighted", label: "Highlighted", type: "boolean" }],
    defaultProps: { highlighted: true },
    render: (p) => (
      <PricingCard
        tier="Pro"
        price="$29"
        features={["Unlimited components", "AI generator", "Priority support"]}
        highlighted={p.highlighted}
      />
    ),
  },
  {
    id: "glass-card",
    name: "Glass Card",
    category: "Cards",
    description: "Glassmorphism surface — translucent, blurred, used in hero/feature grids.",
    tags: ["card", "glass"],
    code: `<GlassCard title="Accessible by default" description="Every component ships with ARIA and keyboard support." icon={<Sparkles />} />`,
    controls: [],
    defaultProps: {},
    render: () => (
      <GlassCard
        title="Accessible by default"
        description="Every component ships with ARIA and keyboard support."
        icon={<Plus className="h-5 w-5" />}
      />
    ),
  },

  // ───────────────────────── Feedback ─────────────────────────
  {
    id: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Inline banner for info, success, warning, and error states.",
    tags: ["feedback"],
    code: `<Alert variant="success" title="Changes saved" description="Your component was published." />`,
    controls: [{ key: "variant", label: "Variant", type: "select", options: ["info", "success", "warning", "error"] }],
    defaultProps: { variant: "success" },
    render: (p) => <Alert variant={p.variant} title="Changes saved" description="Your component was published." />,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "Feedback",
    description: "Radix tooltip with a delay, shown on hover/focus.",
    tags: ["feedback", "hint"],
    code: `<Tooltip content="Copy to clipboard">\n  <Button size="icon" variant="ghost"><Copy /></Button>\n</Tooltip>`,
    controls: [],
    defaultProps: {},
    render: () => (
      <Tooltip content="Copy to clipboard">
        <Button size="icon" variant="ghost" aria-label="Copy"><SearchIcon className="h-4 w-4" /></Button>
      </Tooltip>
    ),
  },
  {
    id: "progress-bar",
    name: "Progress Bar",
    category: "Feedback",
    description: "Determinate progress indicator with an accessible label.",
    tags: ["feedback", "loading"],
    code: `<ProgressBar value={64} label="Uploading assets" />`,
    controls: [{ key: "value", label: "Value", type: "select", options: ["25", "50", "75", "100"] }],
    defaultProps: { value: "64" },
    render: (p) => <ProgressBar value={Number(p.value)} label="Uploading assets" />,
  },

  {
    id: "modal",
    name: "Modal",
    category: "Feedback",
    description: "Focus-trapped dialog with ESC-to-close and labelled content, via Radix Dialog.",
    tags: ["feedback", "dialog"],
    code: `<Modal>\n  <ModalTrigger asChild><Button>Open</Button></ModalTrigger>\n  <ModalContent title="Delete component?" description="This can't be undone.">\n    <Button variant="destructive">Delete</Button>\n  </ModalContent>\n</Modal>`,
    controls: [],
    defaultProps: {},
    render: () => (
      <Modal>
        <ModalTrigger asChild><Button variant="outline">Open modal</Button></ModalTrigger>
        <ModalContent title="Delete component?" description="This action can't be undone.">
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </ModalContent>
      </Modal>
    ),
  },
  {
    id: "toast",
    name: "Toast",
    category: "Feedback",
    description: "Global toast queue (Zustand + Radix Toast) — push notifications from anywhere.",
    tags: ["feedback", "notification"],
    code: `useToastStore.getState().push({ title: "Copied!", variant: "success" });`,
    controls: [],
    defaultProps: {},
    render: () => (
      <Button
        variant="outline"
        onClick={() =>
          useToastStore.getState().push({ title: "Component copied", description: "JSX copied to clipboard.", variant: "success" })
        }
      >
        Trigger toast
      </Button>
    ),
  },

  // ───────────────────────── Data Display ─────────────────────────
  {
    id: "badge",
    name: "Badge",
    category: "Data Display",
    description: "Small status pill for categories, tags, and states.",
    tags: ["data"],
    code: `<Badge variant="ember">New</Badge>`,
    controls: [{ key: "variant", label: "Variant", type: "select", options: ["default", "ember", "blueprint", "success"] }],
    defaultProps: { variant: "ember" },
    render: (p) => <Badge variant={p.variant}>New</Badge>,
  },
  {
    id: "stats-card",
    name: "Stats Card",
    category: "Data Display",
    description: "Big-number tile with a trend delta, for dashboards.",
    tags: ["data", "dashboard"],
    code: `<StatsCard label="Monthly Active Devs" value="12.4k" delta={8.2} />`,
    controls: [],
    defaultProps: {},
    render: () => <StatsCard label="Monthly Active Devs" value="12.4k" delta={8.2} />,
  },
  {
    id: "timeline",
    name: "Timeline",
    category: "Data Display",
    description: "Vertical event timeline, used for the changelog and activity feeds.",
    tags: ["data"],
    code: `<Timeline events={[{ date: "Jul 2026", title: "AI generator shipped" }]} />`,
    controls: [],
    defaultProps: {},
    render: () => (
      <Timeline
        events={[
          { date: "Jul 2026", title: "AI generator shipped", description: "Ship natural-language variant generation." },
          { date: "Jun 2026", title: "Playground v2", description: "Live props editing with responsive preview." },
        ]}
      />
    ),
  },
  {
    id: "data-table",
    name: "Table",
    category: "Data Display",
    description: "Generic, typed data table with semantic header scope.",
    tags: ["data", "table"],
    code: `<DataTable columns={[{ key: "name", header: "Name" }]} data={[{ id: 1, name: "Button" }]} />`,
    controls: [],
    defaultProps: {},
    render: () => (
      <DataTable
        columns={[
          { key: "name", header: "Component" },
          { key: "category", header: "Category" },
          { key: "status", header: "Status" },
        ]}
        data={[
          { id: 1, name: "Button", category: "Buttons", status: "Stable" },
          { id: 2, name: "Modal", category: "Feedback", status: "Stable" },
          { id: 3, name: "AI Generator", category: "Feedback", status: "Beta" },
        ]}
      />
    ),
  },
];

export function getComponentById(id: string) {
  return componentRegistry.find((c) => c.id === id);
}
