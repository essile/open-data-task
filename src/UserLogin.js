import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class UserSignup extends Component {
    render() {
        return (
            <Form onSubmit={this.props.submit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}