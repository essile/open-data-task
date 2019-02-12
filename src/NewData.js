import React, { Component } from 'react';
import { GetNewData, SendNewSensorDataToDb } from './ServiceClient';

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
        if (this.state.data.date === '') {
            this.fetchNewestData();
        }

        this.interval = setInterval(() => {
            this.fetchNewestData();
        }, 1000 * 60 * 15);
        // }, 1000 * 15); //TEST
    }

    fetchNewestData = () => {
        GetNewData(this.props.accessToken, response => {
            let receivedData = { ...response.data };
            this.setState({ data: receivedData });
            this.sendDataToDb(receivedData);
        });
    }

    sendDataToDb = () => {
        SendNewSensorDataToDb(this.state.data, response => {
            console.log('newest data sent to the db, response:', response);
        });
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
