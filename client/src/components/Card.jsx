export default function Card({ title, value,  className }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl  shadow-md  shadow-gray-200 dark:shadow-gray-500 p-5 transition hover:shadow-lg ${className}`}>
      {/* Left section */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-black">{value || "no data"}</p>
        
      </div>

    </div>
  )
}
