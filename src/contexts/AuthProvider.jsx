import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthContext from "./AuthContext";
// Thay thế axios bằng logic fetch/post của bạn

// Định nghĩa trạng thái khởi tạo cho Context
export const initialAuthState = {
    user: null,
    token: null,
    isLoading: true,
    login: (username, password) => Promise.reject(new Error("Login function not implemented")),
    logout: () => {
    },
    isAuthenticated: false,
};

const API_BASE_URL = 'http://localhost:8080';
// Hàm để gọi API lấy thông tin user từ token
const profile = async (token) => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Gửi token lên
        }
    });

    // SỬA LẠI CHỖ NÀY
    // Dùng !response.ok để bắt lỗi HTTP (4xx, 5xx)
    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    // Trả về toàn bộ đối tượng JSON (bao gồm status, message, response)
    return await response.json();
};

export const AuthProvider = ({children}) => {
    // Khởi tạo state dựa trên token trong Local Storage
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("jwtToken"));
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Khởi tạo ban đầu: Kiểm tra token khi refresh
    useEffect(() => {
        // Giả định nếu có token thì user hợp lệ (cần gọi thêm API /validate nếu muốn chắc chắn)
        if (token) {
            // Trong môi trường thực tế, bạn sẽ cần giải mã token để lấy user info hoặc gọi API
            // Hiện tại, chúng ta giả định user đã được load ở đâu đó (hoặc load lại từ BE)
            // Để đơn giản, ta chỉ set isLoading = false
        }
        setIsLoading(false);
    }, [token]);

    // Hàm Đăng nhập - Xử lý phản hồi từ BE sử dụng FETCH API
    const login = useCallback(async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            // Xử lý lỗi HTTP (ví dụ: 404, 500)
            if (!response.ok) {
                // Ném lỗi chung nếu server không phản hồi 2xx
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse JSON response
            /** @type {import('../types/AuthTypes').ApiResponse} */
            const apiResponse = await response.json();

            // 1. Xử lý trường hợp Backend trả về lỗi nghiệp vụ (Phản hồi Status.ERROR)
            if (apiResponse.status === 'error') {
                // apiResponse.response lúc này là List<String> (các lỗi nghiệp vụ)
                // Ném lỗi với thông báo lỗi đã được nối chuỗi
                throw new Error(apiResponse.response.join(' | '));
            }

            // 2. Xử lý trường hợp thành công (Phản hồi Status.SUCCESS)
            // apiResponse.response lúc này là LoginResponse { token, user }
            const loginResponse = apiResponse.response;

            // Lưu trữ Token và User vào State & Local Storage
            localStorage.setItem('jwtToken', loginResponse.token);
            setToken(loginResponse.token);
            setUser(loginResponse.user);

            return loginResponse;

        } catch (error) {
            // Xử lý lỗi kết nối hoặc lỗi nghiệp vụ đã throw ở trên
            console.error("Login failed:", error.message);
            throw error; // Ném lỗi để component Login.jsx có thể bắt và hiển thị
        }
    }, []);

    // Hàm Đăng xuất
    const logout = useCallback(() => {
        localStorage.removeItem('jwtToken');
        setToken(null);
        setUser(null);
        navigate("/login", {replace: true});
    }, [navigate]);

    // Giá trị Context
    const contextValue = useMemo(() => ({
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!token,
        profile,
    }), [user, token, isLoading, login, logout, profile]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;
