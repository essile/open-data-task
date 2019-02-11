import React, { Component } from 'react';

import { GetData } from './ServiceClient';

export default class Data extends Component {

    componentDidMount() {

        // HARD CODED FOR TESTING PURPOSES
        let USER = {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsImVtYWlsIjoiZXNzaS5lc2ltZXJra2lAZ21haWwuY29tIiwiaWF0IjoxNTQ5ODc2MjE5fQ.sM4Wc7bewWXcOTGqk711LkKLz1csDCSxSsoho50MGFo",
            email: "essi.esimerkki@gmail.com",
            password: 'salasana',
            id: 44
        }

        GetData(USER, response => {
            console.log('response received', response.data)
        });
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}
