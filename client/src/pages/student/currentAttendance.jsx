import { useEffect } from "react"
import { useFetchData } from "../../hooks/data_fetch"
import { getAttendanceDetail } from "../../../apis/student_api"

export function CurrentStudentAttendance(){
  const {loading, gettingData, msg, error} = useFetchData(getAttendanceDetail)


      useEffect(()=>{
       const fetch = async()=> await gettingData()
       fetch()
      },[])

      if (loading) {
        return <h1>Loading...</h1>
      }

      if (error) {
        console.log(error)
      }
      console.log("msg = ", msg)

    return(<>
       <h1 className="text-2xl p-6 sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
         Today's attendance detail
      </h1>
        <div className="w-lvw p-6 flex justify-center items-center ">
            <table className="w-full flex flex-col justify-between bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="flex justify-between">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(msg) && msg.map((student)=>{
               return <tr  className="hover:bg-gray-50 transition-colors flex justify-between">
                  <td className="px-6 py-4 text-sm">              
                    {student.SUBJECT}
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(student.SESSION_DATE).toLocaleDateString('en-gb')}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2 justify-center ">
                       <span className={`inline-flex items-center rounded-full  px-2 py-1 text-[0.6rem] font-medium ${student.status === 'absent' ?'bg-red-100 text-red-700 ring-1 ring-red-300':'bg-green-100 text-green-700 ring-1 ring-green-300'} w-fit`}>
                   {student.status === "absent"? "Absent": "Present"}
      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{student.IS_ATTENDANCE_MARKED? "Marked": "Unmarked"}</td>
                </tr>
                })}
              { (msg.length === 0) && (<h1 className="w-full text-center text-2xl p-6 sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">No attendance taken today</h1>)}
            </tbody>
          </table>
        </div>
      </>
    )
}