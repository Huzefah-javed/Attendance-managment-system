import { useState } from "react";
import { EmailField, PasswordField, SubmitBtn } from "../../components/inputFields";
import LoginForm from "../../components/LoginForm";

export default function AdminLogin(){
  const [data, setData] = useState({
    email:"", rollNo:"", password:""
  })

  function handleLogin(e){
    e.preventDefault()

  }
     return(
    <>
      <LoginForm handleLogin={handleLogin}>
           <EmailField  onChangeData={setData} value={data.email}/>
           <PasswordField onChangeData={setData} value={data.password}/>
           <SubmitBtn />
      </LoginForm>
    </>
  )
}