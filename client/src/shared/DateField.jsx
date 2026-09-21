import { useRef } from "react";

export const fieldShell =
  "relative flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left " +
  "transition-colors " +
  "md:px-6";

export const iconBubble =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-light text-primary md:hidden";

export const labelText = "block text-xs font-medium text-gray-500";
export const valueText = "block truncate text-sm font-medium md:text-base";

// Local YYYY-MM-DD (toISOString() is UTC and can be off by one day)
export const toInputDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

// "2026-09-21" -> "21 Sep 2026" (parsed as a local date, no timezone shift)
export const formatDate = (value) => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const countDays = (start, end) => {
  if (!start || !end) return 0;
  const [y1, m1, d1] = start.split("-").map(Number);
  const [y2, m2, d2] = end.split("-").map(Number);
  const diff = (Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000;
  return diff < 0 ? 0 : Math.max(diff, 1);
};

const CalendarIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);


export const DateField = ({ id, label, placeholder, value, min, onChange }) => {
  const inputRef = useRef(null);

  const openPicker = () => {
    try {
      inputRef.current?.showPicker?.();
    } catch {
      /* Not supported: the browser's native tap behaviour still works. */
    }
  };

  return (
    <div className={fieldShell}>
      <span className={iconBubble}>
        <CalendarIcon />
      </span>

      <div className="min-w-0 flex-1">
        <span className={labelText} aria-hidden="true">
          {label}
        </span>
        <span
          className={`${valueText} ${value ? "text-gray-900" : "text-gray-400"}`}
          aria-hidden="true"
        >
          {value ? formatDate(value) : placeholder}
        </span>
      </div>

      <input
        ref={inputRef}
        id={id}
        name={id}
        type="date"
        aria-label={label}
        min={min}
        value={value}
        onChange={onChange}
        onClick={openPicker}
        required
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
};
