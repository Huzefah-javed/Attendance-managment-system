import { useState } from "react";
import { classCreation } from "../../apis/departmentHead_api";
import { useFetchData } from "../hooks/data_fetch";
import Loader from "./Loader";

export const CreateClassModal = ({ onClose, }) => {

 const createClass =  useFetchData(classCreation)
const [className, setClassName] = useState("")

  
  if (createClass.loading) {
      return <Loader/>
    }
    
    if(createClass.error){
      console.log(createClass.error)
    }

  const handleCreateClass=async()=>{
    if(className){
      await createClass.gettingData([className])
      setClassName("")
      onClose();
    }
  }

console.log(className)
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glass Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight tracking-widest">New Class</h2>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.2em] mt-1 italic">Setup Phase</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-300 hover:text-red-500 text-2xl font-light transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">
              Class Designation
            </label>
            <input 
              onChange={(e)=>{setClassName(e.target.value)}}
              type="text" 
              autoFocus
              placeholder="e.g. BSSE 5th Semester"
              className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-800 text-lg focus:border-blue-500 focus:bg-white outline-none transition-all"
            />
            <p className="text-[9px] text-slate-400 font-medium px-1 italic">
              Once created, you can add subjects and faculty to this class.
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-3">
          <button 
            onClick={handleCreateClass}
            className="w-full py-5 bg-slate-900 text-white text-[11px] font-black rounded-2xl uppercase tracking-[0.25em] shadow-lg hover:bg-black active:scale-95 transition-all"
          >
            Initialize Class
          </button>
          
          <button 
            onClick={onClose} 
            className="w-full py-2 text-slate-400 hover:text-slate-600 text-[9px] font-black uppercase tracking-widest transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};