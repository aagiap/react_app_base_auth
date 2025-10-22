import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
 // Giả định useAuth được export từ AuthProvider.js

/**
 * Component bảo vệ các route, kiểm tra xác thực và quyền hạn.
 * @param {object} props
 * @param {React.ReactNode} props.children - Nội dung route cần bảo vệ.
 * @param {string[]} [props.requiredRoles=[]] - Các vai trò bắt buộc (ví dụ: ['ADMIN']).
 * @param {string} [props.redirectTo='/login'] - Trang chuyển hướng nếu chưa đăng nhập.
 */
const ProtectedRoute = ({ children, requiredRoles = [], redirectTo = '/unauthorized' }) => {
    const { user, isLoading, isAuthenticated } = useAuth();
    const location = useLocation();

    // 1. Đang tải (Chờ kiểm tra token từ Local Storage)
    if (isLoading) {
        return <div className="text-center p-10 text-gray-600">Checking access permissions...</div>;
    }

    // 2. Không xác thực (Chưa đăng nhập)
    if (!isAuthenticated) {
        // Ghi lại đường dẫn hiện tại để sau khi login xong quay lại
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // 3. Kiểm tra vai trò (Authorization)
    if (requiredRoles.length > 0 && user) {
        // Giả định user.roles.name là một Set<Rolse> được chuyển thành Array [String] ở Frontend
        // Kiểm tra xem user có bất kỳ role nào trong requiredRoles không
        const userRolesArray = Array.from(user.roles.name || []);
        const userHasRequiredRole = requiredRoles.some(role =>
            userRolesArray.includes(role)
        );

        if (!userHasRequiredRole) {
            // Chuyển hướng đến màn hình 401 khi đã đăng nhập nhưng thiếu quyền
            return <Navigate to="/unauthorized" state={{ from: location }} replace />;
        }
    }

    // 4. Cho phép truy cập
    return children;
};

export default ProtectedRoute;