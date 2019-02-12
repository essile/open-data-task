import React, { Component } from 'react';
import { GetDataFromDb } from './ServiceClient';
import Button from 'react-bootstrap/Button';
import history from './history';

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

    showDetails = (dataItem) => {
        // history.push(`/view/${dataItem.date}`, dataItem);
        history.push({
            pathname: `/view/${dataItem.date}`,
            state: { dataItem }
          })
    }

    render() {
        console.log('old data to render', this.state.oldData);

        return (
            <div>
                {this.state.oldData.map((dataItem, index) => {
                    return (<Button key={index} onClick={() => this.showDetails(dataItem)}>{new Date(dataItem.date).toLocaleString()}</Button>)
                })}
            </div>
        );
    }
}