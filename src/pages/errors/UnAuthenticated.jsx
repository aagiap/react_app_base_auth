import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const UnAuthenticated = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-5 shadow-sm text-center border-danger">
                        <Card.Body>
                            <h1 className="text-danger mb-3">400</h1>
                            <h3 className="mb-3">Access Denied</h3>
                            <p className="text-muted mb-4">You have to login to access this resource.</p>

                            <div className="d-flex gap-3 justify-content-center">
                                <Button as={Link} to="/login" variant="primary">
                                    Go to Login
                                </Button>
                                <Button as={Link} to="/home" variant="outline-secondary">
                                    Back to Home
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UnAuthenticated