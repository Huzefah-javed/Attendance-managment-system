import { useSelector } from "react-redux";

function UserInfo(){

  const authData = useSelector(state=> state.authInfo)


    return(
      <div className="w-full h-fit p-4 flex justify-end bg-blue-50">
  <div className="min-w-0 flex flex-col md:gap-3">
    <h1 className="text-lg text-right sm:text-xl md:text-2xl font-bold tracking-tight truncate">
      {authData.name}
    </h1>
    
    <div className="flex flex-col md:flex-row items-end justify-center gap-3 lg:items-center">
        <p className=" flex justify-center items-center gap-2 text-sm sm:text-base text-gray-600 text-right  sm:text-left">
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