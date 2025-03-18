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
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  })
  const router = useRouter()

  const login = (newToken: string) => {
    // Store in localStorage for client-side access
    localStorage.setItem("auth_token", newToken)
    // Store in cookie for server-side access
    document.cookie = `auth_token=${newToken}; path=/`
    setToken(newToken)
  }

  const logout = () => {
    // Remove from localStorage
    localStorage.removeItem("auth_token")
    // Remove from cookies by setting expiration to past date
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
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
