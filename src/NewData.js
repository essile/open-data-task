import React, { Component } from 'react';
import { Card, Table, } from 'react-bootstrap';
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
            this.setState(this.state);
        }, 1000 * 60 * 15);
    }

    fetchNewestData = () => {
        GetNewData(this.props.accessToken, response => {
            let receivedData = { ...response.data };
            this.setState({ data: receivedData });
            this.sendDataToDb(receivedData);
        });
    }

    sendDataToDb = () => {
        SendNewSensorDataToDb(this.state.data, response => {});
    }

    render() {
        return (
            <Card bg="light">
                <Card.Header>
                    <h3>Current sensor data</h3>
                    Collected {new Date(this.state.data.date).toLocaleString()}
                </Card.Header>
                <Table>
                    <tbody>
                        <tr>
                            <td>sensor1</td>
                            <td>{this.state.data.sensor1}</td>
                        </tr>
                        <tr>
                            <td>sensor2</td>
                            <td>{this.state.data.sensor2}</td>
                        </tr>
                        <tr>
                            <td>sensor3</td>
                            <td>{this.state.data.sensor3}</td>
                        </tr>
                        <tr>
                            <td>sensor4</td>
                            <td>{this.state.data.sensor4}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
        );
    }
}
