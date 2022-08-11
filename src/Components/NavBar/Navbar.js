import React from 'react';

import { Navbar, Nav, Container} from "react-bootstrap";

function Navigationbar() {
    return (
        <div>
            <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
                
                <Container>
                    <Navbar.Brand href="#home">Trimulabs Job Posting</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/view">View Jobs</Nav.Link>
                        <Nav.Link href="/post">Post Job</Nav.Link>
                    </Nav>
                    </Container>
            </Navbar>
        </div>
    );
}

export default Navigationbar;