import { useContext, createContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
// Thay thế axios bằng logic fetch/post của bạn


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token")); // Lấy token từ local storage
    const navigate = useNavigate();

    // Hàm Đăng nhập
    const login = async (data) => {
        // --- 1. GỌI API LOGIN (VÍ DỤ GIẢ ĐỊNH) ---
        // Trong thực tế: const response = await axios.post('/api/auth/login', data);

        // Giả định BE trả về token và user data
        const fakeToken = "abc12345.jwt.token";
        const fakeUser = { id: 1, name: data.username, roles: "ADMIN" };

        setToken(fakeToken);
        setUser(fakeUser);
        localStorage.setItem("token", fakeToken);

        // Chuyển hướng sau khi đăng nhập thành công
        navigate("/dashboard");
    };

    // Hàm Đăng xuất
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    // Giá trị Context được cung cấp
    const contextValue = useMemo(
        () => ({
            user,
            token,
            login,
            logout
        }),
        [user, token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;