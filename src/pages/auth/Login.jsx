"use client"

import { useEffect, useState } from "react"
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/Constant"
import AuthApi from "../../services/api/AuthApi"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    // SỬA Ở ĐÂY: Lấy đúng các giá trị từ useAuth
    // Bỏ `roles` và thêm `user`, `isAuthenticated`
    const { login, user, isAuthenticated, isLoading } = useAuth()

    // SỬA Ở ĐÂY: Logic chuyển trang
    useEffect(() => {
        // Nếu đã đăng nhập (isAuthenticated = true và có user object)
        if (isAuthenticated && user && user.roles) {
            const roleNames = user.roles.map((r) => r.name)

            // Điều hướng dựa trên quyền
            if (roleNames.includes(ROLES.ADMIN)) {
                navigate("/admin")
            } else if (roleNames.includes(ROLES.USER)) {
                navigate("/home") // Hoặc navigate("/") tùy bạn
            }
        }
        // useEffect này sẽ chạy lại khi `isAuthenticated` hoặc `user` thay đổi
        // (tức là sau khi gọi hàm login() thành công)
    }, [isAuthenticated, user, navigate])

    const validateForm = () => {
        const errors = {}

        if (!username.trim()) {
            errors.username = "Username is required"
        } else if (username.trim().length < 3) {
            errors.username = "Username must be at least 3 characters"
        }

        if (!password) {
            errors.password = "Password is required"
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters"
        }

        return errors
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        const errors = validateForm()
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }

        setValidationErrors({})
        setLoading(true)

        try {
            const loginResponse = await AuthApi.login(username.trim(), password)
            if (loginResponse.status === "success") {
                const token = loginResponse.response.token
                login(token) // <- Hàm này sẽ trigger AuthProvider cập nhật state
                             // và useEffect ở trên sẽ tự động chạy
            } else if (loginResponse.status === "error") {
                setError(loginResponse.response)
            }
        } catch (err) {
            setError(err.message || "Login failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // `isLoading` này là của AuthProvider (kiểm tra token lúc tải trang)
    if (isLoading) {
        return (
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Checking access permissions...</p>
                </div>
            </Container>
        )
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>

                            {error && (
                                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                            if (validationErrors.username) {
                                                setValidationErrors((prev) => ({ ...prev, username: "" }))
                                            }
                                        }}
                                        isInvalid={!!validationErrors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.username}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            if (validationErrors.password) {
                                                setValidationErrors((prev) => ({ ...prev, password: "" }))
                                            }
                                        }}
                                        isInvalid={!!validationErrors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                    {loading ? "Logging in..." : "Login"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login