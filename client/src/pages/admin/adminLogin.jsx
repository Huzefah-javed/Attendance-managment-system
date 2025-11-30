import { useState } from "react";
import { EmailField, PasswordField, SubmitBtn } from "../../components/inputFields";
import LoginForm from "../../components/LoginForm";
import { teacherLogin } from "../../../apis/teacher_api";
import { Link, useNavigate } from "react-router-dom";
import { addAuthData } from "../../store";
import { useDispatch } from "react-redux";

export default function AdminLogin(){
  const [data, setData] = useState({
    email:"", password:""
  })

const dispatch = useDispatch()
const navigate = useNavigate()
  async function handleLogin(e){
    e.preventDefault()
     console.log(data)
        if(data.password && data.email){
        const authData = await teacherLogin({email: data.email, password: data.password})
        console.log(authData)
        dispatch(addAuthData(authData.msg))
        navigate("/teacher/markAttendance")
        }
        
        setData({
         rollNo:"", password:""
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
        Or Login as student:
      </span>
    
      <Link
        to="/" 
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