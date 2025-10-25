"use client"

import { useState } from "react"
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap"
import useAuth from "../../hooks/useAuth"
import { Navigate, useLocation } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({})

    const { login, isAuthenticated, user, isLoading } = useAuth()
    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
            await login(username, password)
        } catch (err) {
            setError(err.message || "Login failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

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

    if (isAuthenticated && user) {
        const from = location.state?.from?.pathname
        const userRoles = user.roles.map((r) => r.name)
        const homePath = userRoles.includes("ROLE_ADMIN") ? "/admin" : "/home"
        return <Navigate to={from || homePath} replace />
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
                                        disabled={loading}
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
                                        disabled={loading}
                                        isInvalid={!!validationErrors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                    {loading ? "Logging in..." : "Login"}
                                </Button>
                            </Form>

                            <div className="mt-4 p-3 bg-light rounded">
                                <small className="text-muted">
                                    <strong>Demo Credentials:</strong>
                                    <br />
                                    Admin: admin / admin123
                                    <br />
                                    User: user / user123
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
