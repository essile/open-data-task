import React, { Component } from 'react';
import { GetDataFromDb } from './ServiceClient';
import AllDataInChart from './allDataInChart';
import OldDataTable from './OldDataTable';
import Button from 'react-bootstrap/Button';

export default class OldData extends Component {

    state = {
        oldData: [
            {
                date: '',
                sensor1: '',
                sensor2: '',
                sensor3: '',
                sensor4: '',
            }
        ],
        showTable: false
    }

    componentDidMount() {
        GetDataFromDb(response => {
            if (response.data !== undefined) {
                let FetchedOldData = response.data;
                this.sortDataByDate(FetchedOldData);
                this.setState({ oldData: FetchedOldData });
            } else {
                // error handling here
            }
        });
    }

    sortDataByDate = data => {
        data.sort(function (dateTime1, dateTime2) {
            return new Date(dateTime1.date) - new Date(dateTime2.date)
        });
    }

    showData = () => {
        this.setState({ showTable: !this.state.showTable });
    }

    render() {
        const toggleTableButton = <Button onClick={this.showData} variant="secondary">{this.state.showTable ? 'Hide table' : 'Show the data in table'}</Button>

        return (
            <div>
                {this.state.oldData.length > 1 && <AllDataInChart data={this.state.oldData} />}
                {toggleTableButton}
                {this.state.showTable &&
                    <div>
                        <OldDataTable data={this.state.oldData} />
                        <span>{toggleTableButton}</span>
                    </div>
                }
            </div>
        );
    }
}