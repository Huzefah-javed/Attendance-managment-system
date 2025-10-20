export default function StudentAttendance() {
    
  const students = [
    { id: 1, rollNumber: "21CS001", name: "Ava Johnson", initials: "AJ" },
    { id: 2, rollNumber: "21CS002", name: "Benjamin Smith", initials: "BS" },
    { id: 3, rollNumber: "21CS003", name: "Chloe Williams", initials: "CW" },
    { id: 4, rollNumber: "21CS004", name: "David Chen", initials: "DC" },
    { id: 5, rollNumber: "21CS005", name: "Emma Davis", initials: "ED" },
    { id: 6, rollNumber: "21CS006", name: "Frank Miller", initials: "FM" },
    { id: 7, rollNumber: "21CS007", name: "Grace Martinez", initials: "GM" },
    { id: 8, rollNumber: "21CS008", name: "Henry Taylor", initials: "HT" },
    { id: 9, rollNumber: "21CS009", name: "Isabella Anderson", initials: "IA" },
    { id: 10, rollNumber: "21CS010", name: "James Thompson", initials: "JT" },
  ];

  return (
    <div className="p-4">
    <div className=" space-y-6 mb-6">
    <div className="space-y-2">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
        Create Lecture Session
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        Configure a new lecture attendance session for students.
      </p>
    </div>
    </div>
      {/* Mobile & Desktop Student List */}
      <div className="space-y-4">
        {/* Desktop Table View - Hidden on mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Roll Number</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold flex items-center justify-center text-base flex-shrink-0">
                        {student.initials}
                      </div>
                      <span className="font-semibold text-gray-900 text-base">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.rollNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 justify-center">
                      <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        Present
                      </button>
                      <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Hidden on desktop */}
        <div className="md:hidden space-y-4">
          {students.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold flex items-center justify-center text-lg flex-shrink-0">
                  {student.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg">{student.name}</h3>
                  <p className="text-sm text-gray-600">Roll: {student.rollNumber}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                  Present
                </button>
                <button className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 font-medium mb-2">Total Students</p>
            <p className="text-3xl lg:text-4xl font-bold text-gray-900">{students.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 font-medium mb-2">Present</p>
            <p className="text-3xl lg:text-4xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 font-medium mb-2">Absent</p>
            <p className="text-3xl lg:text-4xl font-bold text-red-600">0</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Save Attendance
          </button>
          <button className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}