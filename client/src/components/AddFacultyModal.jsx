import React, { useState } from 'react';
import { useFetchData } from '../hooks/data_fetch';
import { registeringTeacher } from '../../apis/departmentHead_api';

const AddFacultyModal = ({ onClose }) => {
   const teacherRegister = useFetchData(registeringTeacher)
  const [faculty, setFaculty] = useState({
    name: '',
    email: '',
    password: '',
  });


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (faculty.name && faculty.email && faculty.password) {
     await teacherRegister.gettingData([faculty.name, faculty.email, faculty.password])
    }
        onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-10 border-b border-slate-50 flex justify-between items-start bg-white">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">Onboard Faculty</h2>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em] mt-1">New Instructor Profile</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 rounded-full bg-slate-50 text-slate-300 hover:text-red-500 transition-all text-2xl font-light">&times;</button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Sir Huzefa"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                onChange={(e) => setFaculty({...faculty, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Access Password</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                onChange={(e) => setFaculty({...faculty, password: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Official Email</label>
            <input 
              required
              type="email" 
              placeholder="faculty@university.edu"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              onChange={(e) => setFaculty({...faculty, email: e.target.value})}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-col gap-3">
            <button 
              type="submit"
              className="w-full py-5 bg-slate-900 text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.3em] shadow-xl hover:bg-blue-600 active:scale-95 transition-all"
            >
              Create Faculty Profile
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-2 text-slate-300 hover:text-slate-500 text-[9px] font-black uppercase tracking-widest transition-all"
            >
              Cancel & Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacultyModal;