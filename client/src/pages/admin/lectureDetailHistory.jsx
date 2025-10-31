import Card from "../../components/Card";

export default function LectureDetailHistory(){

return (
     <div className="w-full flex">
        <div className="flex-3 p-6">
        <header className="w-full flex justify-between py-4">
            <h1 className="text-2xl sm:text-2xl  font-bold tracking-tight text-gray-900 flex items-center">Subject <span className="text-[1rem]  px-3 text-gray-600"> programming</span></h1>
            <h1 className="text-2xl sm:text-2xl  font-bold tracking-tight text-gray-900 flex items-center">Lecture Date <span className="text-[1rem] px-3 text-gray-600"> 12/12/12</span></h1>
        </header>

            <section className="grid grid-cols-3 grid-rows-2 gap-8">
             <Card title="Total Students" value="152" icon={"U"} trend={5} />
      <Card title="Active Sessions" value="12" icon={"C"} trend={-2} />
      <Card title="Attendance Rate" value="89%" trend={2} />
      <Card title="Teachers" value="10" trend={0} className="col-start-1 col-end-3" />
      <Card title="Teachers" value="10" trend={0} />

            </section>

        </div>

    <div className="p-6">
      <table className="w-full bg-white rounded-lg shadow-md border border-gray-200">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-1 py-1 text-left text-sm font-semibold text-gray-700">lecture Id</th>
                <th className="px-1 py-1 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-1 py-1 text-left text-sm font-semibold text-gray-700">Subject</th>
                <th className="px-1 py-1 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* {typeof(fetch.msg) != "string" && fetch.msg.map((student) => ( */}
                <tr  className="hover:bg-gray-50 transition-colors">
                  <td className="px-1 py-1 text-gray-600">12</td>
                  <td className="px-1 py-1 text-gray-600">12/12/2025</td>
                  <td className="px-1 py-1 text-gray-600">Programming</td>
                  <td className="px-1 py-1">
                    <div className="flex gap-1 justify-center">
                      {/* {(!(student.IS_ATTENDANCE_MARKED) && new Date().toLocaleDateString() == new Date(student.SESSION_DATE).toLocaleDateString() && new Date().getTime() < new Date((new Date(student.SESSION_DATE).toLocaleDateString('en-CA') + "T"+ student.END_DATE +".000Z")).getTime() )?  */}

                      {/* (<button  */}
                      {/* onClick={()=>handleStudentForAttendance(student.SESSION_ID)} */}
                      {/* className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"> */}
                        {/* Mark Attendance */}
                      {/* </button>): */}
                      (<p className="px-6 py-4 text-gray-600">No action</p>)
                      
                      {/* } */}
                    
                    </div>
                  </td>
                </tr>
              {/* ))} */}
            </tbody>
            </table>

    </div>
    
    </div>
)


}