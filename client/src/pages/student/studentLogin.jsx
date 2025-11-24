import { useCallback, useState } from "react"
import LoginForm from "../../components/LoginForm"
import { PasswordField, RollNoField, SubmitBtn } from "../../components/inputFields"
import { studentLogin } from "../../../apis/student_api"

export function LoginPage(){
  const [data, setData] = useState({
     rollNo:"", password:""
  })

  async function handleLogin(e){
    e.preventDefault()
    console.log(data)
    if(data.password && data.rollNo){
    await studentLogin({rollNo: data.rollNo, password: data.password})
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
      </LoginForm>
    </>
  )
}