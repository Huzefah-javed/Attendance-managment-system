import { useEffect, useState } from "react";


export default function dataRender(fetchFn){

const [loading,setLoading] = useState(false)
const [data,setData] = useState([])
const [err,setErr] = useState("")

useEffect(()=>{

const dataFetch = async()=>{
    setLoading(true)
    try {
        const res = await fetchFn();
        if (res.status == 200||201) {
            setData(res.msg)
        }
    } catch (error) {
        setErr("problem occurs in getting data")
    }finally{
        setLoading(false)
    }
}

    dataFetch()
},[])



return {data, loading, err}
}