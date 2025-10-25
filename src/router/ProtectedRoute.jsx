"use client"

import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import LoadingSpinner from "../components/common/LoadSprinner"

/**
 * Component bảo vệ các route, kiểm tra xác thực và quyền hạn.
 * @param {object} props
 * @param {React.ReactNode} props.children - Nội dung route cần bảo vệ.
 * @param {string[]} [props.requiredRoles=[]] - Các vai trò bắt buộc (ví dụ: ['ROLE_ADMIN']).
 */
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { user, isLoading, isAuthenticated } = useAuth()
    const location = useLocation()

    // 1. Đang tải (Chờ kiểm tra token từ Local Storage)
    if (isLoading) {
        return <LoadingSpinner message="Checking access permissions..." />
    }

    // 2. Không xác thực (Chưa đăng nhập)
    if (!isAuthenticated) {
        return <Navigate to="/unauthenticated" state={{ from: location }} replace />
    }

    // 3. Kiểm tra vai trò (Authorization)
    if (requiredRoles.length > 0 && user) {
        const userRolesArray = user.roles.map((role) => role.name) || []

        const userHasRequiredRole = requiredRoles.some((role) => userRolesArray.includes(role))

        if (!userHasRequiredRole) {
            return <Navigate to="/unauthorized" state={{ from: location }} replace />
        }
    }

    // 4. Cho phép truy cập
    return children
}

export default ProtectedRoute
