export default function Card({ title, value, icon: Icon, trend, className }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-800 p-5 transition hover:shadow-lg ${className}`}>
      {/* Left section */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {trend && (
          <p
            className={`mt-1 text-sm font-semibold ${
              trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-gray-500"
            }`}
          >
            {trend > 0 ? `↑ ${trend}%` : trend < 0 ? `↓ ${Math.abs(trend)}%` : "No change"}
          </p>
        )}
      </div>

      {/* Right section (icon) */}
      {Icon && (
        <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  )
}
