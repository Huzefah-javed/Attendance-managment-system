import { useEffect } from "react"
import { useState } from "react"

 export function useFetchData(fetchApiFn){
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)
    
    async function gettingData(...args){
        try {
            setLoading(true)
            const result = await fetchApiFn(...args);
            if (result.status == 200 || result.statusCode == 200) {
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

       return {gettingData, setMsg, loading, error, msg}
}