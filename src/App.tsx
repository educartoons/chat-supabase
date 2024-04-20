import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import { AuthContextProvider } from "./context/auth-contex"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <AuthContextProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  )
}
