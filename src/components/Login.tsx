import { useAuthContext } from "../context/auth-contex"
import Input from "./Input"

export default function Login() {
  const { signIn } = useAuthContext()

  return (
    <div>
      <div className="mt-6">
        <h2 className="font-semibold text-xl text-center">
          Sign in to your account
        </h2>
      </div>
      <div className="w-[400px] h-[340px] bg-white rounded-lg shadow-lg mt-6 p-4">
        <div className="mb-3">
          <Input name="Username" placeholder="Username" />
        </div>
        <div>
          <Input name="Password" placeholder="Password" type="password" />
        </div>
        <div className="mt-4 mb-7">
          <button className="w-full py-2 bg-indigo-700 rounded-md text-white text-sm font-semibold">
            Sign in
          </button>
        </div>
        <p className="text-sm font-semibold text-center">Or continue with:</p>
        <div className="mt-4">
          <button
            onClick={signIn}
            className="w-full border border-stone-200 py-2 bg-white shadow-md rounded-md text-black text-sm font-semibold"
          >
            GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
