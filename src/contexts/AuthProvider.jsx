"use client"

import { createContext, useState, useEffect, useCallback, useMemo } from "react"
import { jwtDecode } from "jwt-decode"
import { TOKEN_KEYS } from "../config/Constant"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    // Thêm token state (dù không dùng trực tiếp nhưng tốt cho debug)
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN))
    const [isLoading, setIsLoading] = useState(true) // Lỗi 2: State này chưa được cung cấp

    const defaultAuthState = {
        isAuthenticated: false,
        roles: null,
        username: "",
        id: null
    }

    const decodeToken = useCallback((token) => {
        const result = structuredClone(defaultAuthState)
        if (token) {
            try {
                // Sửa logic decode
                const decoded = jwtDecode(token)
                const exp = decoded.exp
                const isValid = !exp || exp > Date.now() / 1000

                if (isValid) {
                    Object.assign(result, {
                        isAuthenticated: true,
                        username: decoded.user?.username || decoded.sub || "",
                        roles: decoded.user?.roles || [],
                        // Thêm ID hoặc thông tin khác nếu cần
                        id: decoded.user?.id || null
                    })
                } else {
                    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN)
                }
            } catch (e) {
                console.error("Invalid token", e)
                localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN)
            }
        }
        return result
    }, [])

    const [authState, setAuthState] = useState(() => {
        const storedToken = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
        return decodeToken(storedToken)
    })

    const login = useCallback(
        (token) => {
            localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token)
            setToken(token) // Cập nhật state token
            setAuthState(decodeToken(token))
        },
        [decodeToken],
    )

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN)
        setToken(null) // Cập nhật state token
        setAuthState(defaultAuthState)
        window.location.replace("/home")
    }, [])

    // Bỏ useEffect cũ đi, vì logic đã được xử lý trong useState-init
    // Chỉ giữ lại
    useEffect(() => {
        setIsLoading(false)
    }, [])


    // SỬA LỖI 3: Sửa logic hàm hasRole
    const hasRole = useCallback(
        (roleName) => {
            // Sửa từ authState.user.roles thành authState.roles
            if (!authState.roles) return false
            return authState.roles.some((role) => role.name === roleName)
        },
        [authState.roles], // Sửa dependency
    )

    // SỬA LỖI 1: Tạo user object
    const user = useMemo(
        () => ({
            username: authState.username,
            roles: authState.roles,
            id: authState.id
        }),
        [authState.username, authState.roles, authState.id],
    )

    // SỬA LỖI 1 & 2: Cung cấp đúng `user` object và `isLoading` state
    const value = useMemo(
        () => ({
            isAuthenticated: authState.isAuthenticated,
            // Cung cấp user object (hoặc null nếu chưa đăng nhập)
            user: authState.isAuthenticated ? user : null,
            token, // Cung cấp token
            isLoading, // Thêm isLoading
            login,
            logout,
            hasRole,
        }),
        [authState.isAuthenticated, user, token, isLoading, login, logout, hasRole],
    )

    return <AuthContext.Provider value={value}>{isLoading ? null : children}</AuthContext.Provider>
}

export { AuthContext }
export default AuthProvider