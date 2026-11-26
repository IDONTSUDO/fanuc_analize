import * as React from "react";

export type SelectV3Option = {
  label: string;
  value: string;
};

const BORDER = "oklch(92.9% 0.013 255.508)";
const BORDER_ACTIVE = "oklch(70.7% 0.022 261.325)";
const TEXT = "oklch(27.8% 0.033 256.848)";
const MUTED = "#8fa1b9";
const HOVER = "oklch(96.7% 0.003 264.542)";

export const SelectV3 = (props: {
  label?: string;
  placeholder?: string;
  options: SelectV3Option[];
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  const selected = props.options.find((o) => o.value === props.value);

  React.useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={Object.assign(
        {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          position: "relative",
          textAlign: "left",
        },
        props.style,
      )}
    >
      {props.label && <div style={{ fontSize: 10 }}>{props.label}</div>}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        style={{
          height: 40,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "0 12px",
          background: "#fff",
          borderRadius: 5,
          border: `1px solid ${isOpen ? BORDER_ACTIVE : BORDER}`,
          boxShadow: isOpen ? `0 0 0 3px ${HOVER}` : "none",
          cursor: "pointer",
          font: "inherit",
          fontSize: 14,
          textAlign: "left",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      >
        <span
          style={{
            color: selected ? TEXT : MUTED,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selected ? selected.label : (props.placeholder ?? "Выберите")}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={MUTED}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.15s",
          }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 20,
            background: "#fff",
            border: `1px solid ${BORDER}`,
            borderRadius: 6,
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
            padding: 4,
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {props.options.map((opt) => {
            const isSelected = opt.value === props.value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  props.onChange?.(opt.value);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHovered(opt.value)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: 4,
                  fontSize: 14,
                  cursor: "pointer",
                  color: TEXT,
                  fontWeight: isSelected ? 500 : 400,
                  background: hovered === opt.value ? HOVER : "transparent",
                }}
              >
                {opt.label}
                {isSelected && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={TEXT}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
