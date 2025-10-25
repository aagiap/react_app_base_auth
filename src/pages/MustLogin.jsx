"use client"
import { Container, Row, Col, Card } from "react-bootstrap"
import useAuth from "../hooks/useAuth"

const MustLogin = () => {
    const { user } = useAuth()

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="p-5 shadow-sm">
                        <Card.Body>
                            <h1 className="mb-4">Author Page</h1>
                            <p className="text-muted mb-4">
                                Welcome, <strong>{user?.username}</strong>!
                            </p>
                            <p>This is a protected page that only authenticated users can access.</p>
                            <div className="mt-4">
                                <h5>Your Information:</h5>
                                <ul>
                                    <li>
                                        <strong>Username:</strong> {user?.username}
                                    </li>
                                    <li>
                                        <strong>Roles:</strong> {user?.roles?.map((r) => r.name).join(", ")}
                                    </li>
                                </ul>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default MustLogin
