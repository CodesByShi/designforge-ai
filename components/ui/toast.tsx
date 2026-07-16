"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { CheckCircle2, X, XCircle, Info } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";
import { cn } from "@/lib/utils";

const icons = { default: Info, success: CheckCircle2, error: XCircle };

/** Global toast viewport — mount once near the root layout. Trigger with useToastStore.push(). */
export function Toaster() {
  const { toasts, dismiss } = useToastStore();
  return (
    <ToastPrimitive.Provider swipeDirection="right" duration={4000}>
      {toasts.map((toast) => {
        const Icon = icons[toast.variant || "default"];
        return (
          <ToastPrimitive.Root
            key={toast.id}
            onOpenChange={(open) => !open && dismiss(toast.id)}
            className={cn(
              "flex items-start gap-3 rounded-sf border border-graphite-border bg-graphite-light p-4 shadow-panel",
              "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 shrink-0",
                toast.variant === "success" && "text-emerald-400",
                toast.variant === "error" && "text-red-400",
                (!toast.variant || toast.variant === "default") && "text-blueprint"
              )}
              aria-hidden="true"
            />
            <div className="flex-1">
              <ToastPrimitive.Title className="text-sm font-medium text-paper">{toast.title}</ToastPrimitive.Title>
              {toast.description && (
                <ToastPrimitive.Description className="text-xs text-paper-dim">{toast.description}</ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close aria-label="Dismiss notification" className="text-paper-dim hover:text-paper">
              <X className="h-4 w-4" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        );
      })}
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-[100] flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-2 outline-none" />
    </ToastPrimitive.Provider>
  );
}
