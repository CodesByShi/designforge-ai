"use client";

import * as React from "react";
import { Folder, Plus, Trash2, Download, Heart } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalTrigger, ModalContent } from "@/components/ui/modal";
import { getComponentById, type ComponentEntry } from "@/data/components";
import { useKitStore } from "@/store/useKitStore";
import { useToastStore } from "@/store/useToastStore";

async function exportAsZip(componentIds: string[], zipName: string) {
  const JSZip = (await import("jszip")).default;
  const { saveAs } = await import("file-saver");
  const zip = new JSZip();
  componentIds.forEach((id) => {
    const entry = getComponentById(id);
    if (entry) zip.file(`${entry.name.replace(/\s+/g, "")}.tsx`, entry.code);
  });
  const readme = `# ${zipName}\n\nExported from DesignForge AI on ${new Date().toISOString().slice(0, 10)}.\n\nComponents:\n${componentIds
    .map((id) => `- ${getComponentById(id)?.name}`)
    .join("\n")}\n`;
  zip.file("README.md", readme);
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${zipName.toLowerCase().replace(/\s+/g, "-")}.zip`);
}

export default function MyKitPage() {
  const { favoriteIds, collections, toggleFavorite, createCollection, deleteCollection, addToCollection, removeFromCollection } =
    useKitStore();
  const [newCollectionName, setNewCollectionName] = React.useState("");
  const push = useToastStore((s) => s.push);

  const favorites = favoriteIds
    .map((id) => getComponentById(id))
    .filter((entry): entry is ComponentEntry => Boolean(entry));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="font-display text-3xl font-semibold">My Kit</h1>
        <p className="mt-1 text-paper-dim">{"Everything you've saved lives here, stored locally in your browser — no account needed."}</p>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-ember" /> Favorites ({favorites.length})
            </h2>
            {favorites.length > 0 && (
              <Button size="sm" variant="outline" onClick={() => exportAsZip(favoriteIds, "My Favorites")}>
                <Download className="h-4 w-4" /> Export ZIP
              </Button>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="mt-4 rounded-sf border border-dashed border-graphite-border p-10 text-center">
              <p className="text-paper-dim">No favorites yet. Browse the library and tap the heart on any component.</p>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((entry) => (
                <div key={entry.id} className="rounded-sf border border-graphite-border bg-graphite p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{entry.name}</h3>
                    <button
                      onClick={() => toggleFavorite(entry.id)}
                      aria-label={`Remove ${entry.name} from favorites`}
                      className="text-paper-dim hover:text-ember"
                    >
                      <Heart className="h-4 w-4 fill-ember text-ember" />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-paper-dim">{entry.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold flex items-center gap-2">
              <Folder className="h-5 w-5 text-blueprint" /> Collections
            </h2>
            <Modal>
              <ModalTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4" /> New collection</Button>
              </ModalTrigger>
              <ModalContent title="Create a collection" description="Group components for a specific project or client.">
                <div className="space-y-3">
                  <Input
                    label="Collection name"
                    placeholder="e.g. Marketing site"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    disabled={!newCollectionName.trim()}
                    onClick={() => {
                      createCollection(newCollectionName.trim());
                      setNewCollectionName("");
                      push({ title: "Collection created", variant: "success" });
                    }}
                  >
                    Create
                  </Button>
                </div>
              </ModalContent>
            </Modal>
          </div>

          {collections.length === 0 ? (
            <div className="mt-4 rounded-sf border border-dashed border-graphite-border p-10 text-center">
              <p className="text-paper-dim">No collections yet. Create one to group components for a project.</p>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {collections.map((col) => (
                <div key={col.id} className="rounded-sf border border-graphite-border bg-graphite p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{col.name}</h3>
                    <div className="flex items-center gap-2">
                      {col.componentIds.length > 0 && (
                        <Button size="sm" variant="outline" onClick={() => exportAsZip(col.componentIds, col.name)}>
                          <Download className="h-3.5 w-3.5" /> Export
                        </Button>
                      )}
                      <button
                        onClick={() => deleteCollection(col.id)}
                        aria-label={`Delete ${col.name} collection`}
                        className="rounded p-1.5 text-paper-dim hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {col.componentIds.length === 0 ? (
                    <p className="mt-2 text-sm text-paper-dim">Empty — add components from the library.</p>
                  ) : (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {col.componentIds.map((id) => {
                        const c = getComponentById(id);
                        if (!c) return null;
                        return (
                          <li key={id} className="flex items-center gap-1.5 rounded-full border border-graphite-border px-2.5 py-1 text-xs">
                            {c.name}
                            <button onClick={() => removeFromCollection(col.id, id)} aria-label={`Remove ${c.name}`} className="text-paper-dim hover:text-red-400">
                              ×
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {favorites
                      .filter((f) => !col.componentIds.includes(f.id))
                      .slice(0, 5)
                      .map((f) => (
                        <button
                          key={f.id}
                          onClick={() => addToCollection(col.id, f.id)}
                          className="rounded-full border border-dashed border-graphite-border px-2.5 py-1 text-xs text-paper-dim hover:text-ember hover:border-ember/50"
                        >
                          + {f.name}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
