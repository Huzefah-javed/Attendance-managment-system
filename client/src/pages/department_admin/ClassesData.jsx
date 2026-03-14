import { useEffect } from "react";
import { getClassesData } from "../../../apis/departmentHead_api";
import Loader from "../../components/Loader";
import { useFetchData } from "../../hooks/data_fetch";
import dataRender from "../../hooks/DataRender";

export function ClassesData(){
const data = dataRender(getClassesData, [])

  if (data.loading) {
    return <Loader/>
  }
  
  if(data.err){
    console.log(data.err)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Department Header */}
      <header className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800 capitalize">
         Department: {data?.data?.department_name}
        </h1>
        <p className="text-slate-500 mt-1">Select a class to manage attendance</p>
      </header>
         <h1 className="text-2xl font-extrabold text-slate-700 capitalize mb-2">
         Active classes
        </h1>
      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.data?.classes?.map((cls) => (
          <div 
            key={cls.class_id} 
            className="group relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-400 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  {/* <BookOpen className="w-6 h-6 text-blue-600" /> */}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 capitalize leading-tight">
                    {cls.class_name}
                  </h3>
                  <div className="flex items-center mt-2 text-sm text-slate-500">
                    {/* <Clock className="w-4 h-4 mr-1" /> */}
                    <span>ID: {cls.class_id}</span>
                  </div>
                </div>
              </div>
              {/* <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" /> */}
            </div>

            {/* Hidden Badge for Hover Effect */}
            <div className="mt-4 flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Guard */}
      {data?.data?.classes?.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500">No classes found for this department.</p>
        </div>
      )}
    </div>
  );
}