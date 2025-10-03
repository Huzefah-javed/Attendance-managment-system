import Sidebar from "./components/sidebar"
import { AttendanceHistory } from "./pages/attendancehistory"
import { LoginPage } from "./pages/loginPage"
import Attendance from "./pages/markAttendacePage"

function App (){
return(<>
            <Sidebar/>
          {/* <LoginPage/> */}
          {/* <Attendance/> */}
          <AttendanceHistory/>
          </>)

}

export default App