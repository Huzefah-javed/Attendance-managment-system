import { useEffect, useState } from "react"
import { getAttendanceHistory } from "../../../apis/student_api"
import { usePostData } from "../../hooks/data_post"

export function AttendanceHistory (){

    const [subject, setSubject] = useState("")
    const {msg, loading, gettingData, error} = usePostData(getAttendanceHistory)


    async function handleCheckHistory(){
      if (subject) {
        await gettingData(subject)
      }
    }
        


    console.log("message is : ",msg)

        return(<>
       <h1 className="text-2xl p-6 sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
         Attendance History
      </h1>

             <div className="w-full">
      <div className="w-full flex justify-between p-4 sm:p-6 lg:p-8">
       
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={(e)=>setSubject(e.target.value)}>
              {["OOP", "DLD", "POM", "DBMS", "EW"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        
          <div className="mt-6 sm:mt-8">
          <button
             onClick={handleCheckHistory}
             className="w-full sm:w-auto sm:min-w-[200px] inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all">
              check history
          </button>
        </div>


            </div>
          </div>


        <div className="w-lvw p-6 flex justify-center items-center ">
            <table className="w-full flex flex-col justify-between bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="flex justify-evenly">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Start time</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">End time</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(msg) && msg.map((student)=>{
               return <tr  className="hover:bg-gray-50 transition-colors flex justify-evenly">
                  <td className="px-6 py-4 text-sm">{new Date(student.SESSION_DATE).toLocaleDateString('en-gb')}</td>
                  <td className="px-6 py-4 text-sm">              
                    {student.START_DATE.slice(0,5)}
                  </td>
                  <td className="px-6 py-4 text-sm">              
                    {student.END_DATE.slice(0,5)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2 justify-center ">
                       <span className={`inline-flex items-center rounded-full  px-2 py-1 text-[0.6rem] font-medium ${student.status === 'absent' ?'bg-red-100 text-red-700 ring-1 ring-red-300':'bg-green-100 text-green-700 ring-1 ring-green-300'} w-fit`}>
                   {student.status === "absent"? "Absent": "Present"}
      </span>
                    </div>
                  </td>
                  </tr>
                })}
              { (msg.length === 0) && (<h1 className="w-full text-center text-2xl p-6 sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">No attendance taken today</h1>)}
            </tbody>
          </table>
        </div>
      </>
    )

}