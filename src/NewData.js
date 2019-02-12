import React, { Component } from 'react';

import { GetNewData, SendNewSensorDataToDb } from './ServiceClient';
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
        let accessToken = this.props.accessToken;

        if (this.state.data.date === '') {
            GetNewData(accessToken, response => {
                console.log('state object empty, getting data.')

                let receivedData = { ...response.data };
                this.setState({ data: receivedData })

                SendNewSensorDataToDb(receivedData, response => {
                    console.log('newest data sent to the db, response:', response);
                });
            });
        }

        this.interval = setInterval(() => {
            console.log('data visible but getting newest version.')
            GetNewData(accessToken, response => {
                let copyOfData = { ...this.state.data };

                let receivedData = response.data;
                copyOfData.date = receivedData.date;
                copyOfData.sensor1 = receivedData.sensor1;
                copyOfData.sensor2 = receivedData.sensor2;
                copyOfData.sensor3 = receivedData.sensor3;
                copyOfData.sensor4 = receivedData.sensor4;

                this.setState({ data: copyOfData })

                SendNewSensorDataToDb(copyOfData, response => {
                    console.log('newest data sent to the db, response:', response);
                });
            });
        }, 1000 * 60 * 15);
        // }, 1000 * 15); //TEST
    }

    render() {
        console.log('new data to render', this.state.data);

        return (
            <div>
                <div>date: {new Date(this.state.data.date).toLocaleString()}</div>
                <div>sensor1: {this.state.data.sensor1}</div>
                <div>sensor2: {this.state.data.sensor2}</div>
                <div>sensor3: {this.state.data.sensor3}</div>
                <div>sensor4: {this.state.data.sensor4}</div>
            </div>
        );
    }
}
