import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { addAuthData } from "../store";
import { getAuthData } from "../../apis/api_setup";
import { useState } from "react";
import Loader from "../components/Loader";

export function LoginRedirection(){
    

  const [loading, setLoading] = useState(true);    
  const authData = useSelector(state => state.authInfo)
const navigate = useNavigate();
const dispatch = useDispatch();

useEffect(()=>{
    const UserInfo = async ()=>{
        try {
            const data = await getAuthData()
            dispatch(addAuthData(data))
            console.log("here we go .........", data)
        } catch (error) {
            console.log("unauthorized ", error)  // notify about u have not logged in yet..........
        }finally{
            setLoading(false)
        }
    }
    UserInfo()
},[])

    useEffect(()=>{
        if (loading) return;
        console.log("here is the shit ", authData)
        if (authData.role === "teacher") {
        navigate("/teacher/assignClasses")    
    }else if(authData.role === "departmental_admin"){
        navigate("/departmental-admin/classes")    
    }else if(authData.role === "super_admin"){
        navigate("/super-admin/main")    
    }else{
        navigate("/student-login")    
    }
    },[authData,loading])

 if (loading) {
      return <Loader/>;
     }
     if(!loading){
         return (
             <div>
      {/* 🚩 This is the "Window" where StudentLogin or TeacherLogin appears */}
      <Outlet /> 
    </div>
  );
}
}