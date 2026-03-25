import Sidebar from "./components/sidebar"
import AdminSessions from "./pages/teacher/LectureSession"
import UserInfo from "./components/user_info"
import LectureDetailHistory from "./pages/teacher/lectureDetailHistory"
import { StudentLogin } from "./pages/student/studentLogin"
import { CurrentStudentAttendance } from "./pages/student/currentAttendance"
import { AttendanceHistory } from "./pages/student/attendanceHsitory"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { useSelector } from "react-redux"
import { Structure } from "./utility/outlet"
import { ProtectionLayer } from "./utility/protection"
import { TeacherHome } from "./pages/teacher/Home"
import { ClassDetail } from "./pages/teacher/ClassDetail"
import TeacherLogin from "./pages/teacher/teacherLogin"
import { LoginRedirection } from "./utility/loginRedirect"
import { DepartmentalAdminLogin } from "./pages/department_admin/departmentalAdminLogin"
import { ClassesData } from "./pages/department_admin/ClassesData"
import CreateClass from "./pages/department_admin/ClassCreation"
import { ManageClasses } from "./pages/department_admin/ManageClasses"
import { RegisteringStudents } from "./pages/department_admin/RegisterStudents"
import { FacultyManagement } from "./pages/department_admin/FacultyManagement"
import { AdminLogin } from "./pages/super_admin/AdminLogin"
import { InstitutionDepartments } from "./pages/super_admin/InstitutionDepartments"

function App (){
  
const router = createBrowserRouter([
    {
    path: "/teacher",
    element: (
      <ProtectionLayer authRole="teacher">
        <Structure sideMenu={["lecturesDetails", "markAttendance"]} />
      </ProtectionLayer>
    ),
    children: [
      { path: "/teacher/assignClasses", element: <TeacherHome /> },
      { path: "/teacher/assignClasses/:classId/:subjectId", element: <ClassDetail /> },
      { path: "/teacher/attendanceHistory/:classId/:subjectId", element: <LectureDetailHistory /> ,},
      { path: "/teacher/markAttendance/:classId/:subjectId", element: <AdminSessions /> ,}
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
  {
    path: "/departmental_admin",
    element: (
      <ProtectionLayer authRole="departmental_admin">
        <Structure sideMenu={['classes', 'manage-classes', 'register-student', 'register-teacher']} />
      </ProtectionLayer>
    ),
    children: [
      { path: "/departmental_admin/classes", element: <ClassesData /> },
      { path: "/departmental_admin/manage-classes", element: <ManageClasses /> },
      { path: "/departmental_admin/register-student", element: <RegisteringStudents /> },
      { path: "/departmental_admin/register-teacher", element: <FacultyManagement /> },
      ]
  },
  {
    path: "/super_admin",
    element: (
      <ProtectionLayer authRole="super_admin">
        <Structure sideMenu={['classes', 'manage-classes', 'register-student', 'register-teacher']} />
      </ProtectionLayer>
    ),
    children: [
        {path:"/super_admin/departments", element:<InstitutionDepartments/>}
      ]
  },

  { 
    path: "/", 
    element:<LoginRedirection/>,
    children:[
      { path: "/teacher-login", element: <TeacherLogin /> },
      { path: "/student-login", element: <StudentLogin /> },
      { path: "/department-head-Login", element: <DepartmentalAdminLogin /> },
      { path: "/superAdminLogin", element: <AdminLogin /> },
    ]
   },


])


return(<>

  <RouterProvider router={router}>
  </RouterProvider>
          </>)

}

export default App