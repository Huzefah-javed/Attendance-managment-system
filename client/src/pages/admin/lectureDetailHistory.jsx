import { useEffect, useRef, useState } from "react";
import { sessionHistory, sessionHistoryDetails } from "../../../apis/teacher_api";
import Card from "../../components/Card";
import { useFetchData } from "../../hooks/data_fetch";
import { useCallback } from "react";
import { DonutChartComponent } from "../../components/donutChart";
import Loader from "../../components/Loader";
import dataRender from "../../hooks/DataRender";

export default function LectureDetailHistory(){

const [selectedSessionId, setSelectedSessionId]= useState(-1)
const [page, setPage]= useState(0)
const [showSessions, setShowSessions]= useState(true)
const sessions = dataRender(sessionHistory, [0])
const sessionDetails = useFetchData(sessionHistoryDetails)

const sessionsRef = useRef(null);

  
  if (sessions.loading || sessionDetails.loading) {
    return <Loader/>
  }
  
  if(sessions.err || sessionDetails.error){
    console.log(sessions.err || sessionDetails.error)
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
    await sessions.refetch([chosenPage])
    setPage(chosenPage)
  }

  function handleShowSessions(){
    setShowSessions(!showSessions)
  }

return (
    <>
       <div className="p-4">
      <h1 
      initial={{ opacity: 0, y: 50 }}   
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
        Attendance History
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        Check each and every session detailed history
      </p>
    </div>
     <div className="w-full max-h-screen flex items-start">
        <div className="flex-3 p-3">

           <section className=" grid md:grid-cols-3 grid-cols-2  gap-4">
        <Card 
            title="Total Students" 
            value={sessionDetails?.msg?.total_students}  
            className={'col-start-1 col-end-3 md:col-auto '}
            childClasses={'text-blue-500 md:text-4xl text-2xl'} 
            headerClasses={'md:text-sm text-xs'}/>
       <Card 
          title="Present Students" 
          value={sessionDetails?.msg?.present_students} 
          className={''}
          childClasses={'text-green-500 md:text-4xl text-2xl'} 
          headerClasses={'md:text-sm text-xs'}/>
      <Card 
          title="Absent students" 
          value={sessionDetails?.msg?.absent_students} 
          className={''}
          childClasses={'text-red-500 md:text-4xl text-2xl'} 
          headerClasses={'md:text-sm text-xs'}/>
    
               <div className="w-full  overflow-y-scroll p-4 col-start-1 col-end-3 md:row-start-2 row-start-5 md:row-end-4 row-end-7 min-h-72 max-h-72">
          <table className="w-full flex flex-col justify-between bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="grid grid-cols-3">
                <th className="md:px-6 md:py-4 px-3 py-2 text-left md:text-sm text-[0.6rem] font-semibold text-gray-700">Student</th>
                <th className="md:px-6 md:py-4 px-3 py-2 text-left md:text-sm text-[0.6rem] font-semibold text-gray-700">Roll Number</th>
                <th className="md:px-6 md:py-4 px-3 py-2 text-center md:text-sm text-[0.6rem] font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessionDetails.msg && sessionDetails.msg.student_data.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors grid grid-cols-3">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
              
                      <span className="font-semibold text-gray-900 md:text-[0.75rem] text-[0.5rem]">{student.STUDENT_NAME}</span>
                    </div>
                  </td>
                  <td className="md:px-3 px-2 md:py-2 py-1 md:text-sm text-[0.5rem] text-gray-600">{student.STUDENT_ROLLNO}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2 justify-center">
                       <span className={`inline-flex items-center rounded-full  md:px-3 px-2 md:py-2 py-1 text-[0.5rem] md:text-xs font-medium ${student.status === "absent"?'bg-red-100 text-red-700 ring-1 ring-red-300': 'bg-green-100 text-green-700 ring-1 ring-green-300'} w-fit`}>
        {student.status === "absent"? "Absent": "Present"}
      </span>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
     </div>
    
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
                title={{title: "Attendance graph", color: "#6a7282"}}
                className="md:row-auto row-start-3 row-end-5 md:col-auto col-start-1 col-end-3" />
                
            </section>

        </div>

                <button 
                    onClick={handleShowSessions}
                    className={`p-3 text-[0.75rem] z-20 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-colors duration-200 shadow-md hover:shadow-lg md:hidden block fixed ${showSessions?"top-2 left-2 h-10 w-10":"right-0 bottom-0"}`}>{showSessions?"X":"select session"}</button>

    <div className={`md:p-3 flex justify-center items-center flex-col md:block md:relative fixed ${showSessions? "top-0 left-0 bg-[#0000004f] w-full h-full": " top-full left-0 "} md:bg-transparent md:flex-1`} ref={sessionsRef}>
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
              
                  {sessions.data && sessions.data?.map((student) => (
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
    className="w-8 h-8 flex items-center justify-center text-sm font-medium bg-white text-gray-600 rounded-full 
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
        className="w-8 h-8 flex items-center justify-center text-sm font-medium bg-white text-gray-600 rounded-full 
        hover:bg-gray-200 transition duration-150 dark:text-gray-400 dark:hover:bg-gray-700"
        >
        {page+ 2}
    </button>

    {/* Next Button */}
    <button 
      onClick={()=>handleFetch("inc")}
      disabled={sessions?.data?.length !== 10}
        className="w-8 h-8 flex items-center justify-center text-sm font-medium bg-white text-gray-600 rounded-full 
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