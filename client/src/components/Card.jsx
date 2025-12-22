export default function Card({ title, value,  className, headerClasses, childClasses }) {
  return (
    <div className={`flex items-center justify-start rounded-2xl  shadow-md  shadow-gray-200 dark:shadow-gray-500 p-5 transition hover:shadow-lg ${className}`}>
      {/* Left section */}
      <div className="w-full">
        <h3 className={`text-sm font-bold text-gray-500 ${headerClasses}`}>{title}</h3>
        <p className={`w-full text-4xl font-bold text-center p-3 ${childClasses}`}>{value ?? 0}</p>
      </div>

    </div>
  )
}
