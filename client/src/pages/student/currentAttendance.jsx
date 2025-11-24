export function CurrentStudentAttendance(){

    return(
        <div className="w-lvw p-6 flex justify-center items-center ">
            <table className="flex flex-col justify-between bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                <tr  className="hover:bg-gray-50 transition-colors ">
                  <td className="px-6 py-4 text-sm">              
                     DLD
                  </td>
                  <td className="px-6 py-4 text-[0.7rem]">10-12-1999</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2 justify-center ">
                       <span className={`inline-flex items-center rounded-full  px-2 py-1 text-[0.6rem] font-medium bg-red-100 text-red-700 ring-1 ring-red-300 w-fit`}>
        {/* {student.status === "absent"? "Absent": "Present"} */} Absent
      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">AS</td>
                </tr>
              
            </tbody>
          </table>
        </div>
    )
}