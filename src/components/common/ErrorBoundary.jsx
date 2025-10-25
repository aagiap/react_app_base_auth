"use client"

import React from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null })
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <Row className="w-100">
                        <Col md={6} lg={4} className="mx-auto">
                            <Card className="p-5 shadow-sm border-danger">
                                <Card.Body>
                                    <h3 className="text-danger mb-3">Something went wrong</h3>
                                    <p className="text-muted mb-4">{this.state.error?.message || "An unexpected error occurred"}</p>
                                    <Button variant="primary" onClick={this.handleReset}>
                                        Try Again
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
