"use client"

import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"

/**
 * Custom hook để truy cập AuthContext.
 * @returns {{
 * user: {
 * username: string,
 * roles: {id: number, name: string}[],
 * id: any
 * } | null,
 * token: string | null,
 * isAuthenticated: boolean,
 * isLoading: boolean,
 * login: (token: string) => void,
 * logout: () => void,
 * hasRole: (roleName: string) => boolean
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