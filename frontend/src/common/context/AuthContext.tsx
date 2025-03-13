"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if there's a token in localStorage when the app loads
    const storedToken = localStorage.getItem("auth_token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const login = (newToken: string) => {
    localStorage.setItem("auth_token", newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setToken(null)
    router.push("/auth")
  }

  const value = {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
