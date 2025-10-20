import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    // Sử dụng useState để lưu trữ giá trị của email và password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Hàm xử lý khi người dùng nhấn nút submit
    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn trình duyệt reload lại trang
        alert(`Đăng nhập với Email: ${email} và Password: ${password}`);
        // Tại đây, bạn có thể thêm logic gọi API để xác thực người dùng
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Đăng Nhập</h2>
                            <Form onSubmit={handleSubmit}>
                                {/* Form Group cho Email */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Địa chỉ email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required // Bắt buộc nhập
                                    />
                                </Form.Group>

                                {/* Form Group cho Password */}
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required // Bắt buộc nhập
                                    />
                                </Form.Group>

                                {/* Nút Đăng nhập */}
                                <Button variant="primary" type="submit" className="w-100">
                                    Đăng nhập
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