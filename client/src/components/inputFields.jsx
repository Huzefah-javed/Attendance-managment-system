export  function EmailField({onChangeData, value}){
    return(
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={value}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm outline-0 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="you@example.com"
              onChange={(e)=>onChangeData((prev)=>({...prev, email: e.target.value}))}
            />
          </div>
    )

}
export  function RollNoField({onChangeData, value}){
    return(
        <div>
            <label htmlFor="rollNol" className="block text-sm font-medium text-gray-700">
              RollNo
            </label>
            <input
              id="rollNo"
              type="text"
              value={value}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm outline-0 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="01"
              onChange={(e)=>onChangeData((prev)=>({...prev, rollNo: e.target.value}))}
            />
          </div>
    )
}

export  function PasswordField({onChangeData, value}){
    return(
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={value}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm outline-0 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="password"
              onChange={(e)=>onChangeData((prev)=>({...prev, password: e.target.value}))}
            />
          </div>
    )
}

export function SubmitBtn(){
    return (
         <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
    )
}