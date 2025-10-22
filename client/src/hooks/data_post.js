import { useEffect } from "react"
import { useState } from "react"

 export function usePostData(postApiFn){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState("")
    

    async function gettingData(data){
        try {
            setLoading(true)
            const result = await postApiFn(data);
            console.log(result)
            if (result.status == 201) {
                setMsg(result?.msg || "request successful");
                setLoading(false);
                setError(null);
            }else{
                setLoading(false);
                setError(result?.msg || "something went wrong"

                );
            }
        } catch (error) {
            setLoading(false);
            setError(error);
        }
        
    }
       return {gettingData, loading, error, msg}
}