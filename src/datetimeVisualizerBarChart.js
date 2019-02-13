import React from "react";
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from "bizcharts";

export default class Basiccolumn extends React.Component {

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
        const data = this.props.location.state.dataItem;
        this.setState({ data });
    }

    render() {
        console.log('data to be visualized:', this.state.data);
        const data = [
            {
                sensor: 'sensor1',
                value: this.state.data.sensor1
            },
            {
                sensor: 'sensor2',
                value: this.state.data.sensor2
            },
            {
                sensor: 'sensor3',
                value: this.state.data.sensor3
            },
            {
                sensor: 'sensor4',
                value: this.state.data.sensor4
            }
        ];
        const cols = {
            value: {
                tickInterval: 20
            }
        };
        return (
            <div>
                <Chart height={400} data={data} scale={cols} >
                    <Axis name="sensor" />
                    <Axis name="value" />
                    {/* <Tooltip crosshairs={{ type: "y" }}/> */}
                    <Geom type="interval" position="sensor*value" />
                </Chart>
            </div>
        );
    }
}