import { Link } from "react-router-dom"
import { EmailField, PasswordField, SubmitBtn } from "../../components/inputFields"
import LoginForm from "../../components/LoginForm"
import { useState } from "react"
import { departmentHeadLogin } from "../../../apis/departmentHead_api"
import { useFetchData } from "../../hooks/data_fetch"
import { superAdminLogin } from "../../../apis/superAdmin"

export function AdminLogin(){
    const [data, setData] = useState({
     email:"", password:""
  })

const login = useFetchData(superAdminLogin)

  async function handleLogin(e){
    e.preventDefault()
    if(data.password && data.email){
    await login.gettingData([data.email, data.password])
   console.log(login.msg)
    }
    setData({
     email:"", password:""
  })
  }

  return(
    <>
      <LoginForm handleLogin={handleLogin}>
           <EmailField  onChangeData={setData} value={data.email}/>
           <PasswordField onChangeData={setData} value={data.password}/>
           <SubmitBtn />
    
           <div className="text-center p-1">
      
      {/* Descriptive text */}
      <span className="text-gray-600 mr-2 sm:mr-4 text-sm sm:text-base">
        Or Login as teacher :
      </span>
    
      <Link
        to="/teacher-login" 
        className="
          text-indigo-600           
          hover:text-indigo-800
          font-semibold      
          transition-colors           
          border-b-2                  
          border-indigo-500     
          hover:border-indigo-700  
          pb-0.5                      
        "
      >
        Teacher
      </Link>
      
      <span className="text-gray-600 mr-2 sm:mr-4 text-sm sm:text-base">
              Or Login as department head :
            </span>
          
            <Link
              to="/department-head-Login" 
              className="
                text-indigo-600           
                hover:text-indigo-800
                font-semibold      
                transition-colors           
                border-b-2                  
                border-indigo-500     
                hover:border-indigo-700  
                pb-0.5                      
              "
            >
              Department head
            </Link>
      <span className="text-gray-600 mr-2 sm:mr-4 text-sm sm:text-base">
        Or Login as student :
      </span>
      <Link
        to="/student-login" 
        className="
          text-indigo-600           
          hover:text-indigo-800
          font-semibold      
          transition-colors           
          border-b-2                  
          border-indigo-500     
          hover:border-indigo-700  
          pb-0.5                      
        "
      >
        Student
      </Link>
    </div>
      </LoginForm>
    </>
  )
}