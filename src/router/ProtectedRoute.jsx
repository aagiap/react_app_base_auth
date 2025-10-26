"use client"

import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import LoadSpinner from "../components/common/LoadSprinner"
import { ROUTES } from "../config/Constant"
/**
 * Component bảo vệ route (PrivateRoute)
 * Kiểm tra:
 *  1. Token có tồn tại và còn hạn không
 *  2. Người dùng có vai trò phù hợp không
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Nội dung route cần bảo vệ.
 * @param {string[]} [props.requiredRoles=[]] - Danh sách vai trò yêu cầu (VD: ['ROLE_ADMIN']).
 */
export const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { isAuthenticated, isLoading, hasRole } = useAuth()

    if (isLoading) {
        return <LoadSpinner />
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.UNAUTHENTICATED} replace />
    }

    if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some((role) => hasRole(role))
        if (!hasRequiredRole) {
            return <Navigate to={ROUTES.UNAUTHORIZED} replace />
        }
    }

    return children
}

export default ProtectedRoute
