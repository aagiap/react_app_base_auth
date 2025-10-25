import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Unauthorized = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-5 shadow-sm text-center border-danger">
                        <Card.Body>
                            <h1 className="text-danger mb-3">403</h1>
                            <h3 className="mb-3">Access Denied</h3>
                            <p className="text-muted mb-4">You don't have permission to access this resource.</p>
                            <Button as={Link} to="/home" variant="primary">
                                Go to Home
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Unauthorized
