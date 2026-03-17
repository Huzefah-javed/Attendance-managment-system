export const SubjectEditModal = ({ onClose, subjectData }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glass Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            {subjectData ? 'Edit Subject' : 'New Subject Entry'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 text-2xl font-bold transition-colors">
            &times;
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Input: Subject Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Title</label>
            <input 
              type="text" 
              placeholder="e.g. Data Structures"
              defaultValue={subjectData?.subject_name || ""}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Teacher Assignment Section */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Faculty Assignment</label>
            
            {/* Status Indicator */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Current Instructor:</p>
                <p className="text-sm font-black text-slate-800">
                  {subjectData?.teacher?.name || "Not Assigned"}
                </p>
              </div>
              <div className={`h-2 w-2 rounded-full ${subjectData?.teacher?.name ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>

            {/* The Dropdown Button */}
            <div className="relative">
              <select className="w-full px-5 py-4 bg-white border-2 border-blue-100 rounded-2xl font-black text-blue-600 text-xs uppercase tracking-widest appearance-none cursor-pointer hover:bg-blue-50 transition-all outline-none">
                <option value="">Choose Available Teacher</option>
                <option value="1">Sir Arslan (Web Specialist)</option>
                <option value="2">Miss Ayesha (Logic & Styling)</option>
                {/* This will fetch from API in your logic */}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400 font-bold">
                ↓
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 text-[10px] font-black rounded-2xl uppercase tracking-widest">
            Cancel
          </button>
          <button className="flex-[2] py-4 bg-slate-900 text-white text-[10px] font-black rounded-2xl uppercase tracking-widest shadow-lg active:scale-95 transition-all">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};