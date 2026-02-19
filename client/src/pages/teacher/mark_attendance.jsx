import { useState } from "react";
import { createLecSession, getStudentForAttendance, markingAttendance } from "../../../apis/teacher_api";
import { usePostData } from "../../hooks/data_post";

export default function StudentAttendance({loading, error, msg,setMsg ,sessionId, setSession}) {
  const [presentStudents, setPresentStudents] = useState([])

  const postData = usePostData(markingAttendance) 

if (loading || postData.loading) {
  return <h1>Loading...</h1>
}

if(error || postData.error){
  console.log(error)
}

function handleAbsentStudent(studentId){
    if (presentStudents.includes(studentId)) {
    setPresentStudents((prev)=>(
      prev.filter((studId)=>{
          return studentId !== studId
      })
    ))
  }
    setMsg((prev)=>(
    prev.map((student)=>{
      return  student.id === studentId? {...student, curStatus: "absent"} : student
      })
    ))
}

function handlePresentStudent(studentId){
  
  if (!presentStudents.includes(studentId)) {
    setPresentStudents((prev)=>([...prev, studentId]))
    setMsg((prev)=>(
    prev.map((student)=>{
      return  student.id === studentId? {...student, curStatus: "present"} : student
      })
    ))
    }
    
  }
  


async function handleAttendance(){
  postData.gettingData(sessionId ,presentStudents)
  setSession((prev)=>(
    prev.map((singleSession)=>{
      return singleSession.SESSION_ID === sessionId? {...singleSession, IS_ATTENDANCE_MARKED: true}: singleSession
    })
  ))
  
    setMsg("")
}
  return (
    <div className="p-4  rounded-b-3xl bg-white max-h-[92%] overflow-y-scroll">
  
      {/* Mobile & Desktop Student List */}
      <div className="space-y-4">
        {/* Desktop Table View - Hidden on mobile */}
        <div className="hidden md:block">
      {typeof(msg) === "string"? (<h1 className="h-40 flex justify-center items-center font-bold text-2xl ">{msg}</h1>): ""}
          <table className="w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Roll Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">CurStatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {typeof(msg) != "string" && msg.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold flex items-center justify-center text-base flex-shrink-0">
                        {student.STUDENT_NAME.slice(0, 1)}
                      </div>
                      <span className="font-semibold text-gray-900 text-base">{student.STUDENT_NAME}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.STUDENT_ROLLNO}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(student.SESSION_DATE).toLocaleDateString('en-GB')}</td>
                  <td className="px-6 py-4 text-gray-600">{student.subject}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 justify-center">
                    

                        <button 
                        onClick={()=>handlePresentStudent(student.id)} 
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        Present
                      </button>
                      <button 
                        onClick={()=>handleAbsentStudent(student.id)} 
                      className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        Absent
                      </button>


                    </div>
                  </td>
                  <td className="px-6 py-4">
                         <span className={`inline-flex  items-center rounded-full px-3 py-1 ${student.curStatus === "absent"?'bg-red-100 text-red-700 ring-red-300': student.curStatus === "present"?'bg-green-100 text-green-700 ring-green-300':"bg-blue-100 text-blue-700 ring-blue-300 "} text-xs sm:text-sm font-medium  ring-1 w-fit`}>
                          {student.curStatus?student.curStatus:"Unmark"}
                           </span>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Hidden on desktop */}
        <div className="md:hidden space-y-4">
          {typeof(msg) != "string" && msg.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
              <div className="flex items-start gap-4 mb-4">
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg">{student.STUDENT_NAME}</h3>
                  <p className="text-sm text-gray-600">Roll: {student.STUDENT_ROLLNO}</p>
                  <div className="text-sm text-gray-600">
                      Current Attendance status: &nbsp;
                      <span className={`inline-flex  items-center rounded-full px-3 py-1 ${student.curStatus === "absent"?'bg-red-100 text-red-700 ring-red-300': student.curStatus === "present"?'bg-green-100 text-green-700 ring-green-300':"bg-blue-100 text-blue-700 ring-blue-300 "} text-xs sm:text-sm font-medium  ring-1 w-fit`}>
                          {student.curStatus?student.curStatus:"Unmark"}
                           </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                 onClick={()=>handlePresentStudent(student.id)}
                 className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                  Present
                </button>
                <button
                onClick={()=>handleAbsentStudent(student.id)} 
                className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
             onClick={handleAttendance}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Save Attendance
          </button>
          
        </div>
      </div>
    </div>
  );
}