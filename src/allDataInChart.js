import React from "react";
import { Chart, Geom, Axis, Tooltip, Legend, } from "bizcharts";
import DataSet from "@antv/data-set";
import { GetDataFromDb } from './ServiceClient';

export default class Curved extends React.Component {

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
        if (this.props.data === undefined) {
            GetDataFromDb(response => {
                this.sortDataByDate(response.data);
                dataWithLocaleDateTime = this.changeDateTimeToLocale(response.data);
                this.setState({ dataFromSensors: dataWithLocaleDateTime });
            });
        } else {
            this.sortDataByDate(this.props.data);
            dataWithLocaleDateTime = this.changeDateTimeToLocale(this.props.data);
            this.setState({ dataFromSensors: dataWithLocaleDateTime });
        }
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
            return value;
        });

        return dataWithLocaleDateTime;
    }

    render() {
        const data = this.state.dataFromSensors;
        const ds = new DataSet();
        const dv = ds.createView().source(data);

        dv.transform({
            type: "fold",
            fields: ["sensor1", "sensor2", "sensor3", "sensor4"],
            key: "sensorValue",
            value: "value"
        });

        const cols = { date: { range: [0, 1] } };

        return (
            <div>
                <p>By clicking the sensor tags on the bottom of the chart you can hide and show the lines.</p>
                <Chart height={500} data={dv} scale={cols} padding="auto" forceFit>
                    <Legend />
                    <Axis name="date"
                        visible={false} />
                    <Tooltip crosshairs={{ type: "y" }} />
                    <Geom
                        type="line"
                        position="date*value"
                        size={2}
                        color={['sensorValue', ["#2E2E2E", "#4000FF", "#298A08", "#610B5E"]]}
                        shape={"smooth"}
                    />
                    <Geom
                        type="point"
                        position="date*value"
                        size={4}
                        shape={"circle"}
                        color={['sensorValue', ["#2E2E2E", "#4000FF", "#298A08", "#610B5E"]]}
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
