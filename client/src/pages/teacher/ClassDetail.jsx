import { useParams } from "react-router-dom"
import dataRender from "../../hooks/DataRender"
import { getSingleClassData } from "../../../apis/teacher_api"
import Loader from "../../components/Loader"

export function ClassDetail(){
        const { classId } = useParams()
        const classData = dataRender(getSingleClassData, [classId])
              
              if (classData.loading) {
                return <Loader/>
              }
              
              if(classData.err){
                  console.log(classData.err)
              }
              
    return (
        <div class="min-h-screen bg-gray-50 p-8">
  <div class="max-w-4xl mx-auto mb-8 flex justify-between items-end">
    <div>
      <h1 class="text-3xl font-bold text-gray-800 tracking-tight">{classData?.data?.class_name}</h1>
      <p class="text-lg text-blue-600 font-medium">{classData?.data?.subject_name}</p>
    </div>
    <div class="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-center">
      <span class="block text-2xl font-bold text-gray-900">{classData?.data?.totalStudentCount}</span>
      <span class="text-xs uppercase tracking-wider text-gray-500 font-semibold">Total Students</span>
    </div>
  </div>

  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
    <table class="w-full text-left border-collapse">
      <thead class="bg-gray-50 border-b border-gray-100">
        
        <tr>
          <th class="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Roll No.</th>
          <th class="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Student Name</th>
          <th class="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-right">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        {
          classData?.data?.students?.map((stud)=>{
            return(
              <tr class="hover:bg-blue-50 transition-colors duration-150">
          <td class="px-6 py-4 text-sm font-mono text-gray-500">{stud.roll_number}</td>
          <td class="px-6 py-4 text-sm font-medium text-gray-800">{stud.name}</td>
          <td class="px-6 py-4 text-sm text-right">
            <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
          </td>
        </tr>
            )
          })
        }
        </tbody>
    </table>
  </div>
</div>
    )
}