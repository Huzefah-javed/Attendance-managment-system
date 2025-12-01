import { useDispatch, useSelector } from "react-redux"
import { getAuthData } from "../../apis/api_setup"
import { addAuthData } from "../store"
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function ProtectionLayer({children, authRole}){

    
  const [loading, setLoading] = useState(true);
    const authData = useSelector(state => state.authInfo);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if (!authData.name || !authData.role) {
            const UserInfo = async ()=>{
                    const data = await getAuthData()
                    dispatch(addAuthData(data))
                    setLoading(false);
                }
                UserInfo()
            }
            },[])

              if (loading) {
    return <div>Loading...</div>;
  }

if (!authData.name && authData.role !== authRole) {
    return <Navigate to="/" replace/>
}

    return children


}