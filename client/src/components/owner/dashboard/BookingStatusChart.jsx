import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const STATUS_COLORS = {
  confirmed: "#16a34a",
  pending: "#d97706",
  cancelled: "#dc2626",
};

const BookingStatusChart = ({ statusBreakdown }) => {
  return (
    <div className="p-5 md:p-6 border border-borderColor rounded-xl bg-white w-full md:max-w-xs">
      <h2 className="font-semibold text-gray-800">
        Bookings by status
      </h2>

      <p className="text-sm text-gray-500 mt-0.5">
        Distribution of recent bookings
      </p>

      <div className="h-44 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusBreakdown}
              dataKey="value"
              nameKey="name"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={3}
              stroke="none"
            >
              {statusBreakdown.map((entry, i) => (
                <Cell
                  key={i}
                  fill={STATUS_COLORS[entry.name] ?? "#94a3b8"}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 13,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
        {statusBreakdown.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center gap-1.5 text-sm"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  STATUS_COLORS[entry.name] ?? "#94a3b8",
              }}
            />

            <span className="capitalize text-gray-600">
              {entry.name}
            </span>

            <span className="text-gray-400">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStatusChart;
