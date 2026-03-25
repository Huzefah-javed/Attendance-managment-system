import { getAllDepartments } from "../../../apis/superAdmin"
import Loader from "../../components/Loader"
import dataRender from "../../hooks/DataRender"

export const InstitutionDepartments = ()=>{
const deptData = dataRender(getAllDepartments, [])

    if (deptData.loading) {
        return <Loader/>
      }
      
      if(deptData.err){
        console.log(deptData.err)
      }

      console.log(deptData.data)
      
      return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
      
      {/* --- ADMIN HEADER --- */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-800">
            Institute Control
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">
            Department Management System v1.0
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
              Active Units: {deptData?.data?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Mapping API Data */}
        {deptData?.data?.map((dept) => (
          <div 
            key={dept._id} 
            className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden h-64"
          >
            {/* Design Element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[3rem] -mr-6 -mt-6 group-hover:bg-blue-50 transition-colors" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xl italic">
                  D-{dept.department_id}
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
              </div>

              <h3 className="text-xl font-black text-slate-800 leading-tight uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                {dept.department_name}
              </h3>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">System Ref</p>
                <p className="text-[9px] font-bold text-slate-400 font-mono">{dept._id.slice(-8)}</p>
              </div>
              
              <button className="px-5 py-2.5 bg-slate-900 text-white text-[9px] font-black rounded-xl uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-90 shadow-lg">
                View Dept
              </button>
            </div>
          </div>
        ))}

        {/* --- ADD NEW SLOT --- */}
        <div className="border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-slate-200 hover:border-blue-200 hover:text-blue-500 hover:bg-white transition-all cursor-pointer group h-64">
          <div className="h-14 w-14 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors">
            <span className="text-3xl font-light">+</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">Add Department</p>
        </div>

      </div>
    </div>
  );
}