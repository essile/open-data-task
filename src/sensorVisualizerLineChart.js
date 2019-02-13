import React from "react";
import { Chart, Geom, Axis, Tooltip, } from "bizcharts";
import { GetDataFromDb } from './ServiceClient';
import { Button } from "react-bootstrap";
import history from './history';

export default class Basic extends React.Component {

    state = {
        sensor: this.props.match.params.no,
        filteredData: [],
        sensorMin: 0,
        sensorMax: 0
    }

    componentDidMount() {
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

            const sensorMax = Math.max.apply(Math, filteredData.map(function (o) { return o.sensorValue; }));
            const sensorMin = Math.min.apply(Math, filteredData.map(function (o) { return o.sensorValue; }));
            this.setState({ filteredData, sensorMin, sensorMax });
        });
    }

    sortDataByDate = data => {
        data.sort(function (dateTime1, dateTime2) {
            return new Date(dateTime1.date) - new Date(dateTime2.date)
        });
    }

    render() {
        console.log('visualizing the following data:', this.state);

        const data = this.state.filteredData;
        const cols = {
            sensorValue: {
                min: this.state.sensorMin,
                max: this.state.sensorMax
            },
            dateTime: {
                range: [0, 1]
            }
        };

        return (
            <div>
                <br />
                <Chart height={400} data={data} scale={cols} padding="auto" forceFit>
                    <Axis name="dateTime" visible={false} />
                    <Axis name="sensorValue" />
                    <Tooltip crosshairs={{ type: "y" }} />
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
                <div>
                    <Button variant="secondary" onClick={() => history.goBack()}>Back</Button>
                </div>
            </div>
        );
    }
}
