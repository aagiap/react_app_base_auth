import { Container, Row, Col, Card, Button } from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import {ROLES} from "../../config/Constant";

const Error = () => {
    const navigate = useNavigate();

    // SỬA Ở ĐÂY: Dùng `hasRole` thay vì `authorities`
    const { hasRole } = useAuth();


    const toHomePage = () => {
        // SỬA Ở ĐÂY: Dùng hàm `hasRole` để kiểm tra
        if (hasRole(ROLES.ADMIN)) {
            navigate("/admin");
        } else {
            navigate("/home"); // Điều hướng về home cho an toàn
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-5 shadow-sm text-center border-danger">
                        <Card.Body>
                            <h1 className="text-danger mb-3">403</h1>
                            <h3 className="mb-3">There is an error</h3>
                            <p className="text-muted mb-4"></p>

                            <div className="d-flex gap-3 justify-content-center">
                                <Button variant="primary" onClick={() => navigate(-1)}>
                                    Go to Previous Page
                                </Button>
                                {/* SỬA Ở ĐÂY: Sửa lại hàm onClick */}
                                <Button variant="outline-secondary" onClick={toHomePage}>
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

export default Error