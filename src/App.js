import React, { Component } from 'react';
import UserLogin from './UserLogin';
import NewData from './NewData';
import Container from 'react-bootstrap/Container';

import { GetAccessTokenOnLogin } from './ServiceClient';

class App extends Component {

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
    console.log('token alussa', this.state.accessTokenInLocalStorage);
    if (this.state.accessTokenInLocalStorage !== null) {
      this.setState({ userLoggedIn: true });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    let userWithEmailAndPw = { ...this.state.user };
    userWithEmailAndPw.email = event.target.email.value;
    userWithEmailAndPw.password = event.target.password.value;
    this.setState({ user: userWithEmailAndPw });
    this.GetAccessToken(userWithEmailAndPw);
  }

  GetAccessToken = (user) => {
    GetAccessTokenOnLogin(user, response => {
      let userWithToken = { ...this.state.user };
      userWithToken.accessToken = response.data.accessToken;
      userWithToken.id = response.data.id;

      localStorage.setItem('accessToken', response.data.accessToken);

      this.setState({
        user: userWithToken,
        accessTokenInLocalStorage: response.data.accessToken,
        userLoggedIn: true
      });
    });
  }

  renderData = () => {
    return (<NewData accessToken={this.state.user.accessToken || this.state.accessTokenInLocalStorage} />)
  }

  render() {
    console.log('uuseri renderissa', this.state.user);
    console.log('token', this.state.accessTokenInLocalStorage);
    return (
      <Container>
        {this.state.accessTokenInLocalStorage === null ? <UserLogin submit={this.handleSubmit} /> : <div>HELLO USER</div>}
        {this.state.userLoggedIn && this.renderData()}
      </Container>
    );
  }
}

export default App;
