import Sidebar from "./components/sidebar"
import AdminStudentHistory from "./pages/admin/individualAttendanceHistory"
import AdminSessions from "./pages/admin/LectureSession"
import { AttendanceHistory } from "./pages/attendancehistory"
import { LoginPage } from "./pages/studentLogin"
import Attendance from "./pages/markAttendacePage"
import AdminLogin from "./pages/admin/adminLogin"
import UserInfo from "./components/user_info"
import StudentAttendance from "./pages/admin/mark_attendance"
import LectureDetailHistory from "./pages/admin/lectureDetailHistory"

function App (){
return(<>
            <Sidebar/>
            <UserInfo/>
            {/* <StudentAttendance/> */}
          {/* <LoginPage/> */}
          {/* <AdminLogin/> */}
          {/* <Attendance/> */}
          {/* <AttendanceHistory/> */}
          {/* <AdminSessions/> */}
          <LectureDetailHistory/>
          {/* <AdminStudentHistory/> */}
          </>)

}

export default App