import React from "react";
import { Chart, Geom, Axis, Tooltip, Legend, } from "bizcharts";
import DataSet from "@antv/data-set";
import { GetDataFromDb } from './ServiceClient';

export default class Curved extends React.Component {

    state = {
        filteredData: [
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
                console.log(response.data);
                dataWithLocaleDateTime = this.changeDateTimeToLocale(response.data);
                this.setState({ filteredData: dataWithLocaleDateTime });
            });
        } else {
            this.sortDataByDate(this.props.data);
            dataWithLocaleDateTime = this.changeDateTimeToLocale(this.props.data);
            this.setState({ filteredData: dataWithLocaleDateTime });
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
        });

        return dataWithLocaleDateTime;
    }

    render() {
        console.log('data to be rendered', this.state.filteredData);

        const data = this.state.filteredData;
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
                <Chart height={400} data={dv} scale={cols} forceFit>
                    <Legend />
                    <Axis name="date" />
                    <Axis
                        name="value"
                        label={{ formatter: val => `${val}` }}
                    />
                    <Tooltip crosshairs={{ type: "y" }} />
                    <Geom
                        type="line"
                        position="date*value"
                        size={2}
                        color={"sensorValue"}
                        shape={"smooth"}
                    />
                    <Geom
                        type="point"
                        position="date*value"
                        size={4}
                        shape={"circle"}
                        color={"sensorValue"}
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
