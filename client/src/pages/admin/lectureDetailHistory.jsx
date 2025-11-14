import { useEffect, useRef, useState } from "react";
import { sessionHistory } from "../../../apis/teacher_api";
import Card from "../../components/Card";
import { usePostData } from "../../hooks/data_post";

export default function LectureDetailHistory(){

const [sessionsHistoryData, setSessionHistoryData] = useState([])
const {gettingData, loading, error, msg} = usePostData(sessionHistory)

const sessionsRef = useRef(null);

 async function ufc(){
  let skip = 0
  if(sessionsRef.current.scrollTop + sessionsRef.current.clientHeight >= sessionsRef.current.scrollHeight){
    skip++;
    console.log(skip)
    await gettingData(skip)
    msg.map((singleSession)=>{
      setSessionHistoryData((prev)=>([...prev, singleSession]))

    })
    }
  }

// console.log(sessionsRef.current.scrollTop , sessionsRef.current.offsetHeight, sessionsRef.current.getBoundingClientRect())

useEffect(()=>{
      if(sessionsHistoryData.length === 0){
        const loadData = async()=>{
          console.log("calling ....")
          await gettingData(0)
          setSessionHistoryData(msg)
        }
        loadData()
    }
    if (sessionsRef.current) {
    sessionsRef.current.removeEventListener("scroll", ufc)
    sessionsRef.current.addEventListener('scroll',ufc)
  }
},[sessionsRef.current])

if (loading) {
  return <h1>Loading....</h1>
}
  
if(error){
  console.log(error)
}


console.log("that is ",sessionsHistoryData)

return (
    <>
     <div className="w-full flex h-full">
        <div className="flex-3 p-6">
        <header className="w-full flex justify-between py-4 h-[10%]">
            <h1 className="text-2xl sm:text-2xl  font-bold tracking-tight text-gray-900 flex items-center">Subject <span className="text-[1rem]  px-3 text-gray-600"> programming</span></h1>
            <h1 className="text-2xl sm:text-2xl  font-bold tracking-tight text-gray-900 flex items-center">Lecture Date <span className="text-[1rem] px-3 text-gray-600"> 12/12/12</span></h1>
        </header>

            <section className=" h-[90%] py-4 grid grid-cols-3 grid-rows-2 gap-8">
             <Card title="Total Students" value="152" />

       <Card title="Active Sessions" value="12"/>
      <Card title="Attendance Rate" value="89%" />
      <Card title="Teachers" value="10" className="col-start-1 col-end-3" />
      <Card title="Teachers" value="10" />

            </section>

        </div>

    <div className="p-6 min-h-[25%] max-h-svh bg-[#f1f1f1] overflow-y-scroll" ref={sessionsRef}>
      <table className="w-full bg-white rounded-lg shadow-md border border-gray-200">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-1 text-left text-[0.75rem] font-semibold text-gray-700 ">Id</th>
                <th className="px-4 py-1 text-left text-[0.75rem] font-semibold text-gray-700">Date</th>
                <th className="px-4 py-1 text-left text-[0.75rem] font-semibold text-gray-700">Subject</th>
                <th className="px-4 py-1 text-center text-[0.75rem] font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {/* {typeof(fetch.msg) != "string" && fetch.msg.map((student) => ( */}

                  {sessionsHistoryData && sessionsHistoryData?.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors gap-3">
                  <td className="px-3 py-2 text-gray-600">{student.SESSION_ID}</td>
                  <td className="px-3 py-2 text-gray-600">{new Date(student.SESSION_DATE).toLocaleDateString('en-GB')}</td>
                  <td className="px-3 py-2 text-gray-600">{student.SUBJECT}</td>
             
                  <td className="px-4 py-1">
                    <div className="flex gap-1 justify-center">
                      <button 
                      className="px-2 py-2 bg-green-500 hover:bg-green-600 text-white text-[0.75rem] font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        view
                      </button>
                      
                    
                    </div>
                  </td>
                </tr>
                     )) }
              <tr  className="hover:bg-gray-50 transition-colors gap-3">
                  <td className="px-3 py-2 text-gray-600">76</td>
                  <td className="px-3 py-2 text-gray-600">{new Date().toLocaleDateString('en-GB')}</td>
                  <td className="px-3 py-2 text-gray-600">DLD</td>
             
                  <td className="px-4 py-1">
                    <div className="flex gap-1 justify-center">
                      <button 
                      className="px-2 py-2 bg-green-500 hover:bg-green-600 text-white text-[0.75rem] font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        view
                      </button>
                      
                    
                    </div>
                  </td>
                </tr>
              <tr  className="hover:bg-gray-50 transition-colors gap-3">
                  <td className="px-3 py-2 text-gray-600">76</td>
                  <td className="px-3 py-2 text-gray-600">{new Date().toLocaleDateString('en-GB')}</td>
                  <td className="px-3 py-2 text-gray-600">DLD</td>
             
                  <td className="px-4 py-1">
                    <div className="flex gap-1 justify-center">
                      <button 
                      className="px-2 py-2 bg-green-500 hover:bg-green-600 text-white text-[0.75rem] font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        view
                      </button>
                      
                    
                    </div>
                  </td>
                </tr>
              <tr  className="hover:bg-gray-50 transition-colors gap-3">
                  <td className="px-3 py-2 text-gray-600">76</td>
                  <td className="px-3 py-2 text-gray-600">{new Date().toLocaleDateString('en-GB')}</td>
                  <td className="px-3 py-2 text-gray-600">DLD</td>
             
                  <td className="px-4 py-1">
                    <div className="flex gap-1 justify-center">
                      <button 
                      className="px-2 py-2 bg-green-500 hover:bg-green-600 text-white text-[0.75rem] font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        view
                      </button>
                      
                    
                    </div>
                  </td>
                </tr>
            </tbody>
                        </table>
    </div>
 </div>
 </>
)


}