import { createContext, useContext, useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import supabase from "../utils/supabase"

type AuthContextProps =
  | {
      session: Session | null
      signIn: () => void
      isLoading: boolean
      signOut: () => void
    }
  | undefined

export const AuthContext = createContext<AuthContextProps>(undefined)

type AuthContextProviderProps = {
  children: React.ReactNode
}

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://chat-supabase-chi.vercel.app/",
      },
    })
    if (error) {
      console.error(error)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsLoading(false)
    })
    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
      setIsLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ session, signIn, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(
      "useAuthContext should be used inside of AuthContextProvider"
    )
  }
  return context
}

export { AuthContextProvider, useAuthContext }
