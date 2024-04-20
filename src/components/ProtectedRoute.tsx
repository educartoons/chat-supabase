import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../context/auth-contex"

export default function ProtectedRoute() {
  const { session, isLoading } = useAuthContext()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
