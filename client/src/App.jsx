import Sidebar from "./components/sidebar"
import AdminSessions from "./pages/admin/LectureSession"
import AdminLogin from "./pages/admin/adminLogin"
import UserInfo from "./components/user_info"
import LectureDetailHistory from "./pages/admin/lectureDetailHistory"
import { LoginPage } from "./pages/student/studentLogin"
import { CurrentStudentAttendance } from "./pages/student/currentAttendance"
import { AttendanceHistory } from "./pages/student/attendanceHsitory"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useSelector } from "react-redux"
import { Structure } from "./pages/outlet"
import { ProtectionLayer } from "./pages/protection"

function App (){
  const authData = useSelector(state => state.authInfo)
  
const router = createBrowserRouter([
    {
    path: "/teacher",
    element: (
      <ProtectionLayer authRole="ADMIN">
        <Structure sideMenu={["lecturesDetails", "markAttendance"]} />
      </ProtectionLayer>
    ),
    children: [
      { path: "/teacher/lecturesDetails", element: <LectureDetailHistory /> },
      { path: "/teacher/markAttendance", element: <AdminSessions /> }
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