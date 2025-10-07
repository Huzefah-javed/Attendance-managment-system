import { useState } from "react";

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Computer Science"];

export default function AdminStudentHistory() {

  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [roll, setRoll] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Student Attendance Lookup</h1>
          <p className="text-sm text-muted-foreground">Enter a roll number and subject to view the students attendance history.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/85 backdrop-blur supports-[backdrop-filter]:bg-card/70 shadow-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="roll" className="text-sm font-medium">Roll number</label>
              <input
                id="roll"
                type="text"
                value={roll}
                onChange={(e) => {
                  setRoll(e.target.value);
                  setPage(1);
                }}
                placeholder="e.g. 21CS123"
                className="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <span className="text-xs text-muted-foreground">Total records: {data?.totalCount ?? "--"}</span>
              <span className="text-xs text-muted-foreground">Present: {data?.totalPresent ?? "--"}</span>
            </div>
            <div className="flex flex-col justify-end">
              <div className="text-xs text-muted-foreground">Attendance %</div>
              {/* <div className="text-2xl font-bold">{disabled ? "--" : `${percentage}%`}</div> */}
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {!error && loading && <div className="text-sm text-muted-foreground">Loading records...</div>}
          {<div className="text-sm text-muted-foreground">Enter a roll number to view attendance history.</div>}
        </div>

         { (
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 shadow-xl overflow-hidden">
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.items.map((item) => (
                    <tr key={item.id} className="border-t border-border/60">
                      <td className="px-4 py-3">{item.date}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === "present" ? "bg-green-500/15 text-green-700" : "bg-red-500/15 text-red-700"}`}>
                          {item.status === "present" ? "Present" : "Absent"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!loading && data && data.items.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-4 py-6 text-center text-sm text-muted-foreground">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div> 

             <div className="sm:hidden divide-y divide-border/60">
              {data?.items.map((item) => (
                <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{item.date}</div>
                    <div className="text-xs text-muted-foreground">{subject}</div>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${item.status === "present" ? "bg-green-500/15 text-green-700" : "bg-red-500/15 text-red-700"}`}>
                    {item.status === "present" ? "Present" : "Absent"}
                  </span>
                </div>
              ))}
              {!loading && data && data.items.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">No records found.</div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-border/60 flex items-center justify-between gap-3">
              <button
                disabled={page <= 1 || disabled || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center rounded-lg px-3 py-2 text-sm border border-input disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/50"
              >
                Previous
              </button>
              <div className="text-xs text-muted-foreground">
                {/* Page {data?.page ?? page} of {totalPages} */}
              </div>
              <button
            
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center rounded-lg px-3 py-2 text-sm border border-input disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
