import Sidebar from "./components/sidebar"
import AdminStudentHistory from "./pages/admin/individualAttendanceHistory"
import AdminSessions from "./pages/admin/LectureSession"
import { AttendanceHistory } from "./pages/attendancehistory"
import { LoginPage } from "./pages/studentLogin"
import Attendance from "./pages/markAttendacePage"

function App (){
return(<>
            {/* <Sidebar/> */}
          <LoginPage/>
          {/* <Attendance/> */}
          {/* <AttendanceHistory/> */}
          {/* <AdminSessions/> */}
          {/* <AdminStudentHistory/> */}
          </>)

}

export default App