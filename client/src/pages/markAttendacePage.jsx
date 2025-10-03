import { useState } from "react";


export default function Attendance() {
  const [rows, setRows] = useState([
    { subject: "Mathematics", date: "2025-01-10", start: "09:00", end: "10:00", status: "present" },
    { subject: "Physics", date: "2025-01-10", start: "10:15", end: "11:15", status: "absent" },
  ]);

  const updateStatus = (i, status) => {
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, status } : row)));
  };

  const saveRow = (i) => {
    // Replace with backend call per row
    console.log("Row saved:", rows[i]);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">Mark Attendance</h1>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-/70 shadow-xl overflow-hidden">
          {/* Mobile: card list */}
          <div className="sm:hidden divide-y divide-border">
            {rows.map((row, i) => (
              <div key={i} className="p-4 grid grid-cols-2 gap-3">
                <span className="col-span-2 text-sm font-medium text-muted-foreground">Subject Name</span>
                <span className="col-span-2 rounded-lg px-3 py-2 bg-muted/30 text-sm font-medium">{row.subject}</span>

                <span className="text-sm font-medium text-muted-foreground">Date</span>
                <span className="rounded-lg px-3 py-2 bg-[#feff]/30">{row.date}</span>

                <span className="text-sm font-medium text-muted-foreground">Start Time</span>
                <span className="rounded-lg px-3 py-2 bg-muted/30">{row.start}</span>

                <span className="text-sm font-medium text-muted-foreground">End Time</span>
                <span className="rounded-lg px-3 py-2 bg-muted/30">{row.end}</span>

                <div className="col-span-2 grid grid-cols-2 gap-3 items-center">
                  <select
                    value={row.status}
                    onChange={(e) => updateStatus(i, e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                  <button
                    onClick={() => saveRow(i)}
                    className="w-full inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-brand/20 shadow hover:brightness-105 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet: table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Subject Name</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Start Time</th>
                  <th className="px-4 py-3 font-semibold">End Time</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-t border-border/60">
                    <td className="px-4 py-3 align-middle">
                      <span className="block rounded-lg px-3 py-2 bg-muted/30 text-sm font-medium">{row.subject}</span>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className="block rounded-lg px-3 py-2 bg-muted/30">{row.date}</span>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className="block rounded-lg px-3 py-2 bg-muted/30">{row.start}</span>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className="block rounded-lg px-3 py-2 bg-muted/30">{row.end}</span>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <select
                        value={row.status}
                        onChange={(e) => updateStatus(i, e.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                      >
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 align-middle text-right">
                      <button
                        onClick={() => saveRow(i)}
                        className="inline-flex items-center rounded-lg bg-blue-800 text-white px-4 py-2 text-sm font-semibold text-brand-foreground shadow-brand/20 shadow hover:brightness-105 transition"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
