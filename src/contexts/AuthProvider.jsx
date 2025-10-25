"use client"

import { createContext, useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { TOKEN_KEYS, API_ENDPOINTS, API_BASE_URL } from "../config/Constant"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN) || null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    const refreshToken = useCallback(async () => {
        try {
            const refreshTokenValue = localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN)
            if (!refreshTokenValue) {
                throw new Error("No refresh token available")
            }

            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshTokenValue}`,
                },
            })

            if (!response.ok) {
                throw new Error("Token refresh failed")
            }

            const data = await response.json()
            if (data.status === "success" && data.response.token) {
                const newToken = data.response.token
                localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, newToken)
                setToken(newToken)
                return newToken
            }
        } catch (err) {
            console.error("Refresh token error:", err)
            logout()
            return null
        }
    }, [])

    const login = async (username, password) => {
        setError(null)
        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Login failed")
            }

            const data = await response.json()

            if (data.status === "success" && data.response.token) {
                const newToken = data.response.token
                const decodedToken = jwtDecode(newToken)
                const userData = decodedToken.user

                localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, newToken)
                if (data.response.refreshToken) {
                    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, data.response.refreshToken)
                }

                setToken(newToken)
                setUser(userData)

                const userRoles = userData.roles.map((role) => role.name)
                const targetPath = location.state?.from?.pathname || null

                if (targetPath) {
                    navigate(targetPath, { replace: true })
                    return
                }

                if (userRoles.includes("ROLE_ADMIN")) {
                    navigate("/admin", { replace: true })
                } else if (userRoles.includes("ROLE_USER")) {
                    navigate("/home", { replace: true })
                } else {
                    navigate("/home", { replace: true })
                }
            } else {
                throw new Error("Invalid login response structure")
            }
        } catch (err) {
            setError(err.message)
            throw err
        }
    }

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN)
        localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN)
        setUser(null)
        setToken(null)
        setError(null)
        navigate("/login")
    }, [navigate])

    useEffect(() => {
        const initAuth = async () => {
            setIsLoading(true)
            const storedToken = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)

            if (!storedToken) {
                setIsLoading(false)
                return
            }

            try {
                const decodedToken = jwtDecode(storedToken)
                const currentTime = Date.now() / 1000
                const timeUntilExpiry = decodedToken.exp - currentTime

                if (timeUntilExpiry < 0) {
                    logout()
                } else if (timeUntilExpiry < 300) {
                    // Token sắp hết hạn → refresh
                    const newToken = await refreshToken()
                    if (newToken) {
                        const newDecoded = jwtDecode(newToken)
                        setUser(newDecoded.user)
                    }
                } else {
                    // Token còn hạn
                    setUser(decodedToken.user)
                    setToken(storedToken)
                    setTimeout(() => refreshToken(), (timeUntilExpiry - 300) * 1000)
                }
            } catch (err) {
                console.error("Invalid token:", err)
                logout()
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [logout, refreshToken])


    const contextValue = {
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        refreshToken,
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { AuthContext }
export default AuthProvider
