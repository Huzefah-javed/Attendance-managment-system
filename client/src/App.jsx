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

function App (){
  const authData = useSelector(state => state.authInfo)

  function accessRoute (){
    let routes;
      if (authData.role === "ADMIN") {
   routes =  {
    path: "/teacher",
    element: <Structure sideMenu={["lectureDetails", "markAttendance"]} />,
      children:[
        {
          path: "/teacher/lecturesDetails",
          element: <LectureDetailHistory/>
        },
        {
          path: "/teacher/markAttendance",
          element: <AdminSessions/>
        },
        {
          path: "/teacher/lecturesDetails",
          element: <LectureDetailHistory/>
        }
    ]
  }
      }else{
    routes =  {
    path: "/student",
    element: <Structure sideMenu={["todaysLectureAttendance", "attendanceDetail"]}/>,
      children:[
        {
          path: "/student/todaysLectureAttendance",
          element: <CurrentStudentAttendance/>
        },
        {
          path: "/student/attendanceDetail",
          element: <AttendanceHistory/>
        }
    ]
  }

      }

      return routes
  }

const router = createBrowserRouter([
      {
        path: "/",
        element: <LoginPage/>
      },
      {
        path: "/teacherLogin",
        element: <AdminLogin/>
      },
   accessRoute()
])


return(<>

  <RouterProvider router={router}>
  </RouterProvider>
          </>)

}

export default App