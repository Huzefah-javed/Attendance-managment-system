


export default function LoginForm({ handleLogin, children }) {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-500">Log in to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e)=>handleLogin(e)}>
            {children}
        </form>

        
      </div>
    </div>
  );
}
