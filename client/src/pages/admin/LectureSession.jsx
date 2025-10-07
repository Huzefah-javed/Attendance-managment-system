import { useState } from "react";

export default function AdminSessions() {
  const [sessions, setSessions] = useState();
  const [subject, setSubject] = useState();
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
  <div className="mx-auto w-full max-w-5xl space-y-6">
    <div className="space-y-1">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Create Lecture Session</h1>
      <p className="text-sm text-gray-600">Configure a new lecture attendance session for students.</p>
    </div>

    <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-xl">
      {/* Mobile layout */}
      <div className="sm:hidden p-5 space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm font-medium">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {["DLD", "POM", "OOP", "ISL"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label className="text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-sm font-medium">Start time</label>
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-sm font-medium">End time</label>
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          // onClick={handleCreate}
          className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
        >
          Make Session
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-4 py-3 font-semibold">Subject</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Start time</th>
              <th className="px-4 py-3 font-semibold">End time</th>
              <th className="px-4 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-4 py-3">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {["DLD", "POM", "OOP", "ISL"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  // onClick={handleCreate}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
                >
                  Make Session
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  


        {/* Grouped summary */}
        
        {error && !message && (
          <div className="hidden sm:block text-sm text-red-600">{error}</div>
        )}
        {message && (
          <div className="hidden sm:block text-sm text-emerald-600">{message}</div>
        )}
      </div>
    </div>
  );
}
