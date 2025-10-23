import React, { useState } from 'react';
// 1. Import thêm Alert để hiển thị lỗi
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import useAuth from "../../hooks/useAuth";
import {Navigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // 3. Lấy hàm 'login' từ Context
    const { login, isAuthenticated, user } = useAuth();

    // 4. Thêm state để xử lý loading và lỗi
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // LOGIC ĐIỀU HƯỚNG NẰM Ở ĐÂY (TRONG RENDER)
    if (isAuthenticated && user) {
        // Nếu đã đăng nhập, React sẽ render component <Navigate>
        const userRolesArray = Array.from(user.roles.name || []);

        if (userRolesArray.includes("ROLE_ADMIN")) {
            return <Navigate to="/admin" replace />;
        }
        else if (userRolesArray.includes("ROLE_USER")) {
            return <Navigate to="/home" replace />;
        }
        else {
            return <Navigate to="/landing" replace />;
        }
    }

    // 5. Cập nhật hàm handleSubmit
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn trình duyệt reload
        setError(null); // Xóa lỗi cũ
        setLoading(true); // Bắt đầu loading

        try {
            // Gọi hàm login từ context
            await login(username, password);
        } catch (err) {
            // Bắt lỗi (từ API hoặc lỗi mạng) và hiển thị
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false); // Dừng loading
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>

                            {/* 6. Hiển thị thông báo lỗi nếu có */}
                            {error && (
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                {/* ... (Form.Group cho Username giữ nguyên) ... */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* ... (Form.Group cho Password giữ nguyên) ... */}
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* 7. Vô hiệu hóa nút khi đang 'loading' */}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={loading} // Thêm dòng này
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;