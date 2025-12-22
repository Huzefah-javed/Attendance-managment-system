import { useSelector } from "react-redux";

function UserInfo(){

  const authData = useSelector(state=> state.authInfo)
  

    return(
      <div className="w-full h-fit p-2 flex justify-start bg-blue-50">
  <div className="min-w-0 flex flex-col ">
    <h1 className="text-lg text-left sm:text-xl md:text-2xl font-bold p-0 m-0 tracking-tight truncate uppercase">
      {authData.name}
    </h1>

    <div className="flex flex-row gap-2">
        <p className=" flex justify-start items-center gap-1 text-sm sm:text-base text-gray-600 text-left">
      <span className="sm:block w-1 h-1 rounded-full bg-gray-400" />
        {authData.subject}
      </p>
    
      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs sm:text-sm font-medium text-blue-700 ring-1 ring-blue-300 w-fit">
        {authData.role}
      </span>
      </div>
  </div>      
</div>
    )
}

export default UserInfo;