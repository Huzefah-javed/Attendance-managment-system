import React, { useState } from 'react';
import { getClassesData, getClassesDetailData } from '../../../apis/departmentHead_api';
import dataRender from '../../hooks/DataRender';
import Loader from '../../components/Loader';
import { useFetchData } from '../../hooks/data_fetch';

export const ManageClasses = () => {
    
    const data = dataRender(getClassesData, [])
    const classData = useFetchData(getClassesDetailData)
  const [selectedClass, setSelectedClass] = useState(null);
  
if (data.loading || classData.loading) {
    return <Loader/>
  }
  
  if(data.err || classData.error){
    console.log(data.err || classData.error)
  }
  

  const handleSelect = async(cls) => {
    setSelectedClass(cls);
    await classData.gettingData(cls.class_id)
  };
  
 return (
    // Fixed: h-screen on desktop, auto on mobile to allow scrolling
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* ================= LEFT SIDE: CLASS SELECTOR (Responsive Width) ================= */}
      {/* hidden on small mobile if you want, or just full width */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20">
        <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
          <div>
            <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">Classes</h2>
          </div>
          <div className="h-7 w-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-[10px] font-black">
            04
          </div>
        </div>
        
        {/* Horizontal scroll on mobile, Vertical on desktop */}
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto custom-scrollbar bg-white">

          {data?.data?.classes?.map((item) => (
           <div
  onClick={() => { handleSelect(item) }}
  key={item.class_id}
  className={`
    min-w-[200px] md:min-w-full p-4 md:p-6 cursor-pointer transition-all duration-200
    /* Base Styles */
    border-b md:border-b-slate-50 border-r-4 
    /* Conditional Selection Logic */
    ${selectedClass?.class_id === item.class_id 
      ? "bg-blue-50/80 border-blue-600 shadow-[inset_0_0_15px_rgba(59,130,246,0.05)]" 
      : "bg-white border-transparent hover:bg-slate-50"
    }
  `}
>
  <p className={`
    text-xs md:text-sm font-black uppercase truncate transition-colors
    ${selectedClass?.class_id === item.class_id ? "text-blue-700 italic" : "text-slate-700"}
  `}>
    {item.class_name}
  </p>
  
  <div className="flex items-center gap-2 mt-1">
    {selectedClass?.class_id === item.class_id && (
      <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
    )}
    <p className={`
      text-[9px] font-bold tracking-widest transition-colors
      ${selectedClass?.class_id === item.class_id ? "text-blue-400" : "text-slate-400"}
    `}>
      ID: {item.class_id}
    </p>
  </div>
</div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
        
        <div className="p-4 md:p-8 bg-white/80 backdrop-blur-md border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center sticky top-0 z-10">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Manage Subjects</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"></p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
             <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-500 text-[9px] font-black rounded-xl uppercase tracking-widest">Discard</button>
             <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 text-white text-[9px] font-black rounded-xl shadow-lg uppercase tracking-widest">Save</button>
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-6">
          
          <div className="bg-white rounded-[2rem] p-5 md:p-8 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Subject Name</label>
                <input type="text" className="w-full bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 font-bold text-slate-800 text-sm md:text-base italic focus:outline-none" defaultValue="Introduction to Web Development" />
              </div>

              <div className="p-5 bg-emerald-50/30 border border-emerald-100 rounded-2xl">
                <label className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-2">Assigned Teacher</label>
                <div className="flex items-center justify-between gap-2">
                   <div className="min-w-0">
                      <p className="text-xs md:text-sm font-black text-slate-800 truncate">Miss Ayesha</p>
                      <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">ayesha@university.edu</p>
                   </div>
                   <button className="text-[9px] font-black text-blue-600 uppercase flex-shrink-0">Change</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-5 md:p-8 border border-slate-200 border-l-4 border-l-amber-400 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Subject Name</label>
                <input type="text" className="w-full bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 font-bold text-slate-800 text-sm italic focus:outline-none" defaultValue="Web Styling (CSS)" />
              </div>

              <div className="p-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                <p className="text-[9px] font-black text-amber-600 uppercase mb-2">! Faculty Required</p>
                <button className="w-full py-2 bg-blue-600 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">
                  Browse Teachers
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};