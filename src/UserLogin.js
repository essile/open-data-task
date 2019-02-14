import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class UserLogin extends Component {
    onChange = () => {
        alert('Unfortunately you cannot use any other login details yet.');
    }

    render() {
        return (
            <Form onSubmit={this.props.submit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value="essi.esimerkki@gmail.com" onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value="salasana" onChange={this.onChange} />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}