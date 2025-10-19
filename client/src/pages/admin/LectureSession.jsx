function AdminSession(){

  return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
  <div className="mx-auto w-full max-w-5xl space-y-6">
    <div className="space-y-2">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
        Create Lecture Session
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        Configure a new lecture attendance session for students.
      </p>
    </div>

    <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
              {["OOP", "Digital Logic Design", "Data Structures", "Database Systems"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 sm:mt-8">
          <button className="w-full sm:w-auto sm:min-w-[200px] inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all">
            Make Session
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default AdminSession