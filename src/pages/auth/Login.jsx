import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    // Sử dụng useState để lưu trữ giá trị của email và password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Hàm xử lý khi người dùng nhấn nút submit
    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn trình duyệt reload lại trang
        alert(`Login with Username: ${username} and Password: ${password}`);
        // Tại đây, bạn có thể thêm logic gọi API để xác thực người dùng
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form onSubmit={handleSubmit}>
                                {/* Form Group cho Email */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required // Bắt buộc nhập
                                    />
                                </Form.Group>

                                {/* Form Group cho Password */}
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required // Bắt buộc nhập
                                    />
                                </Form.Group>

                                {/* Nút Đăng nhập */}
                                <Button variant="primary" type="submit" className="w-100">
                                    Login
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