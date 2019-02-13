import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

export default class NavigationBar extends Component {

    logout = () => {
        console.log('click!')
        this.props.logout();
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">Open data task</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <Button onClick={this.logout} variant="secondary">Log out</Button>
                </Nav>
            </Navbar>
        );
    }
}