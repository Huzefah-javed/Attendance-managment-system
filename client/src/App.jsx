import Sidebar from "./components/sidebar"
import AdminSessions from "./pages/teacher/LectureSession"
import AdminLogin from "./pages/teacher/adminLogin"
import UserInfo from "./components/user_info"
import LectureDetailHistory from "./pages/teacher/lectureDetailHistory"
import { LoginPage } from "./pages/student/studentLogin"
import { CurrentStudentAttendance } from "./pages/student/currentAttendance"
import { AttendanceHistory } from "./pages/student/attendanceHsitory"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useSelector } from "react-redux"
import { Structure } from "./pages/outlet"
import { ProtectionLayer } from "./pages/protection"
import { TeacherHome } from "./pages/teacher/Home"

function App (){
  const authData = useSelector(state => state.authInfo)
  
const router = createBrowserRouter([
    {
    path: "/teacher",
    element: (
      <ProtectionLayer authRole="teacher">
        <Structure sideMenu={["lecturesDetails", "markAttendance"]} />
      </ProtectionLayer>
    ),
    children: [
      { path: "/teacher/home", element: <TeacherHome /> },
      { path: "/teacher/lecturesDetails", element: <LectureDetailHistory /> ,},
      { path: "/teacher/markAttendance", element: <AdminSessions /> ,}
    ]
  },
  
  {
    path: "/student",
    element: (
      <ProtectionLayer authRole="STUDENT">
        <Structure sideMenu={["todaysLectureAttendance", "attendanceDetail"]} />
      </ProtectionLayer>
    ),
    children: [
      { path: "/student/todaysLectureAttendance", element: <CurrentStudentAttendance /> },
      { path: "/student/attendanceDetail", element: <AttendanceHistory /> }
    ]
  },

  { path: "/", element: <LoginPage /> },
  { path: "/teacherLogin", element: <AdminLogin /> }


])


return(<>

  <RouterProvider router={router}>
  </RouterProvider>
          </>)

}

export default App