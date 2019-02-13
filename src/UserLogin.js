import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class UserLogin extends Component {
    render() {
        return (
            <Form onSubmit={this.props.submit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="essi.esimerkki@gmail.com" />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="salasana" />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}