import { useEffect, useRef, useState } from "react";
import { sessionHistory, sessionHistoryDetails } from "../../../apis/teacher_api";
import Card from "../../components/Card";
import { usePostData } from "../../hooks/data_post";
import { useCallback } from "react";

export default function LectureDetailHistory(){

const [sessionsHistoryData, setSessionHistoryData] = useState([])
const [selectedSessionId, setSelectedSessionId]= useState(-1)
const [skip, setSkip]= useState(1)
const sessions = usePostData(sessionHistory)
const sessionDetails = usePostData(sessionHistoryDetails)

const sessionsRef = useRef(null);

  const ufc=useCallback(async()=>{
  
  if(sessionsRef.current.scrollTop + sessionsRef.current.clientHeight === sessionsRef.current.scrollHeight){
    await sessions.gettingData(skip)
    
if (sessions.msg) {
   sessions.msg.map((singleSession)=>{
        setSessionHistoryData((prev)=>([...prev, singleSession]))
      })
}
    setSkip((prev)=>prev+1)
    console.log(sessions.msg)
      console.log("the skip is ",skip)
    }
  },[skip])

useEffect(()=>{
      if(sessionsHistoryData.length === 0){
        const loadData = async()=>{
          await sessions.gettingData(0)
          setSessionHistoryData(sessions.msg)
        }
        loadData()
    }
    if (sessionsRef.current) {
      
      sessionsRef.current.addEventListener('scroll',ufc)
    }
    return ()=>{
      
      if (sessionsRef.current) {
        sessionsRef.current.removeEventListener("scroll", ufc)
      }
    }

  },[sessionsRef.current, ufc])
  
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

console.log(sessions.msg)

return (
    <>
     <div className="w-full flex items-start">
        <div className="flex-3 p-6">
        <header className="w-full flex justify-between py-4 h-[10%]">
            <h1 className="text-2xl sm:text-2xl  font-bold tracking-tight text-gray-900 flex items-center">Subject <span className="text-[1rem]  px-3 text-gray-600">{sessionDetails?.msg?.subject}</span></h1>
            <h1 className="text-2xl sm:text-2xl  font-bold tracking-tight text-gray-900 flex items-center">Lecture Date <span className="text-[1rem] px-3 text-gray-600"> 12/12/12</span></h1>
        </header>

            <section className=" py-4 grid grid-cols-3 grid-rows-2 gap-8">
        <Card title="Total Students" value={sessionDetails?.msg?.total_students} />
       <Card title="Present Students" value={sessionDetails?.msg?.present_students}/>
      <Card title="Absent students" value={sessionDetails?.msg?.absent_students} />
      <Card title="Attendance graph" value="10" className="col-start-1 col-end-3" />
      <Card title="Teachers" value="10" />

            </section>

        </div>

    <div className="p-3 h-[25rem] bg-[#f1f1f1] overflow-y-scroll" ref={sessionsRef}>
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
              
                  {sessionsHistoryData && sessionsHistoryData?.map((student) => (
                  <tr key={student.SESSION_ID} className={`${student.SESSION_ID === selectedSessionId? "bg-[#000] text-white": "hover:bg-gray-50 "} transition-colors  gap-3`}>
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
    </div>
 </div>
 </>
)


}