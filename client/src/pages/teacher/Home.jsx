import { Link } from "react-router-dom";
import { getClasses } from "../../../apis/teacher_api";
import Loader from "../../components/Loader";
import dataRender from "../../hooks/DataRender";

export function TeacherHome(){

    const assignedClass = dataRender(getClasses, [0])
      
      if (assignedClass.loading) {
        return <Loader/>
      }
      
      if(assignedClass.err){
          console.log(assignedClass.err)
      }
      
      console.log(assignedClass.data)

    return (
        <>

        <div className="p-4">
      <h1 
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
        Assigned Classes
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        All the assigned classes to you for attendance and lecture
      </p>
    </div>

     <section className="bg-white p-4 my-4 rounded-2xl flex-1/2">
                    <div className="py-4 flex flex-col gap-4">
     <header className="bg-gray-50 rounded-2xl border-b border-gray-200 w-full">
              <div className="flex md:justify-between justify-around">
                <span className="p-2 text-left text-[1rem] font-semibold text-gray-700 ">Class name</span>
                <span className="p-2 text-left text-[1rem] font-semibold text-gray-700">Subject</span>
                <span className="p-2 text-left hidden md:block text-[1rem] font-semibold text-gray-700">Action</span>
              </div>
            </header>
           {
               assignedClass.data && assignedClass?.data?.map((data)=>{
                    return(

                        <section id={data.class_id} className=" bg-[#f7f7f7] shadow-2xl p-4 flex flex-wrap md:flex-nowrap items-center justify-between p-2f18] rounded-2xl">
              <div className="flex gap-2">
               <div className="flex flex-col">
                  <span className="text-[1rem] font-bold ">{data.class_name.slice(0, 10)+"..."}</span>
               </div>
               </div>
                             
                             <div className="flex gap-2 items-center">
                <div className="text-[0.6rem] font-extrabold ">
                              {data.subject_name.slice(0, 10)+"..."+data.subject_name.slice(data.subject_name.length/2, data.subject_name.length)}
                </div>
               
                
              </div>
                 <Link
                 to={`${data.class_id}/${data.subject_id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 w-full md:w-fit mt-2 rounded-lg text-xs"
                  >
                  View
                </Link>
             
                             </section>
                )
            })
                            
                        } 
                        </div>
                        </section> 
                </>
)
} 