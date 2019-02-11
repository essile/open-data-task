import React, { Component } from 'react';
import { GetDataFromDb } from './ServiceClient';

class OldData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            oldData: [],
        }
    }

    componentDidMount() {
        console.log('didm', this.state.oldData)

        GetDataFromDb(response => {
            let FetchedOldData = response.data;

            this.sortDataByDate(FetchedOldData);
            console.log('saatiin vanha data:', FetchedOldData);

            this.setState({ oldData: FetchedOldData });
        });
    }

    sortDataByDate = (data) => {
        data.sort(function (dateTime1, dateTime2) {
            return new Date(dateTime1.date) - new Date(dateTime2.date)
        });
    }

    render() {
        console.log('state renderiss:', this.state.oldData)
        return (
            <div>
                {this.state.oldData.map((dataItem, index) => {
                    return (<div key={index}>{new Date(dataItem.date).toLocaleString()}</div>)
                })}
            </div>
        );
    }
}

export default OldData;