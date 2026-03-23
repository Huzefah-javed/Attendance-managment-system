import { useState } from 'react';
import { useFetchData } from '../hooks/data_fetch';
import { registeringStudent } from '../../apis/departmentHead_api';
import Loader from './Loader';

const StudentRegistrationModal = ({ onClose, classData}) => {

const data = useFetchData(registeringStudent)
const [studentDetail, setStudentDetail] = useState({
    name:"",
    rollNumber:"",
    email:"",
    password:""
})


  if (data.loading) {
      return <Loader/>
    }
    
    if(data.error){
      console.log(data.error)
    }

const handleFormSubmit=async(e)=>{
    e.preventDefault();
   await data.gettingData([studentDetail.name, studentDetail.rollNumber, studentDetail.email, studentDetail.password, classData.class_id])
   onClose()
}

console.log(studentDetail, classData)
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glass Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Enroll Student</h2>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-1">
              Class: {classData.class_name || "Not Selected"}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all text-2xl font-light"
          >
            &times;
          </button>
        </div>

        {/* Registration Form */}
        <form className="p-8 space-y-5" onSubmit={(e) => handleFormSubmit(e)}>
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
            <input 
              type="text" 
              onChange={(e)=>(setStudentDetail((prev)=>({...prev, name:e.target.value})))}
              placeholder="e.g. Muhammad Huzefa"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Roll Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Roll Number</label>
              <input 
                type="text" 
                onChange={(e)=>(setStudentDetail((prev)=>({...prev, rollNumber:e.target.value})))}
                placeholder="e.g. F22-BSSE-001"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
              <input 
                type="email" 
                onChange={(e)=>(setStudentDetail((prev)=>({...prev, email:e.target.value})))}
                placeholder="name@university.edu"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Student Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              onChange={(e)=>(setStudentDetail((prev)=>({...prev, password:e.target.value})))}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:border-blue-500 outline-none transition-all"
              required
            />
            <p className="text-[9px] text-slate-400 font-medium italic ml-2">Default password for initial login</p>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-col gap-3">
            <button 
              type="submit"
              className="w-full py-5 bg-slate-900 text-white text-xs font-black rounded-2xl uppercase tracking-[0.25em] shadow-xl hover:bg-blue-600 active:scale-95 transition-all"
            >
              Complete Registration
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-3 text-slate-400 hover:text-slate-600 text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Discard Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationModal;