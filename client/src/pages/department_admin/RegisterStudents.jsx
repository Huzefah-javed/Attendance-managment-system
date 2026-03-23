import { useState } from "react";
import { getClassesData } from "../../../apis/departmentHead_api";
import Loader from "../../components/Loader";
import dataRender from "../../hooks/DataRender";
import StudentRegistrationModal from "../../components/StudentRegisterModal";

export const RegisteringStudents = () => {
  const data = dataRender(getClassesData, []);
const [selectedClass, setSelectedClass] = useState(null)
  if (data.loading) {
    return <Loader />;
  }

  if (data.err) {
    console.log(data.err);
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-black uppercase tracking-widest">Error Loading Classes</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      {/* Top Heading Section */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tighter">
          Register Students to Particular Class
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">
          Select a cohort to begin enrollment phase
        </p>
        <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
      </div>

      {/* Classes List */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4">
        {data.data?.classes?.map((item, index) => (
          <div 
            key={item.class_id || index}
            className="group bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200"
          >
            {/* Class Info */}
            <div className="flex items-center gap-6 w-full md:w-auto mb-6 md:mb-0">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-black italic shadow-inner">
                {item.class_name?.charAt(0) || "C"}
              </div>
              
              <div className="min-w-0">
                <h3 className="text-lg font-black text-slate-800 uppercase italic truncate">
                  {item.class_name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">UID:</span>
                  <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">
                    {item.class_id}
                  </span>
                </div>
              </div>
            </div>

            {/* Registration Action Button */}
            <button 
              onClick={() => setSelectedClass(item)}
              className="w-full md:w-auto px-10 py-4 bg-slate-900 text-white text-[11px] font-black rounded-2xl uppercase tracking-[0.2em] shadow-lg shadow-slate-200 hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              <span>Add Student</span>
              <span className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                →
              </span>
            </button>
          </div>
        ))}

        {/* Empty State */}
        {data.msg?.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No Classes Found</p>
          </div>
        )}
      </div>
      { selectedClass && 
          <StudentRegistrationModal
            classData={selectedClass}
            onClose={()=>setSelectedClass(null)}
          />
      }
    </div>

  );
};