import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth"; // Đảm bảo đường dẫn này đúng
import "bootstrap/dist/css/bootstrap.min.css";


const Header = () => {
    // Lấy các state và hàm cần thiết từ AuthProvider
    // user: là thông tin cơ bản có từ lúc login
    // isAuthenticated: cờ báo đã đăng nhập
    // token: dùng để gọi API profile
    // profile: hàm gọi API
    // logout: hàm đăng xuất
    const { isAuthenticated, user, logout, profile, token } = useAuth();

    // State riêng của Header để lưu profile đầy đủ (fullName, email,...)
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect sẽ chạy khi component được tải
    // hoặc khi trạng thái đăng nhập (isAuthenticated, token) thay đổi
    useEffect(() => {
        const fetchProfile = async () => {
            // Chỉ fetch khi:
            // 1. Đã đăng nhập (isAuthenticated)
            // 2. Có token
            // 3. Chưa có dữ liệu profile (tránh gọi API liên tục)
            if (isAuthenticated && token && !profileData) {
                setLoading(true);
                setError(null);
                try {
                    // Gọi hàm profile từ AuthProvider
                    const apiResponse = await profile(token);

                    // Dựa trên cấu trúc ApiResponse BE của bạn
                    if (apiResponse && apiResponse.response) {
                        // Lưu data (GetProfileResponse) vào state của Header
                        setProfileData(apiResponse.response);
                    } else {
                        throw new Error(apiResponse.message || "Failed to parse profile data");
                    }
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else if (!isAuthenticated) {
                // Nếu người dùng logout, xóa dữ liệu profile
                setProfileData(null);
                setError(null);
            }
        };

        fetchProfile();

        // Phụ thuộc vào các giá trị này
        // Thêm profileData vào để tránh gọi lại lặp vô hạn
    }, [isAuthenticated, token, profile, profileData]);

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: '#2c3e50',
            color: 'white'
        }}>
            {/* Tiêu đề trang, luôn hiển thị */}
            <h2>
                <a href="/landing" style={{color: 'white', textDecoration: 'none'}}>
                    My App
                </a>
            </h2>

            {/* Điều hướng và thông tin User */}
            <nav>
                {/* Trường hợp 1: Đang tải profile */}
                {loading && <span>Loading profile...</span>}

                {/* Trường hợp 2: Lỗi khi tải profile */}
                {error && <span style={{color: '#e74c3c'}}>Failed to load profile</span>}

                {/* Trường hợp 3: Đã đăng nhập VÀ có profileData */}
                {!loading && isAuthenticated && profileData && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span>
                            Welcome, {profileData.fullName || profileData.username}
                        </span>
                        <button onClick={logout} style={{marginLeft: '1rem'}}>
                            Logout
                        </button>
                    </div>
                )}

                {/* Trường hợp 4: Đã đăng nhập (có `user` từ login) NHƯNG profileData CHƯA tải xong */}
                {!loading && isAuthenticated && !profileData && user && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span>
                            Welcome, {user.username}
                        </span>
                        <button onClick={logout} style={{marginLeft: '1rem'}}>
                            Logout
                        </button>
                    </div>
                )}

                {/* Trường hợp 5: Chưa đăng nhập */}
                {!isAuthenticated && !loading && (
                    <a href="/login" style={{color: 'white', textDecoration: 'none'}}>
                        Login
                    </a>
                )}
            </nav>
        </header>
    );
}

export default Header;