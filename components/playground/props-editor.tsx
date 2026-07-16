"use client";

import type { PlaygroundControl } from "@/data/components";
import { Toggle } from "@/components/ui/toggle";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

/** Renders the right control (select / boolean toggle) for each playground prop. */
export function PropsEditor({
  controls,
  values,
  onChange,
}: {
  controls: PlaygroundControl[];
  values: Record<string, string | boolean>;
  onChange: (key: string, value: string | boolean) => void;
}) {
  if (controls.length === 0) {
    return <p className="text-sm text-paper-dim">{"This component has no editable props — it's presentational."}</p>;
  }
  return (
    <div className="space-y-4">
      {controls.map((control) => (
        <div key={control.key} className="flex items-center justify-between gap-4">
          <span className="text-sm text-paper-dim">{control.label}</span>
          {control.type === "boolean" ? (
            <Toggle
              checked={!!values[control.key]}
              onCheckedChange={(v) => onChange(control.key, v)}
            />
          ) : (
            <Select value={String(values[control.key])} onValueChange={(v) => onChange(control.key, v)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                {control.options?.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      ))}
    </div>
  );
}
