import React from 'react';
import dataRender from '../hooks/DataRender';
import { getClassesDetailData } from '../../apis/departmentHead_api';

const ClassDetailModal = ({ onClose, classData }) => {

const data = dataRender(getClassesDetailData, [classData.class_id])

    if (data.err) {
        console.log(data.err)
    }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 border border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Class Overview</h2>
            <p className="text-sm text-slate-500 font-medium">Detailed subject and faculty breakdown</p>
          </div>
          <button 
            onClick={onClose} 
            className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all font-bold text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8 max-h-[65vh] overflow-y-auto">
          
          {/* Main Title Section */}
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-1 block">
              Current Selection
            </label>
            <p className="text-xl font-bold text-blue-900 leading-tight">
              {classData?.class_name || "Loading Class..."}
            </p>
          </div>

          {/* Subjects & Faculty Section */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Course Catalog
              </label>
            </div>
            
            <div className="space-y-4">
              {data.loading ? (
                /* --- LOADING SKELETON STATE --- */
                [1, 2, 3].map((n) => (
                  <div key={n} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                      <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))
              ) : data?.data?.length > 0 ? (
                /* --- ACTUAL DATA STATE --- */
                data?.data?.map((sub, index) => (
                  <div 
                    key={index} 
                    className="group flex flex-col p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="mb-3">
                      <p className="text-sm font-bold text-slate-800 capitalize italic">
                        "{sub.subject_name}"
                      </p>
                    </div>

                    <div className="space-y-2 pl-1 border-l-2 border-slate-100 group-hover:border-blue-200 transition-colors">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-tighter">
                          Lecturer: <span className="text-slate-900 font-bold ml-1">{sub.teacher?.name || "Not Assigned"}</span>
                        </p>
                      </div>

                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-tighter">
                          Email: <span className="text-blue-600 ml-1 underline underline-offset-2 decoration-blue-200 cursor-pointer lowercase">
                            {sub.teacher?.email || "No email provided"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <p className="text-sm text-slate-400 font-medium italic">No subjects linked to this class.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-bold rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            Dismiss
          </button>
          <button 
            disabled={data.loading}
            className={`flex-[2] py-3 text-white text-sm font-bold rounded-xl transition-all shadow-lg active:scale-[0.98] ${
              data.loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-black shadow-slate-200'
            }`}
          >
            {data.loading ? 'Fetching...' : 'Manage Records'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailModal;