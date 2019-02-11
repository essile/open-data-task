import React, { Component } from 'react';

import { GetAccessTokenOnLogin } from './ServiceClient';

export default class UserSignup extends Component {

    state = {
        // SOME HARD CODING FOR TESTING PURPOSES
        user: {
            email: 'essi.esimerkki@gmail.com',
            password: 'salasana',
            id: 0,
            accessToken: '',
        }
    }

    componentDidMount() {
        let user = this.state.user;
        let copyOfUser = { ...this.state.user };

        GetAccessTokenOnLogin(user, response => {
            copyOfUser.accessToken = response.data.accessToken;
            copyOfUser.id = response.data.id;

            this.setState({ user: copyOfUser });
        });
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}