import { useState } from "react";
import { subjectCreation } from "../../apis/departmentHead_api";
import { useFetchData } from "../hooks/data_fetch";

export const AddSubjectModal = ({ onClose, classId}) => {

 const createSubject =  useFetchData(subjectCreation)
const [subName, setSubName] = useState("")


const handleAddSubject=async()=>{
  if (subName) { 
   await createSubject.gettingData([classId, subName])
    setSubName("")
  }
}

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glass Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Add New Subject</h2>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">Expansion Mode</p>
          </div>
          <button 
            onClick={onClose} 
            className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all text-2xl font-light"
          >
            &times;
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Input: Subject Name Only */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 block">
              New Subject Title
            </label>
            <div className="relative">
               <input 
                type="text" 
                onChange={(e)=>{setSubName(e.target.value)}}
                placeholder="e.g. Theory of Automata"
                className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-800 text-lg placeholder:text-slate-300 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner"
                autoFocus
              />
              {/* Decorative Icon */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>
              </div>
            </div>
            <p className="text-[9px] text-slate-400 font-medium px-1 italic">
              Note: Faculty can be assigned later from the subject settings.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-3">
          <button 
            onClick={handleAddSubject}
            className="w-full py-5 bg-blue-600 text-white text-xs font-black rounded-2xl uppercase tracking-[0.2em] shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
          >
            Create Subject Module
          </button>
          
          <button 
            onClick={onClose} 
            className="w-full py-4 text-slate-400 hover:text-slate-600 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Cancel & Go Back
          </button>
        </div>
      </div>
    </div>
  );
};