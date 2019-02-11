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
        let accessToken = this.props.user.accessToken;

        GetData(accessToken, response => {
            let copyOfData = { ...this.state.data };
            console.log('response received', response.data)

            let receivedData = response.data;
            copyOfData.date = receivedData.date;
            copyOfData.sensor1 = receivedData.sensor1;
            copyOfData.sensor2 = receivedData.sensor2;
            copyOfData.sensor3 = receivedData.sensor3;
            copyOfData.sensor4 = receivedData.sensor4;

            this.setState({ data: copyOfData })

            // SendToDb(copyOfData, response => {
            //     console.log('back here');
            // })
        });
    }

    render() {
        return (
            <div>
                <div>date: {this.state.data.date}</div>
                <div>sensor1: {this.state.data.sensor1}</div>
                <div>sensor2: {this.state.data.sensor2}</div>
                <div>sensor3: {this.state.data.sensor3}</div>
                <div>sensor4: {this.state.data.sensor4}</div>
            </div>
        );
    }
}
