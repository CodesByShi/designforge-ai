export interface PropRow {
  prop: string;
  type: string;
  default: string;
}

/** Props reference table used inside component MDX docs pages. */
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="not-prose overflow-x-auto rounded-sf border border-graphite-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-graphite-light text-paper-dim">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">Prop</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Default</th>
          </tr>
        </thead>
        <tbody>
  {(rows ?? []).map((row) => (
            <tr key={row.prop} className="border-t border-graphite-border">
              <td className="px-4 py-2.5 font-mono text-xs text-ember">{row.prop}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-paper-dim">{row.type}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-paper-dim">{row.default}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
