import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T;
  header: string;
}

/** Generic, accessible data table with proper <thead>/scope semantics. */
export function DataTable<T extends { id: string | number }>({ columns, data, className }: { columns: Column<T>[]; data: T[]; className?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-sf border border-graphite-border", className)}>
      <table className="w-full text-left text-sm">
        <thead className="bg-graphite-light text-paper-dim">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} scope="col" className="px-4 py-2.5 font-medium">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t border-graphite-border hover:bg-graphite/60">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2.5 text-paper-dim">{String(row[col.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
