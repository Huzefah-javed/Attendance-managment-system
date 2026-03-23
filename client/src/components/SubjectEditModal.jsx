import { useState } from "react";
import { changeTeacherForClassSubj, getTeacherData } from "../../apis/departmentHead_api";
import { useFetchData } from "../hooks/data_fetch";
import dataRender from "../hooks/DataRender";
import Loader from "./Loader";

export const SubjectEditModal = ({ onClose, subjectData, classId }) => {
const teacherInfo =  dataRender(getTeacherData, [subjectData.subject_name])
const changeTeacher =  useFetchData(changeTeacherForClassSubj)
const [selectedTeacher, setSelectedTeacher] = useState(null)


if (teacherInfo.loading || changeTeacher.loading) {
    return <Loader/>
  }
  
  if(teacherInfo.err || changeTeacher.error){
    console.log(teacherInfo.err || changeTeacher.error)
  }

const handleChangeTeacher=async()=>{
  console.log(selectedTeacher, classId, subjectData.subject_id)
   await changeTeacher.gettingData([selectedTeacher, classId, subjectData.subject_id])
}

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
  {/* Glass Backdrop */}
  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

  {/* Modal Content */}
  <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
    
    {/* Header */}
    <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
      <h2 className="text-xl font-black text-slate-800 tracking-tight">
        {subjectData ? 'Subject Settings' : 'New Subject Entry'}
      </h2>
      <button onClick={onClose} className="text-slate-400 hover:text-red-500 text-2xl font-bold transition-colors">
        &times;
      </button>
    </div>

    <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
      
      {/* --- SECTION 1: SUBJECT INFO (Display Only) --- */}
      <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
        <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1 block mb-2">Selected Subject</label>
        <p className="text-lg font-black text-slate-800 italic">
          {subjectData?.subject_name || "New Subject"}
        </p>
      </div>

      {/* --- SECTION 2: TEACHER ASSIGNMENT (Editable) --- */}
      <div className="space-y-4 p-5 bg-slate-50/50 rounded-3xl border border-slate-100">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Modify Assignment</label>
        
        {/* Current Teacher Status */}
        <div className="flex items-center justify-between px-2 py-3 bg-white rounded-2xl border border-slate-100 mb-2">
          <div className="min-w-0">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Current Instructor</p>
            <p className="text-sm font-black text-slate-800 truncate">
              {subjectData?.teacher?.name || "No Teacher Linked"}
            </p>
          </div>
          <div className={`h-3 w-3 rounded-full shadow-sm ${subjectData?.teacher?.name ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        </div>

        {/* Teacher Picker Dropdown */}
        <div className="relative">
          <select
            // Using the logic we discussed: fetch on click, update on change
            onClick={() => {
                if (!teacherInfo?.data || teacherInfo.data.length === 0) {
                    handleAvailableTeacher(subjectData?.subject_name);
                }
            }}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="w-full px-5 py-4 bg-white border-2 border-blue-100 rounded-2xl font-black text-blue-600 text-xs uppercase tracking-widest appearance-none cursor-pointer hover:bg-blue-50 transition-all outline-none"
          >
            <option value="">
                {teacherInfo?.data?.length === 0 ? 'No faculty found' : 'Select New Faculty'}
            </option>
            {teacherInfo?.data?.map((teacher) => (
              <option key={teacher.teacher_id} value={teacher.teacher_id}>
                {teacher.name} ({teacher.subject})
              </option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400 font-bold">↓</div>
        </div>

        {/* Dedicated Save Button for Teacher */}
        <button 
          onClick={handleChangeTeacher}
          className="w-full py-4 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-black active:scale-95 transition-all"
        >
          Update Assigned Teacher
        </button>
      </div>
    </div>

    {/* Footer Action: Final Exit */}
    <div className="p-6 bg-white border-t border-slate-100">
      <button 
        onClick={onClose} 
        className="w-full py-4 bg-slate-100 text-slate-500 hover:text-slate-700 hover:bg-slate-200 text-xs font-black rounded-2xl uppercase tracking-[0.2em] transition-all"
      >
        Done & Close
      </button>
    </div>
  </div>
</div>
  );
};