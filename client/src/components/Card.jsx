export default function Card({ title, value,  className }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl  shadow-md  shadow-gray-200 dark:shadow-gray-500 p-5 transition hover:shadow-lg ${className}`}>
      {/* Left section */}
      <div>
        <h3 className="text-sm font-bold text-gray-500">{title}</h3>
        <p className="">{value ?? "No data"}</p>
        
      </div>

    </div>
  )
}
