import React, { Component } from 'react';
import UserLogin from './UserLogin';
import NewData from './NewData';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { GetAccessTokenOnLogin } from './ServiceClient';
import OldData from './OldData';
import history from './history';
import NavigationBar from './NavigationBar';
import { Jumbotron, Row, Col } from 'react-bootstrap';

export default class App extends Component {

  state = {
    userLoggedIn: false,
    accessTokenInLocalStorage: localStorage.getItem('accessToken'),
    user: {
      email: '',
      password: '',
      id: 0,
      accessToken: '',
    }
  }

  componentDidMount() {
    let validAccessTokenExists =
      (this.state.accessTokenInLocalStorage !== null
        && this.state.accessTokenInLocalStorage !== undefined);

    if (!validAccessTokenExists) {
      localStorage.removeItem('accessToken');
    }
    if (validAccessTokenExists) {
      this.setState({ userLoggedIn: true });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    let userWithEmailAndPw = { ...this.state.user };
    let formData = event.target;

    userWithEmailAndPw.email = formData.email.value;
    userWithEmailAndPw.password = formData.password.value;

    this.setState({ user: userWithEmailAndPw });
    this.GetAccessToken(userWithEmailAndPw);
  }

  GetAccessToken = user => {
    GetAccessTokenOnLogin(user, response => {
      let userWithToken = { ...this.state.user };

      userWithToken.accessToken = response.data.accessToken;
      userWithToken.id = response.data.id;

      if (userWithToken.accessToken !== undefined) {
        localStorage.setItem('accessToken', response.data.accessToken);

        this.setState({
          user: userWithToken,
          accessTokenInLocalStorage: response.data.accessToken,
          userLoggedIn: true
        });
      } else {
        alert('login failed.');
      }
    });
  }

  logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('showTable');
    this.setState({ userLoggedIn: false });
  }

  renderLoginPage = () => {
    return (
      <Container>
        <br />
        <Jumbotron>
          <h2>Hello user!</h2>
          <p>Please login by typing the email address and the password visible on the fields.</p>
        </Jumbotron>
        <UserLogin submit={this.handleSubmit} />
      </Container>
    );
  }
  renderNewestData = () => {
    return (<NewData accessToken={this.state.user.accessToken || this.state.accessTokenInLocalStorage} />);
  }
  renderOldData = () => {
    return (< OldData />);
  }

  showSensorData = (sensorNumber) => {
    history.push(`/sensor/${sensorNumber}`);
  }

  render() {
    return (
      <div>
        {this.state.userLoggedIn ? <NavigationBar logout={this.logout} /> : this.renderLoginPage()}
        <Container>
          <div>
            <br />
          </div>
          {this.state.userLoggedIn &&
            <div>
              <Row>
                <Col md='8' style={{ textAlign: 'center' }}>
                  <Col>
                    <h2>Welcome user!</h2>
                    <p>Here you can view data visualization of the data collected from four sensors.</p>
                    <p>You find current sensor data fetched from the data provider, history of each sensor in a line chart,
                      all sensor data in one chart and also easily readable in a table.
                      You can also see the data from each hour in a bar chart if you click a button on a table row.</p>
                  </Col>
                  <Col>
                    <br />
                    <h4>Sensors:</h4>
                    <p>View a line chart of the data of a sensor by clicking</p>
                    <Button onClick={() => this.showSensorData(1)} variant="secondary">Sensor1</Button>{' '}
                    <Button onClick={() => this.showSensorData(2)} variant="secondary">Sensor2</Button>{' '}
                    <Button onClick={() => this.showSensorData(3)} variant="secondary">Sensor3</Button>{' '}
                    <Button onClick={() => this.showSensorData(4)} variant="secondary">Sensor4</Button>{' '}
                  </Col>
                </Col>
                <Col md='4'>
                  {this.renderNewestData()}
                </Col>
              </Row>
              <hr />
              <div>
                <h3>Data history</h3>
                {this.renderOldData()}
              </div>
              <hr />
            </div>
          }
        </Container>
      </div>
    );
  }
}