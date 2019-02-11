import React, { Component } from 'react';

import { GetData } from './ServiceClient';
// import { SendToDb } from './data-storage/dbClient';

export default class Data extends Component {

    state = {
        data: {
            date: '',
            sensor1: '',
            sensor2: '',
            sensor3: '',
            sensor4: '',
        }
    }

    componentDidMount() {

        // HARD CODED FOR TESTING PURPOSES
        let USER = {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsImVtYWlsIjoiZXNzaS5lc2ltZXJra2lAZ21haWwuY29tIiwiaWF0IjoxNTQ5ODc2MjE5fQ.sM4Wc7bewWXcOTGqk711LkKLz1csDCSxSsoho50MGFo",
            email: "essi.esimerkki@gmail.com",
            password: 'salasana',
            id: 44
        }

        GetData(USER, response => {
            let copyOfData = { ...this.state.data };
            console.log('response received', response.data)

            let receivedData = response.data;
            copyOfData.date = receivedData.date;
            copyOfData.sensor1 = receivedData.sensor1;
            copyOfData.sensor2 = receivedData.sensor2;
            copyOfData.sensor3 = receivedData.sensor3;
            copyOfData.sensor4 = receivedData.sensor4;

            this.setState({ data: copyOfData })
            console.log('steitti', this.state.data)

            // SendToDb(copyOfData, response => {
            //     console.log('back here');
            // })
        });
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}
