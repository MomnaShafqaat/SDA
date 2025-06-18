import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const UserStatsChart = ({ mentorCount, studentCount }) => {
  const barData = [
    {
      name: "Mentors",
      count: mentorCount,
      color: "#10b981",
    },
    {
      name: "Students",
      count: studentCount,
      color: "#3b82f6",
    },
  ]

  const pieData = [
    {
      name: "Mentors",
      value: mentorCount,
      color: "#10b981",
    },
    {
      name: "Students",
      value: studentCount,
      color: "#3b82f6",
    },
  ]

  const COLORS = ["#10b981", "#3b82f6"]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-lg">
        <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">User Distribution - Bar Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: "#374151", fontSize: 14 }} axisLine={{ stroke: "#9ca3af" }} />
            <YAxis tick={{ fill: "#374151", fontSize: 14 }} axisLine={{ stroke: "#9ca3af" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-lg">
        <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">User Distribution - Pie Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default UserStatsChart
