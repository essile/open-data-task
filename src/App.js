import React, { Component } from 'react';
import UserLogin from './UserLogin';
import NewData from './NewData';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { GetAccessTokenOnLogin } from './ServiceClient';
import OldData from './OldData';

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
    this.setState({ userLoggedIn: false });
  }

  renderLoginPage = () => {
    return (<UserLogin submit={this.handleSubmit} />);
  }
  renderNewestData = () => {
    return (<NewData accessToken={this.state.user.accessToken || this.state.accessTokenInLocalStorage} />);
  }
  renderOldData = () => {
    return (< OldData />);
  }

  render() {
    console.log('user', this.state.user);
    console.log('accessTokenInLocalStorage', this.state.accessTokenInLocalStorage);
    console.log('userloggedin', this.state.userLoggedIn);

    return (
      <Container>
        <div>
          {this.state.userLoggedIn ? <div>HELLO USER <Button onClick={this.logout}>Log out</Button></div> : this.renderLoginPage()}
        </div>
        {this.state.userLoggedIn &&
          <div>
            <div>
              <h4>Newest data:</h4>
              {this.renderNewestData()}
            </div>
            <div>
              <h4>Old data:</h4>
              {this.renderOldData()}
            </div>
          </div>
        }
      </Container>
    );
  }
}