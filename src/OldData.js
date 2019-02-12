import React, { Component } from 'react';
import { GetDataFromDb } from './ServiceClient';

export default class OldData extends Component {

    state = {
        oldData: [],
    }

    componentDidMount() {
        GetDataFromDb(response => {
            let FetchedOldData = response.data;

            this.sortDataByDate(FetchedOldData);

            this.setState({ oldData: FetchedOldData });
        });
    }

    sortDataByDate = data => {
        data.sort(function (dateTime1, dateTime2) {
            return new Date(dateTime1.date) - new Date(dateTime2.date)
        });
    }

    render() {
        console.log('old data to render', this.state.oldData);

        return (
            <div>
                {this.state.oldData.map((dataItem, index) => {
                    return (<div key={index}>{new Date(dataItem.date).toLocaleString()}</div>)
                })}
            </div>
        );
    }
}