import { Spinner, Container, Row, Col } from "react-bootstrap"

const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col md={12} className="text-center">
                    <Spinner animation="border" role="status" className="mb-3">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="text-muted mt-3">{message}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default LoadingSpinner
