import React, { useState } from 'react';
import { getClassesData, getClassesDetailData } from '../../../apis/departmentHead_api';
import dataRender from '../../hooks/DataRender';
import Loader from '../../components/Loader';
import { useFetchData } from '../../hooks/data_fetch';
import { SubjectEditModal } from '../../components/SubjectEditModal';
import { AddSubjectModal } from '../../components/AddSubjectModal';

export const ManageClasses = () => {
    
    const data = dataRender(getClassesData, [])
    const classData = useFetchData(getClassesDetailData)
  const [selectedClass, setSelectedClass] = useState(null);
  const [options, setOptions] = useState({
    editSubject:null,
    addNewSub:null
  });
  
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

  <div
  onClick={() => {/* Trigger Create Class Modal */}}
  className="
    min-w-[200px] md:min-w-full p-6 cursor-pointer transition-all
    /* Dashed border to signal 'empty slot' */
    border-2 border-dashed border-slate-200 
    /* Light blue tint */
    bg-blue-50/30 hover:bg-blue-100 hover:border-blue-400
    flex items-center justify-center
    rounded-2xl md:rounded-none
  "
>
  <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">
    + Create New Class
  </span>
</div>

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
  {/* Sticky Header with Actions */}
  <div className="p-4 md:p-8 bg-white/80 backdrop-blur-md border-b border-slate-200 flex justify-between items-center sticky top-0 z-10">
    <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Management Console</h1>
    <div className="flex gap-2">
      <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl shadow-lg uppercase tracking-widest">
        Push Updates
      </button>
    </div>
  </div>

  <div className="p-4 md:p-8 space-y-10">
    {/* --- SECTION 1: CLASS IDENTITY --- */}
    <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm">
      <label className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 block">Class Identity</label>
      <div className="flex flex-col sm:flex-row gap-4">
        <input 
          type="text" 
          value={selectedClass?.class_name}
          placeholder="Enter Class Name"
          className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10" 
        />
        <button

         className="px-8 py-4 bg-blue-600 text-white text-xs font-black rounded-2xl hover:bg-blue-700 transition-all shadow-md uppercase tracking-widest">
          Rename Class
        </button>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Manage Subjects</h2>
        <span className="text-[10px] font-bold bg-slate-200 px-2 py-1 rounded-md">Total: {classData?.msg?.length}</span>
      </div>
          {
           classData?.msg?.map((sub)=>{
            return(

              <div 
              onClick={() => setOptions((prev)=>({...prev, editSubject:sub}))}
              className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-blue-400 cursor-pointer transition-all flex justify-between items-center"
              >
        <div>
          <p className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors uppercase italic">
            {sub?.subject_name}
          </p>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
            Teacher: <span className="text-slate-600">{sub?.teacher?.name}</span>
          </p>
        </div>
        <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
          <span className="text-xl">→</span>
        </div>
      </div>
)
})
}
      <button 
      onClick={() => {setOptions((prev)=>({...prev, addNewSub:true}))}}
      className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:border-blue-400 hover:text-blue-500 transition-all"
      >
        + Add Subject to this class
      </button>
    </div>
  </div>
  </div>
  
  {
    options.editSubject &&
    
    <SubjectEditModal
    onClose={() => {setOptions((prev)=>({...prev, editSubject:null}))}}
    subjectData={options.editSubject}
    classId={selectedClass.class_id}
/>}

  {
    options.addNewSub &&
    
    <AddSubjectModal
    onClose={() => {setOptions((prev)=>({...prev, addNewSub:false}))}}
    classId={selectedClass.class_id}
/>}
    </div>
  );
};