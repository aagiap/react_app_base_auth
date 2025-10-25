"use client"
import { Container, Row, Col, Card, Table } from "react-bootstrap"
import useAuth from "../hooks/useAuth"

const MustAdmin = () => {
    const { user } = useAuth()

    return (
        <Container className="py-5">
            <Row>
                <Col md={12}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-dark text-white">
                            <h3 className="mb-0">Admin Dashboard</h3>
                        </Card.Header>
                        <Card.Body>
                            <p className="text-muted mb-4">
                                Welcome, <strong>{user?.username}</strong>! You have admin access.
                            </p>

                            <h5 className="mb-3">Admin Information:</h5>
                            <Table striped bordered hover>
                                <tbody>
                                <tr>
                                    <td>
                                        <strong>Username</strong>
                                    </td>
                                    <td>{user?.username}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Roles</strong>
                                    </td>
                                    <td>{user?.roles?.map((r) => r.name).join(", ")}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>User ID</strong>
                                    </td>
                                    <td>{user?.id || "N/A"}</td>
                                </tr>
                                </tbody>
                            </Table>

                            <div className="mt-4 p-3 bg-light rounded">
                                <h6>Admin Features:</h6>
                                <ul className="mb-0">
                                    <li>Manage users</li>
                                    <li>View system logs</li>
                                    <li>Configure settings</li>
                                    <li>Generate reports</li>
                                </ul>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default MustAdmin
