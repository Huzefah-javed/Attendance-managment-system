import { useSelector } from "react-redux";

function UserInfo(){

  const authData = useSelector(state=> state.authInfo)
  

  return (
  <div className="w-full p-4 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm sm:px-6 lg:px-8">
    <div className="flex items-center gap-4 min-w-0">
      {/* Profile Initial Avatar (Adds a nice visual touch) */}
      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">
        {authData.name?.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex flex-col">
        {/* Name Section */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight truncate capitalize">
            {authData.name}
          </h1>
          {/* Role Badge - Repositioned next to name for quick ID */}
          <span className="hidden sm:inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-700 ring-1 ring-inset ring-blue-700/10 uppercase tracking-wider">
            {authData.role}
          </span>
        </div>

        {/* Info Row */}
        <div className="flex items-center gap-3 mt-0.5">
          <p className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-tight">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            {authData.subject || "Academic Faculty"}
          </p>
          
          {/* Mobile-only Role Badge */}
          <span className="sm:hidden inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-black text-blue-700 ring-1 ring-blue-700/10 uppercase">
            {authData.role}
          </span>
        </div>
      </div>
    </div>

  </div>
);
}

export default UserInfo;