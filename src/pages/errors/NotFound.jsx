import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-5 shadow-sm text-center border-warning">
                        <Card.Body>
                            <h1 className="text-warning mb-3">404</h1>
                            <h3 className="mb-3">Page Not Found</h3>
                            <p className="text-muted mb-4">The page you're looking for doesn't exist.</p>
                            <Button as={Link} to="/landing" variant="primary">
                                Go to Landing Page
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound
