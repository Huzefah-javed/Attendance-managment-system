import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar({menu}) {
  const [open, setOpen] = useState(false);

  
    const authData = useSelector(state => state.authInfo);
    const parentRoute = authData.role === "ADMIN"? "teacher" : authData.role === "STUDENT"? "student": ""

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    localStorage.removeItem("auth_token");
    close();
  };

  return (
    <>
      {/* Menu button */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={toggle}
        className="fixed right-4 top-4 z-50 inline-flex items-center justify-center rounded-full bg-brand bg-blue-800 text-white text-brand-foreground p-3 shadow-lg shadow-brand/30 transition hover:brightness-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ring-offset-background"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        )}
      </button>

      {/* Backdrop */}
      <div
        onClick={close}
        className={`${open ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 z-10  bg-black/40 backdrop-blur-sm transition-opacity`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 bg-white h-screen w-72 border-r border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/30">
              <div className="h-3 w-3 rounded-full bg-blue-800" />
            </div>
            <span className="font-semibold tracking-tight">Student Attendance system</span>
          </div>

          <nav className="flex-1 flex flex-col px-3 py-4 space-y-1 text-sm">

          {
            menu.map((m)=>(
             <Link
            to={`/${parentRoute}/${m}`}
            onClick={close}
            className="w-full text-left rounded-lg px-3 py-2 hover:bg-black/10 transition"
            >
              {m}
            </Link>
          ))
            }

          </nav>

          <div className="mt-auto border-t border-border/60 p-4">
            <button
              onClick={handleLogout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium bg-blue-800 text-white shadow-sm shadow-brand/20 transition hover:brightness-105 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ring-offset-background"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
