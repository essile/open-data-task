import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import history from './history';

class OldDataTable extends Component {

    state = {
        dataFromSensors: [
            {
                date: '',
                sensor1: '',
                sensor2: '',
                sensor3: '',
                sensor4: '',
            },
        ]
    }

    componentDidMount() {
        let dataWithLocaleDateTime = [];
        // if (this.props.data === undefined) {
        //     GetDataFromDb(response => {
        //         this.sortDataByDate(response.data);
        //         console.log(response.data);
        //         dataWithLocaleDateTime = this.changeDateTimeToLocale(response.data);
        //         this.setState({ dataFromSensors: dataWithLocaleDateTime });
        //     });
        // } else {
        // this.sortDataByDate(this.props.data);
        dataWithLocaleDateTime = this.changeDateTimeToLocale(this.props.data);
        this.setState({ dataFromSensors: dataWithLocaleDateTime });
        // }
    }

    sortDataByDate = data => {
        data.sort(function (dateTime1, dateTime2) {
            return new Date(dateTime1.date) - new Date(dateTime2.date)
        });
    }

    changeDateTimeToLocale = (data) => {
        const dataWithLocaleDateTime = [];

        data.map(value => {
            let data = { ...value };
            data.date = new Date(value['date']).toLocaleString();
            dataWithLocaleDateTime.push(data);
        });

        return dataWithLocaleDateTime;
    }

    showDetails = (dataItem) => {
        history.push({
            pathname: `/view/${dataItem.date}`,
            state: { dataItem }
        })
    }

    render() {
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>sensor 1</td>
                            <td>sensor 2</td>
                            <td>sensor 3</td>
                            <td>sensor 4</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dataFromSensors.map((dataItem, index) => {
                            return (
                                <tr key={index}>
                                    <td>{dataItem.date}</td>
                                    <td>{dataItem.sensor1}</td>
                                    <td>{dataItem.sensor2}</td>
                                    <td>{dataItem.sensor3}</td>
                                    <td>{dataItem.sensor4}</td>
                                    <td><Button key={index} variant='outline-secondary' onClick={() => this.showDetails(dataItem)}>show bar chart</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default OldDataTable;