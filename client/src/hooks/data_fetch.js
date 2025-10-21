import { useEffect } from "react"

 export function useFetchData(fetchApiFn){
    let loading = true
    let error
    let data 
    let msg;

    async function gettingData(){
        try {
            const result = await fetchApiFn();
            if (result.status == 201) {
                data = result?.data || null;
                msg = result?.msg || "request successful";
                loading = false;
                error= false;
            }else{
                loading = false;
                error= true;
                msg = result?.msg || "something went wrong";
                
            }
        } catch (error) {
            loading = false
            error= true;
            msg = result?.msg || error.message;
            
        }
        
    }
    useEffect(()=>{
        gettingData()
    }, [])

       return [loading, error, data]
}