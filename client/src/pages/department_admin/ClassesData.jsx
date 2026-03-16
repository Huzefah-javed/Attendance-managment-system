import { useEffect } from "react";
import { getClassesData } from "../../../apis/departmentHead_api";
import Loader from "../../components/Loader";
import { useFetchData } from "../../hooks/data_fetch";
import dataRender from "../../hooks/DataRender";
import { useState } from "react";
import ClassDetailModal from "../../components/ClassDetailModel";

export function ClassesData(){
const data = dataRender(getClassesData, [])
const [selectedClass, setSelectedClass] = useState(null);
  if (data.loading) {
    return <Loader/>
  }
  
  if(data.err){
    console.log(data.err)
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800 capitalize">
          Department: {data?.data?.department_name}
        </h1>
        <p className="text-slate-500 mt-1">All the classes in this department</p>
      </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 2. THE EXISTING CLASSES (Mapped from API) */}
        {data?.data?.classes?.map((cls) => (
          <div 
            key={cls.class_id} 
            className="group relative bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400">
               ID: {cls.class_id}
              </div>
              <span className="text-[10px] font-black bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase">
                Active
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
              {cls.class_name}
            </h3>
            
            <button 
              onClick={() => setSelectedClass(cls)}
              className="mt-6 w-full py-3 bg-slate-900 hover:bg-black text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-[0.2em] active:scale-95"
            >
              View Class Info
            </button>
          </div>
        ))}
      </div>

      {selectedClass && (
        <ClassDetailModal 
          onClose={() => setSelectedClass(null)} 
          classData={selectedClass} 
        />
      )}
    </div>
  );
}