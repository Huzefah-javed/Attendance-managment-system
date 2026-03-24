import React, { useState } from 'react';
import dataRender from '../../hooks/DataRender';
import { getFacultyDetail } from '../../../apis/departmentHead_api';
import Loader from '../../components/Loader';
import AddFacultyModal from '../../components/AddFacultyModal';

export const FacultyManagement = () => {
  // --- DUMMY DATA: Only Name, Email, and their specific subjects ---
  const facultyStaff = dataRender(getFacultyDetail, [])
    const [options, setOptions] = useState(false)
    if (facultyStaff.loading) {
        return <Loader/>
      }
      
      if(facultyStaff.err){
        console.log(facultyStaff.err)
      }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      
      {/* --- HEADER --- */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Faculty Hub</h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">Independent Instructor Portfolio</p>
        <div className="h-1 w-12 bg-blue-600 mt-4 rounded-full" />
      </div>

      {/* --- FACULTY GRID --- */}
      <div 
        onClick={()=>setOptions(true)}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-slate-200 hover:border-blue-200 hover:text-blue-400 transition-all cursor-pointer bg-slate-50/30">
          <span className="text-5xl font-light mb-2">+</span>
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">New Instructor</p>
        </div>
        {facultyStaff?.data?.map((staff) => (
          <div key={staff._id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-300">
            
            {/* Identity Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-black italic shadow-lg flex-shrink-0">
                {staff.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-black text-slate-800 leading-tight truncate uppercase">{staff.name}</h3>
                <p className="text-[10px] font-bold text-blue-500 truncate">{staff.email}</p>
              </div>
            </div>

            {/* Subjects List */}
            <div className="space-y-3 flex-grow">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Teaching Domains</span>
                  <div className="h-px flex-grow mx-4 bg-slate-50" />
               </div>

               <div className="flex flex-col gap-2">
                 {staff.subjects.map((subject) => (
                   <div key={subject._id} className="px-4 py-3 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all group">
                     <p className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                        {subject}
                     </p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Simple Footer Action */}
            <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end">
               <button className="text-[10px] font-black text-slate-300 hover:text-red-500 uppercase tracking-widest transition-colors">
                 Remove Faculty
               </button>
            </div>
          </div>
        ))}

      </div>
      {
        options && 
            <AddFacultyModal
            onClose={()=>setOptions(false)}
            />
      }
    </div>
  );
};