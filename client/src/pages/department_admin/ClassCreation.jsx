import React, { useState } from 'react';

const CreateClass = () => {
  const [className, setClassName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!className.trim()) return;

    setIsSubmitting(true);
    try {
      // Your API logic here
      console.log("Posting class:", className);
      // await axios.post('/api/classes', { class_name: className });
      alert("Class Created Successfully!");
      setClassName('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Background Decorative Circles - To fill the empty space */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative w-full max-w-xl">
        {/* Main Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
          
          {/* Header Section */}
          <div className="p-10 pb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-200">
              <span className="text-white text-3xl font-bold">+</span>
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
              Create New Class
            </h1>
            <p className="text-slate-500 font-medium max-w-xs mx-auto">
              Setup a new academic cohort for the attendance management system.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-10 pt-0 space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Class Title
              </label>
              <input 
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="e.g. BSSE 4th Semester (Morning)"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-800 font-bold placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>

            {/* Visual Preview (Fills space & helps the user) */}
            <div className="p-4 bg-blue-50/50 rounded-2xl border border-dashed border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs italic">
                  Preview
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Live Name Preview</p>
                  <p className="text-sm font-bold text-blue-900 truncate">
                    {className || "Class name will appear here..."}
                  </p>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || !className.trim()}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-[0.98] ${
                isSubmitting || !className.trim()
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-slate-900 text-white hover:bg-black shadow-slate-200'
              }`}
            >
              {isSubmitting ? "Generating..." : "Establish Class"}
            </button>
          </form>

          {/* Tips Footer */}
          <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-medium italic">
              Tip: Use a unique name to distinguish between morning and evening sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClass;