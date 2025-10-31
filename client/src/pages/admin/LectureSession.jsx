import { useState } from "react"
import { usePostData } from "../../hooks/data_post"
import { createLecSession, getStudentForAttendance, sessionHistory } from "../../../apis/teacher_api"
import { useFetchData } from "../../hooks/data_fetch"
import { Activity } from "react"
import StudentAttendance from "./mark_attendance"

function AdminSession(){

const [session, setSession] = useState({
  subjectName: "",
  sessionHour: 0,
  sessionMin: 0,
   createdBy: "John"
})
const [sessionId, setSessionId]  = useState(null)
  const studentsForAttendance = useFetchData(getStudentForAttendance)
const {gettingData, loading, error, msg} = usePostData(createLecSession)
const fetch = useFetchData(sessionHistory)

function handleFormSubmit(e){
  e.preventDefault()
  if (session.subjectName|| session.sessionEndTime|| session.createdBy) {
    gettingData(session);
  }
}
console.log(session)
if (loading || fetch.loading) {
  return (
    <p>Loading....</p>
  )
}


if (msg || fetch.msg) {
  console.log(msg || fetch.msg)
}
if (error || fetch.error) {
  console.log(error || fetch.error)
}

function handleLoadSessions(){
  fetch.gettingData()
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
  <div className="mx-auto w-full max-w-5xl space-y-6">
    <div className="space-y-2">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
        Create Lecture Session
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        Configure a new lecture attendance session for students.
      </p>
    </div>

    <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-lg">
      <form className="p-4 sm:p-6 lg:p-8" onSubmit={(e)=>handleFormSubmit(e)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={(e)=>setSession((prev)=>({...prev, subjectName: e.target.value}))}>
              {["OOP", "DLD", "Data Structures", "Database Systems"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
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
        <div className="mt-6 sm:mt-8">
          <button className="w-full sm:w-auto sm:min-w-[200px] inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all">
            Make Session
          </button>
        </div>
      </form>
    </div>
        <div className="w-full flex justify-between">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
        Last 10 sessions details
      </h1>
       <button 
           onClick={handleLoadSessions}
           className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              Refresh sessions history
        </button>
        </div>
               <table className="w-full bg-white rounded-lg shadow-md border border-gray-200">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">lecture Id</th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">Subject</th>
                <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {typeof(fetch.msg) != "string" && fetch.msg.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2 text-gray-600">{student.SESSION_ID}</td>
                  <td className="px-3 py-2 text-gray-600">{new Date(student.SESSION_DATE).toLocaleDateString('en-GB')}</td>
                  <td className="px-3 py-2 text-gray-600">{student.SUBJECT}</td>
                  <td className="px-1 py-1">
                    <div className="flex gap-1 justify-center">
                      {(!(student.IS_ATTENDANCE_MARKED) && new Date().toLocaleDateString() == new Date(student.SESSION_DATE).toLocaleDateString() && new Date().getTime() < new Date((new Date(student.SESSION_DATE).toLocaleDateString('en-CA') + "T"+ student.END_DATE +".000Z")).getTime() )? 

                      (<button 
                      onClick={()=>handleStudentForAttendance(student.SESSION_ID)}
                      className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        Mark Attendance
                      </button>):(<p className="px-6 py-4 text-gray-600">No action can be performed</p>)}
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>

  <div hidden={!studentsForAttendance.msg} className={`p-10 w-screen bg-[#00000042] absolute ${studentsForAttendance.msg? "top-0":"top-full"} left-0  transition-all duration-200`}>
    <button
    onClick={handleCloseAttendancePage}
    className="absolute top-15 right-13 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">close</button>
  <StudentAttendance 
    loading={studentsForAttendance.loading}
    error={studentsForAttendance.error}
    msg={studentsForAttendance.msg}
    sessionId={sessionId}
    />
    </div>
  </div>
  
</div>

  )
}

export default AdminSession