import { useCallback, useState } from "react"
import LoginForm from "../../components/LoginForm"
import { PasswordField, RollNoField, SubmitBtn } from "../../components/inputFields"
import { studentLogin } from "../../../apis/student_api"
import { Link, redirect, Router, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { addAuthData } from "../../store"

export function LoginPage(){
  const [data, setData] = useState({
     rollNo:"", password:""
  })
  const dispatch = useDispatch()
const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()
    console.log(data)
    if(data.password && data.rollNo){
   const authData = await studentLogin({rollNo: data.rollNo, password: data.password})
   console.log(authData)
      dispatch(addAuthData(authData.msg))
      navigate("/student/todaysLectureAttendance")
    }
    setData({
     rollNo:"", password:""
  })
  }

  return(
    <>
      <LoginForm handleLogin={handleLogin}>
           <RollNoField  onChangeData={setData} value={data.rollNo}/>
           <PasswordField onChangeData={setData} value={data.password}/>
           <SubmitBtn />
    
           <div className="text-center p-1">
      
      {/* Descriptive text */}
      <span className="text-gray-600 mr-2 sm:mr-4 text-sm sm:text-base">
        Or Login as teacher:
      </span>
    
      <Link
        to="/teacherLogin" 
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
    </div>
      </LoginForm>
    </>
  )
}