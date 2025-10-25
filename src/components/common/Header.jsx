"use client"

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Header = () => {
    const { isAuthenticated, user, logout, isLoading } = useAuth()

    const renderAuthNav = () => {
        if (isLoading) {
            return <Nav.Link disabled>Loading...</Nav.Link>
        }

        if (isAuthenticated && user) {
            return (
                <>
                    <Nav.Link as={Link} to="/home">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/author">
                        Author Page
                    </Nav.Link>

                    {user.roles.map((r) => r.name).includes("ROLE_ADMIN") && (
                        <Nav.Link as={Link} to="/admin">
                            Admin Page
                        </Nav.Link>
                    )}

                    <NavDropdown title={`Welcome, ${user.username}`} id="basic-nav-dropdown" align="end">
                        <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </>
            )
        }

        return (
            <Nav.Link as={Link} to="/login">
                Login
            </Nav.Link>
        )
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/landing">
                    My App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">{renderAuthNav()}</Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
