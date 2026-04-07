"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartPoint = { month: string; invoices: number; quotations: number };

interface Props {
  data: ChartPoint[];
}

function fmtK(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return String(v);
}

export default function FinanceChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={fmtK}
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          width={44}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            `KES ${value.toLocaleString()}`,
            name === "invoices" ? "Invoices" : "Quotations",
          ]}
          contentStyle={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            fontSize: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
          cursor={{ fill: "rgba(0,0,0,0.03)" }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(v) => (
            <span style={{ fontSize: 11, color: "#6b7280" }}>
              {v === "invoices" ? "Invoices" : "Quotations"}
            </span>
          )}
        />
        <Bar dataKey="invoices"    fill="#3D9DD9" radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Bar dataKey="quotations"  fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}
