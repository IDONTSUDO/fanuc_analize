import * as React from "react";

export type SearchOption = {
  id: number;
  label: string;
};

const BORDER = "oklch(92.9% 0.013 255.508)";
const BORDER_ACTIVE = "oklch(70.7% 0.022 261.325)";
const TEXT = "oklch(27.8% 0.033 256.848)";
const MUTED = "#8fa1b9";
const HOVER = "oklch(96.7% 0.003 264.542)";
const ACCENT = "oklch(54.6% 0.245 262.881)";

// Поле ввода с поиском по базе: показывает найденные записи,
// а если точного совпадения нет — предлагает создать новую запись с введённым названием.
export const SearchCreateInput = (props: {
  label?: string;
  placeholder?: string;
  // текущее значение (название выбранной/введённой записи)
  value: string;
  search: (text: string) => Promise<SearchOption[]>;
  onSelect: (option: SearchOption) => void;
  // вызывается при ручном вводе — запись ещё не выбрана
  onTextChange?: (text: string) => void;
  onCreate?: (text: string) => Promise<SearchOption | undefined>;
  debounceMs?: number;
}) => {
  const [text, setText] = React.useState(props.value);
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] = React.useState<SearchOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const requestId = React.useRef(0);

  React.useEffect(() => {
    setText(props.value);
  }, [props.value]);

  // поиск с задержкой; устаревшие ответы отбрасываются
  React.useEffect(() => {
    if (!isOpen) return;
    const id = ++requestId.current;
    setLoading(true);
    const timer = setTimeout(async () => {
      let result: SearchOption[] = [];
      try {
        result = await props.search(text.trim());
      } catch {
        result = [];
      }
      if (id !== requestId.current) return;
      setOptions(result);
      setActive(0);
      setLoading(false);
    }, props.debounceMs ?? 250);
    return () => clearTimeout(timer);
  }, [text, isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  const trimmed = text.trim();
  const hasExact = options.some((o) => o.label.trim().toLowerCase() === trimmed.toLowerCase());
  const canCreate = !!props.onCreate && trimmed.length > 0 && !hasExact && !loading;
  // элементы списка: найденные записи + (опционально) пункт «создать»
  const itemCount = options.length + (canCreate ? 1 : 0);

  const select = (option: SearchOption) => {
    setText(option.label);
    setIsOpen(false);
    props.onSelect(option);
  };

  const create = async () => {
    if (!props.onCreate || creating) return;
    setCreating(true);
    const created = await props.onCreate(trimmed);
    setCreating(false);
    if (created) select(created);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(itemCount - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active < options.length) {
        if (options[active]) select(options[active]);
      } else if (canCreate) {
        create();
      }
    }
  };

  const itemStyle = (index: number): React.CSSProperties => ({
    padding: "8px 10px",
    borderRadius: 4,
    fontSize: 14,
    cursor: "pointer",
    color: TEXT,
    background: active === index ? HOVER : "transparent",
  });

  return (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", width: "100%", position: "relative" }}
    >
      {props.label && <div style={{ fontSize: 10 }}>{props.label}</div>}
      <input
        value={text}
        placeholder={props.placeholder}
        onFocus={() => setIsOpen(true)}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          setText(e.target.value);
          setIsOpen(true);
          props.onTextChange?.(e.target.value);
        }}
        style={{
          height: 40,
          color: TEXT,
          borderRadius: 5,
          padding: "0 12px",
          font: "inherit",
          fontSize: 14,
          outline: "none",
          border: `1px solid ${isOpen ? BORDER_ACTIVE : BORDER}`,
          boxShadow: isOpen ? `0 0 0 3px ${HOVER}` : "none",
        }}
        type="text"
      />
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
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
            padding: 4,
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {loading && options.length === 0 && (
            <div style={{ padding: "8px 10px", fontSize: 14, color: MUTED }}>поиск…</div>
          )}
          {!loading && itemCount === 0 && (
            <div style={{ padding: "8px 10px", fontSize: 14, color: MUTED }}>
              {trimmed ? "ничего не найдено" : "начните вводить название"}
            </div>
          )}
          {options.map((opt, index) => (
            <div
              key={opt.id}
              role="option"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(opt)}
              onMouseEnter={() => setActive(index)}
              style={itemStyle(index)}
            >
              {opt.label}
            </div>
          ))}
          {canCreate && (
            <div
              role="option"
              onMouseDown={(e) => e.preventDefault()}
              onClick={create}
              onMouseEnter={() => setActive(options.length)}
              style={{ ...itemStyle(options.length), color: ACCENT, fontWeight: 500 }}
            >
              {creating ? "создаём…" : `+ создать «${trimmed}»`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
