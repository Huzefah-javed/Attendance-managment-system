import Sidebar from "./components/sidebar"
import AdminSessions from "./pages/admin/LectureSession"
import AdminLogin from "./pages/admin/adminLogin"
import UserInfo from "./components/user_info"
import LectureDetailHistory from "./pages/admin/lectureDetailHistory"
import { LoginPage } from "./pages/student/studentLogin"
import { CurrentStudentAttendance } from "./pages/student/currentAttendance"
function App (){
return(<>
            <Sidebar/>
            <UserInfo/>
            {/* <StudentAttendance/> */}
          {/* <LoginPage/> */}
          {/* <AdminLogin/> */}
          {/* <AdminSessions/> */}
          {/* <LectureDetailHistory/> */}


          <CurrentStudentAttendance/>
          </>)

}

export default App