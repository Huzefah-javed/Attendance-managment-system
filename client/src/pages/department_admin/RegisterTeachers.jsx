import React, { useState } from 'react';
import { useFetchData } from '../../hooks/data_fetch';
import { registeringTeacher } from '../../../apis/departmentHead_api';
import Loader from '../../components/Loader';

export const RegisterTeacher = () => {
   const data =  useFetchData(registeringTeacher)
 const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });


if (data.loading) {
    return <Loader />;
  }

  if (data.err) {
    console.log(data.err);
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-black uppercase tracking-widest">Error happened</p>
      </div>
    );
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    data.gettingData([formData.name, formData.email, formData.password])
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter">
          Departmental Faculty Registration
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">
          Onboard new educators to the central database
        </p>
        <div className="h-1.5 w-16 bg-emerald-500 mt-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        
        {/* --- LEFT: REGISTRATION FORM (3/5 columns) --- */}
        <div className="lg:col-span-3 bg-white rounded-[3rem] p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/40">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Dr. Arslan Ahmad"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Official Email</label>
              <input 
                type="email" 
                placeholder="faculty@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:border-emerald-500 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Access Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:border-emerald-500 outline-none transition-all"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-slate-900 text-white text-xs font-black rounded-2xl uppercase tracking-[0.3em] shadow-xl hover:bg-emerald-600 active:scale-95 transition-all mt-4"
            >
              Add Faculty Member
            </button>
          </form>
        </div>

        {/* --- RIGHT: INFO/HINT CARD (2/5 columns) --- */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem]">
            <h4 className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-3">Quick Note</h4>
            <p className="text-xs text-emerald-600/80 leading-relaxed font-medium">
              Teachers registered here are "Global Faculty." You can assign them to specific subjects within any class from the **Manage Classes** console later.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Security Protocol</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[11px] font-bold text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5" />
                Use university domains only.
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5" />
                Password must be 8+ chars.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};