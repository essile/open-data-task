import React from "react";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import { Container, Card, Button } from "react-bootstrap";
import history from './history';

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
                tickInterval: 10
            }
        };
        return (
            <Container>
                <br />
                <Card style={{ width: '34rem' }}>
                    <Card.Body>
                        <h3>Data collected: {this.state.data.date}</h3>
                        <Chart height={800} data={data} scale={cols} padding="auto" >
                            <Axis name="sensor" />
                            <Axis name="value" />
                            <Tooltip />
                            <Geom type="interval" position="sensor*value" color="#2E2E2E"/>
                        </Chart>
                    </Card.Body>
                </Card>
                <div>
                    <Button variant="secondary" onClick={() => history.goBack()}>Back</Button>
                </div>
            </Container>
        );
    }
}