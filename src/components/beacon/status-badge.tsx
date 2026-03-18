// Reusable status badge for all Beacon modules

type StatusConfig = {
  dot: string;
  text: string;
  bg: string;
};

const STATUS_MAP: Record<string, StatusConfig> = {
  // Contact statuses
  active:   { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  inactive: { dot: "bg-gray-400",    text: "text-gray-600",    bg: "bg-gray-100 border-gray-200"     },
  pending:  { dot: "bg-amber-400",   text: "text-amber-700",   bg: "bg-amber-50 border-amber-200"    },

  // Invoice statuses
  draft:      { dot: "bg-gray-400",    text: "text-gray-600",    bg: "bg-gray-100 border-gray-200"       },
  sent:       { dot: "bg-blue-400",    text: "text-blue-700",    bg: "bg-blue-50 border-blue-200"        },
  paid:       { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200"  },
  downloaded: { dot: "bg-violet-400",  text: "text-violet-700",  bg: "bg-violet-50 border-violet-200"   },

  // Quotation statuses
  accepted: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  declined: { dot: "bg-red-400",     text: "text-red-700",     bg: "bg-red-50 border-red-200"         },
};

type Props = {
  status: string;
  size?: "sm" | "md";
};

export default function StatusBadge({ status, size = "md" }: Props) {
  const key = status.toLowerCase();
  const s: StatusConfig = STATUS_MAP[key] ?? {
    dot: "bg-dgc-blue-1",
    text: "text-dgc-blue-2",
    bg: "bg-blue-50 border-blue-200",
  };

  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[10px]"
      : "px-2.5 py-1 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold capitalize border ${sizeClasses} ${s.bg} ${s.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {status || "—"}
    </span>
  );
}
