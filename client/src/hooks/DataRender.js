import { useCallback, useEffect, useState } from "react";


export default function dataRender(fetchFn, args){

const [loading,setLoading] = useState(false)
const [data,setData] = useState([])
const [err,setErr] = useState("")

const dataFetch = useCallback(async(argument = args)=>{
    setLoading(true)
try {
    const res = (argument.length > 0)? await fetchFn(argument) : await fetchFn();
    
    console.log("res ", res)
        if (res.status == 200||201) {
            setData(res.msg)
        }
    } catch (error) {
        setErr("problem occurs in getting data")
    }finally{
        setLoading(false)
    }
},[])


useEffect(()=>{
    dataFetch()
},[dataFetch])


return {setData, data, loading, err, refetch: dataFetch}
}