import React, { Component } from 'react';
import UserLogin from './UserLogin';
import Data from './Data';
import Container from 'react-bootstrap/Container';

import { GetAccessTokenOnLogin } from './ServiceClient';

class App extends Component {

  state = {
    userLoggedIn: false,
    user: {
      email: '',
      password: '',
      id: 0,
      accessToken: '',
    }
  }

  componentDidMount() {
    console.log('alussa', this.state.user);
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

      this.setState({ user: userWithToken, userLoggedIn: true });
    });
  }

  render() {
    console.log('uuseri renderissa', this.state.user);
    return (
      <Container>
        {this.state.userLoggedIn ? <div>HELLO USER</div> :
          <UserLogin submit={this.handleSubmit} />}
        <Data />
      </Container>
    );
  }
}

export default App;
