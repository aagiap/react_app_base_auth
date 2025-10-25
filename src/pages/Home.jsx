import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const Home = () => {
    const { isAuthenticated, user } = useAuth()

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="p-5 shadow-sm text-center">
                        <Card.Body>
                            <h1 className="mb-4">Welcome to My App</h1>
                            <p className="text-muted mb-4">This is a public page. You can view this content without logging in.</p>

                            {
                                !isAuthenticated ? (
                                    <div className="d-flex gap-3 justify-content-center">
                                        <Button as={Link} to="/login" variant="primary">
                                            Login
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="mb-3">
                                        Welcome back, <strong>{user?.username}</strong>!
                                    </p>
                                )
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
