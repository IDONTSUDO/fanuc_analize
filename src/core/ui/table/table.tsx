import * as React from "react";
import { observer } from "mobx-react-lite";

const c = {
  border: "oklch(92.9% 0.013 255.508)",
  rowBorder: "oklch(96.7% 0.003 264.542)",
  headBg: "oklch(98.4% 0.003 247.858)",
  headText: "#8fa1b9",
  text: "oklch(27.8% 0.033 256.848)",
  hover: "oklch(97% 0.014 254.604)",
};

const th: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  background: c.headBg,
  color: c.headText,
  borderBottom: `1px solid ${c.border}`,
  padding: "10px 14px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "12px 14px",
  fontSize: 14,
  color: c.text,
  textAlign: "left",
  verticalAlign: "middle",
};

export const CoreTable: React.FC<{
  columns: string[];
  source: object[];
  missingKey?: string[];
  replacedJSXColumns?: { name: string; jsx: (el: any) => React.ReactNode }[];
  addingColumns?: { name: string; jsx: (el: any) => React.ReactNode }[];
  replacedColumns?: { name: string; replace: string }[];
  onClick?: (index: number) => void;
  mappedColumns:
    | { name: string; mapper: (date: any) => React.ReactNode }[]
    | undefined;
}> = observer(({ columns, source, onClick, replacedColumns, mappedColumns, missingKey, addingColumns }) => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const headerTitle = (column: string) =>
    replacedColumns?.find((element) => element.name === column)?.replace ?? column;

  const cellValue = (row: any, key: string, value: unknown): React.ReactNode => {
    const mapper = mappedColumns?.find((element) => element.name === key);
    return mapper ? mapper.mapper(row[key]) : (value as React.ReactNode);
  };

  return (
    <div
      style={{
        height: "calc(100% - 50px)",
        border: `1px solid ${c.border}`,
        borderRadius: 8,
        overflow: "auto",
        background: "#fff",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} style={th}>
                {headerTitle(column)}
              </th>
            ))}
            {addingColumns?.map((column) => (
              <th key={`add-${column.name}`} style={th}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {source.map((row, i) => {
            const isHovered = hovered === i && onClick !== undefined;
            const cell: React.CSSProperties = {
              ...td,
              borderBottom: i === source.length - 1 ? "none" : `1px solid ${c.rowBorder}`,
              background: isHovered ? c.hover : "#fff",
              transition: "background 120ms",
            };
            return (
              <tr
                key={(row as any).id ?? i}
                onClick={() => onClick?.(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                style={{ cursor: onClick ? "pointer" : "default" }}
              >
                {Object.entries(row)
                  .filter(([key]) => !(missingKey?.includes(key) ?? false))
                  .map(([key, value]) => (
                    <td key={key} style={cell}>
                      {cellValue(row, key, value)}
                    </td>
                  ))}
                {addingColumns?.map((column) => (
                  <td key={`add-${column.name}`} style={cell}>
                    {column.jsx(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
