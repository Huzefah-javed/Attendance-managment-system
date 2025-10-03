import { useState } from "react";

export function AttendanceHistory(){
    const [subject, setSubject] = useState("Mathematics");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Computer Science"]

    return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Attendance history</h1>
            <p className="text-sm text-muted-foreground">Select a subject to view past records.</p>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand min-w-56"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 shadow-sm p-4 flex items-center justify-center">
            {/* <Donut percent={percent} /> */}
          </div>

          <div className="md:col-span-2 rounded-2xl border border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
              <span className="font-semibold">Last 10 records</span>
              {loading && <span className="text-xs text-muted-foreground">Loading…</span>}
            </div>
            <ul className="divide-y divide-border/60">
              {data?.items.map((it) => (
                <li key={it.id} className="px-4 py-3 flex items-center justify-between text-sm">
                  <span className="font-medium">{it.date}</span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${it.status === "present" ? "bg-green-500/15 text-green-700" : "bg-red-500/15 text-red-700"}`}>
                    {it.status === "present" ? "Present" : "Absent"}
                  </span>
                </li>
              ))}
              {!loading && data && data.items.length === 0 && (
                <li className="px-4 py-10 text-center text-sm text-muted-foreground">No records</li>
              )}
            </ul>

            <div className="px-4 py-3 border-t border-border/60 flex items-center justify-between gap-3">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center rounded-lg px-3 py-2 text-sm border border-input disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/50"
              >
                Previous
              </button>
              <div className="text-xs text-muted-foreground">
                {/* Page {data?.page ?? page} of {totalPages} */}
              </div>
              <button
                // disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center rounded-lg px-3 py-2 text-sm border border-input disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}