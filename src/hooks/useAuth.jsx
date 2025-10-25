"use client"

import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"

/**
 * Custom hook để truy cập AuthContext.
 * @returns {{
 * user: object | null,
 * token: string | null,
 * isAuthenticated: boolean,
 * isLoading: boolean,
 * error: string | null,
 * login: (username, password) => Promise<void>,
 * logout: () => void,
 * refreshToken: () => Promise<string | null>
 * }}
 */
const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export default useAuth
