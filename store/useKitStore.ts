"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Collection {
  id: string;
  name: string;
  componentIds: string[];
  createdAt: string;
}

interface KitState {
  favoriteIds: string[];
  collections: Collection[];
  toggleFavorite: (componentId: string) => void;
  isFavorite: (componentId: string) => boolean;
  createCollection: (name: string) => string;
  deleteCollection: (id: string) => void;
  addToCollection: (collectionId: string, componentId: string) => void;
  removeFromCollection: (collectionId: string, componentId: string) => void;
}

/**
 * "My Kit" — favorites and personal collections, entirely client-side
 * (localStorage via zustand/persist). No auth, no backend required.
 */
export const useKitStore = create<KitState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      collections: [],

      toggleFavorite: (componentId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(componentId)
            ? state.favoriteIds.filter((id) => id !== componentId)
            : [...state.favoriteIds, componentId],
        })),

      isFavorite: (componentId) => get().favoriteIds.includes(componentId),

      createCollection: (name) => {
        const id = crypto.randomUUID();
        set((state) => ({
          collections: [
            ...state.collections,
            { id, name, componentIds: [], createdAt: new Date().toISOString() },
          ],
        }));
        return id;
      },

      deleteCollection: (id) =>
        set((state) => ({ collections: state.collections.filter((c) => c.id !== id) })),

      addToCollection: (collectionId, componentId) =>
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId && !c.componentIds.includes(componentId)
              ? { ...c, componentIds: [...c.componentIds, componentId] }
              : c
          ),
        })),

      removeFromCollection: (collectionId, componentId) =>
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? { ...c, componentIds: c.componentIds.filter((id) => id !== componentId) }
              : c
          ),
        })),
    }),
    { name: "designforge-kit" }
  )
);
