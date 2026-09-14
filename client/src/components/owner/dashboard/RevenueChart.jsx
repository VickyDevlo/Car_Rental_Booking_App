import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../../utils/formatCurrency";

const RevenueChart = ({ data = {}, revenueTrend = [], currency = "USD" }) => {
  const currencyCode = currency === "$" ? "USD" : currency;
  
  return (
    <div className="flex-1 min-w-[320px] rounded-xl border border-borderColor bg-white p-5 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-gray-800">Revenue trend</h2>
          <p className="mt-0.5 text-sm text-gray-500">Revenue over time</p>
        </div>
        <p className="text-xl font-semibold text-gray-800">
          {formatCurrency(data.monthlyRevenue ?? 0, currencyCode)}
        </p>
      </div>
      {/* Chart */}
      <div className="mt-4 h-56 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueTrend}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              width={48}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 13,
              }}
              formatter={(value) => [
                formatCurrency(value ?? 0, currencyCode),
                "Revenue",
              ]}
            />
            <Bar
              dataKey="revenue"
              fill="var(--color-primary, #4f46e5)"
              radius={[6, 6, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default RevenueChart;
