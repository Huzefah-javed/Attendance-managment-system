import { useEffect, useRef, useState } from "react";
import { sessionHistory, sessionHistoryDetails } from "../../../apis/teacher_api";
import Card from "../../components/Card";
import { usePostData } from "../../hooks/data_post";
import { useCallback } from "react";
import { DonutChartComponent } from "../../components/donutChart";

export default function LectureDetailHistory(){

const [selectedSessionId, setSelectedSessionId]= useState(-1)
const [page, setPage]= useState(0)
const sessions = usePostData(sessionHistory)
const sessionDetails = usePostData(sessionHistoryDetails)

const sessionsRef = useRef(null);

  
useEffect(()=>{

      if(!sessions.msg){
        const loadData = async()=>{
          await sessions.gettingData(0)
        }
        loadData()
    }

  },[sessionsRef.current])
  
  if (sessions.loading || sessionDetails.loading) {
    return <h1>Loading....</h1>
  }
  
  if(sessions.error || sessionDetails.error){
    console.log(sessions.error || sessionDetails.error)
  }
  
  
  async function handleFetchSession(sessionId){

    await sessionDetails.gettingData(sessionId)
    setSelectedSessionId(sessionId)
  }
  
 async function handleFetch(cmd){
  let chosenPage ;
    if (cmd === "inc") {
      chosenPage = page +1
    }else {
      chosenPage = page -1
    }
    await sessions.gettingData(chosenPage)
    setPage(chosenPage)
  }
  
return (
    <>
     <div className="w-full max-h-screen flex items-start">
        <div className="flex-3 p-3">

            <section className=" grid grid-cols-3  gap-4">
        <Card title="Total Students" value={sessionDetails?.msg?.total_students} />
       <Card title="Present Students" value={sessionDetails?.msg?.present_students}/>
      <Card title="Absent students" value={sessionDetails?.msg?.absent_students} />
      <Card title="Students Detail" 
      value={
            ( 
              //  <div className="hidden w-full md:block overflow-x-auto">
          <table className="w-full flex flex-col justify-between bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Roll Number</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessionDetails.msg && sessionDetails.msg.student_data.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
              
                      <span className="font-semibold text-gray-900 text-[0.75rem]">{student.STUDENT_NAME}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{student.STUDENT_ROLLNO}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2 justify-center">
                       <span className={`inline-flex items-center rounded-full  px-2 py-1 text-xs sm:text-sm font-medium ${student.status === "absent"?'bg-red-100 text-red-700 ring-1 ring-red-300': 'bg-green-100 text-green-700 ring-1 ring-green-300'} w-fit`}>
        {student.status === "absent"? "Absent": "Present"}
      </span>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
      // /  </div>
      )
      }
       className="col-start-1 col-end-3 h-80  flex justify-center items-start overflow-scroll"/>
      <DonutChartComponent  
            val1={["Present students", "Absent students"]}
            val2={[sessionDetails?.msg?.present_students, sessionDetails?.msg?.absent_students]}
             Bgs={[
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 99, 132, 0.5)'  
                ]} 
                brs={[
                   'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)'
                ]}
                className=" h-80" />

            </section>

        </div>

    <div className="p-3  overflow-y-scroll" ref={sessionsRef}>
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
              
                  {sessions.msg && sessions.msg?.map((student) => (
                  <tr key={student.SESSION_ID} className={`${student.SESSION_ID === selectedSessionId? "bg-[#2563EB] text-white": "hover:bg-gray-50 "} transition-colors  gap-3`}>
                  <td className={`px-3 py-2 text-[0.75rem] ${student.SESSION_ID === selectedSessionId? "text-white": "text-gray-600"}`}>{student.SESSION_ID}</td>
                  <td className={`px-3 py-2 text-[0.75rem] ${student.SESSION_ID === selectedSessionId? "text-white": "text-gray-600"}`}>{new Date(student.SESSION_DATE).toLocaleDateString('en-GB')}</td>
                  <td className={`px-3 py-2 text-[0.75rem] ${student.SESSION_ID === selectedSessionId? "text-white": "text-gray-600"}`}>{student.SUBJECT}</td>
             
                  <td className="px-4 py-1 text-[0.75rem]">
                    <div className="flex gap-1 justify-center">
                     {student.SESSION_ID === selectedSessionId?
                        "":(<button 
                      onClick={()=>handleFetchSession(student.SESSION_ID)}
                      className="px-2 py-2 text-[0.75rem] bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        view
                      </button>)
                      }
                    </div>
                  </td>
                </tr>
                     )) }
            </tbody>
                        </table>
<div className="flex justify-center items-center space-x-1 p-4">
    
    <button 
    onClick={()=>handleFetch("dec")}
    disabled={page<=0}
    className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600 rounded-full 
                   hover:bg-gray-200 transition duration-150 dark:text-gray-400 dark:hover:bg-gray-700"
    >
        &lt;
    </button>
    
    <button 
        className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-white bg-indigo-500 rounded-full 
        shadow-md transition duration-150 hover:bg-indigo-600"
        >
        {page+1}
    </button>

    <button 
        onClick={()=>handleFetch("inc")}
        className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600 rounded-full 
        hover:bg-gray-200 transition duration-150 dark:text-gray-400 dark:hover:bg-gray-700"
        >
        {page+ 2}
    </button>

    {/* Next Button */}
    <button 
      onClick={()=>handleFetch("inc")}
      disabled={sessions?.msg?.length !== 10}
        className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600 rounded-full 
                   hover:bg-gray-200 transition duration-150 dark:text-gray-400 dark:hover:bg-gray-700"
    >
        &gt;
    </button>

</div>
    </div>
 </div>
 </>
)


}