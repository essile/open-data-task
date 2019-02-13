import React from "react";
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import { GetDataFromDb } from './ServiceClient';

export default class Basic extends React.Component {

    state = {
        sensor: this.props.match.params.no,
        filteredData: [],
    }

    componentDidMount() {
        console.log('visualizing sensor:', this.state.sensor);
        GetDataFromDb(response => {

            let FetchedOldData = response.data;
            let filteredData = [];

            this.sortDataByDate(FetchedOldData);

            FetchedOldData.map(value => {
                let dateTime = value['date'];
                dateTime = new Date(dateTime).toLocaleString();

                let sensorValue = value[`sensor${this.state.sensor}`];
                filteredData.push({ dateTime, sensorValue });
            })

            console.log('array', filteredData);
            console.log('array max', Math.max.apply(Math, filteredData.map(function(o) { return o.sensorValue; })));
            console.log('array min', Math.min.apply(Math, filteredData.map(function(o) { return o.sensorValue; })));
            this.setState({ filteredData });
        });
    }

    sortDataByDate = data => {
        data.sort(function (dateTime1, dateTime2) {
            return new Date(dateTime1.date) - new Date(dateTime2.date)
        });
    }

    render() {
        console.log('visualizing the following data:', this.state.filteredData);
        const maxValue = Math.max.apply(Math, this.state.filteredData.map(function(o) { return o.sensorValue; }))
        const minValue = Math.min.apply(Math, this.state.filteredData.map(function(o) { return o.sensorValue; }))

        const data = this.state.filteredData;
        const cols = {
            sensorValue: {
                min: -20
            },
            dateTime: {
                range: [0, 1]
            }
        };

        return (
            <div>
                <Chart height={400} data={data} scale={cols} forceFit>
                    <Axis name="dateTime" />
                    <Axis name="sensorValue" />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line" position="dateTime*sensorValue" size={2} />
                    <Geom
                        type="point"
                        position="dateTime*sensorValue"
                        size={4}
                        shape={"circle"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                </Chart>
            </div>
        );
    }
}
