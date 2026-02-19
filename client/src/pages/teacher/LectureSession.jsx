import { useState } from "react"
import { usePostData } from "../../hooks/data_post"
import { createLecSession, getStudentForAttendance, latestSessionHistory } from "../../../apis/teacher_api"
import { useFetchData } from "../../hooks/data_fetch"
import { Activity } from "react"
import StudentAttendance from "./mark_attendance"
import dataRender from "../../hooks/DataRender"
import Loader from "../../components/Loader"
import { useSelector } from "react-redux"
import {motion, AnimatePresence} from "motion/react"

function AdminSession(){
  const teacherData =  useSelector(state => state.authInfo);

const [session, setSession] = useState({
  subjectName: teacherData.subject,
  sessionHour: 0,
  sessionMin: 0,
   createdBy: teacherData.name
  })
  const [sessionId, setSessionId]  = useState(null)
  const studentsForAttendance = useFetchData(getStudentForAttendance)
const {gettingData, loading, error, msg} = usePostData(createLecSession)
let fetch = dataRender(latestSessionHistory, [])


async function handleFormSubmit(e){
  e.preventDefault()
  if (session.subjectName|| session.sessionEndTime|| session.createdBy) {
    await gettingData(session);
    fetch.refetch();
  }
}
console.log(session)
if (loading || fetch.loading) {
  return (
    <Loader/>
  )
}

if (msg || fetch.msg) {
  console.log(msg || fetch.msg)
}
if (error || fetch.error) {
  console.log(error || fetch.error)
}


function handleStudentForAttendance(sessionId){
    studentsForAttendance.gettingData(sessionId)
    setSessionId(sessionId)
}

function handleCloseAttendancePage(){
  studentsForAttendance.setMsg("")
}
  return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
  <div className=" w-full ">
    <div className=" py-4">
      <motion.h1 
      initial={{ opacity: 0, y: 50 }}   
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
        Attendance Session
      </motion.h1>
      <p className="text-sm sm:text-base text-gray-600">
        Configure a new lecture attendance session for students.
      </p>
    </div>

    <div className="w-full flex justify-around flex-col lg:flex-row items-stretch">

    <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-l-2xl flex-2 p-4  border border-gray-200 bg-white shadow-lg">
         <h1 className="text-2xl h-[10%] my-4  font-extrabold tracking-tight text-gray-900">
          Create Session
        </h1>
      <form 
          className="h-[80%]  flex flex-col justify-evenly" onSubmit={(e)=>handleFormSubmit(e)}>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 sm:gap-6">
          {/* Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 bg-white px-3 text-gray-400 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e)=>setSession((prev)=>({...prev, subjectName: e.target.value}))} disabled>
                <option value={teacherData.subject}>
                  {teacherData.subject}
                </option>
            </select>
          </div>

          {/* End Time */}
        <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Session Time Length
  </label>
  <div className="flex items-center gap-3">
    {/* Hours Dropdown */}
    <div className="flex-1">
      <select 
        name="hours" 
        id="hours"
        onChange={(e)=>(setSession((prev)=>({...prev, sessionHour: e.target.value})))} 
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-400"
      >
        <option value="" disabled selected>Hours</option>
        <option value="00">00</option>
        <option value="01">01</option>
        <option value="02">02</option>
      </select>
    </div>

    {/* Separator */}
    <span className="text-2xl font-bold text-gray-400">:</span>

    {/* Minutes Dropdown */}
    <div className="flex-1">
      <select 
        name="minutes" 
        id="minutes"
        onChange={(e)=>(setSession((prev)=>({...prev, sessionMin: e.target.value})))}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-400"
      >
        <option value="" disabled selected>Minutes</option>
        <option value="00">00</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
        <option value="55">55</option>
      </select>
    </div>
  </div>
</div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 w-full sm:mt-8">
          <button className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all">
            Make Session
          </button>
        </div>
      </form>
    </motion.div>
              <motion.div
                 initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-2  rounded-r-2xl p-4 min-h-full border border-gray-200 bg-white shadow-lg">

       <h1 className="text-2xl  my-4  font-extrabold tracking-tight text-gray-900">
        Mark attendance on sessions
      </h1>
               <table className="w-full bg-white shadow-md border border-gray-200">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-1 md:px-3 md:py-0.75 py-2 text-left text-[0.75rem] md:text-sm font-semibold text-gray-700">lecture Id</th>
                <th className="px-1 md:px-3 md:py-0.75 py-2 text-left text-[0.75rem] md:text-sm font-semibold text-gray-700">Date</th>
                <th className="px-1 md:px-3 md:py-0.75 py-2 text-left text-[0.75rem] md:text-sm font-semibold text-gray-700">Subject</th>
                <th className="px-1 md:px-3 md:py-0.75 py-2 text-center text-[0.75rem] md:text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              { fetch?.data?.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-1 md:px-3 md:py-2 py-0.75 text-[0.75rem] md:text-sm  text-gray-600">{student.SESSION_ID}</td>
                  <td className="px-1 md:px-3 md:py-2 py-0.75 text-[0.75rem] md:text-sm text-gray-600">{new Date(student.SESSION_DATE).toLocaleDateString('en-GB')}</td>
                  <td className="px-1 md:px-3 md:py-2 py-0.75 text-[0.75rem] md:text-sm  text-gray-600">{student.SUBJECT}</td>
                  <td className="px-1 md:px-3 md:py-2 py-0.75 text-[0.75rem] md:text-sm ">
                    <div className="flex gap-1 justify-center">
                      {(!(student.IS_ATTENDANCE_MARKED) && new Date().toLocaleDateString() == new Date(student.SESSION_DATE).toLocaleDateString() && new Date().getTime() < new Date((new Date(student.SESSION_DATE).toLocaleDateString('en-CA') + "T"+ student.END_DATE +".000Z")).getTime() )? 

                      (<button 
                      onClick={()=>handleStudentForAttendance(student.SESSION_ID)}
                      className="px-1 md:px-3 md:py-2 py-0.75 bg-green-500 hover:bg-green-600 text-[0.75rem] md:text-sm  text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        Mark Attendance
                      </button>):(<p className="px-1 md:px-3 md:py-2 py-0.75 text-[0.75rem] md:text-sm  text-gray-600">Unactionable</p>)}
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
              </motion.div>
    </div>
              <AnimatePresence>
  {studentsForAttendance.msg && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}   
      animate={{ opacity: 1, y: 0 }}     
      exit={{ opacity: 0, y: 50 }} 
      className="md:p-10 p-5 w-screen h-screen bg-[#00000042] fixed top-0 left-0"
    >
      <div className="p-4 bg-white rounded-t-3xl relative">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
          Attendance session id {sessionId}
        </h1>
        <button
          onClick={handleCloseAttendancePage}
          className="absolute rounded-full md:-top-4 -top-4 md:-left-4 -left-4 px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <StudentAttendance
        loading={studentsForAttendance.loading}
        error={studentsForAttendance.error}
        msg={studentsForAttendance.msg}
        setMsg={studentsForAttendance.setMsg} 
        setSession={fetch.setData}
        sessionId={sessionId}
      />
    </motion.div>
  )}
</AnimatePresence>

</div>
  
</div>

  )
}

export default AdminSession