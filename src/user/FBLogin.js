import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './common';
import LoginForm from './FBLoginForm.js';

class Plainlogin extends Component {
  state = { loggedIn: false };

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Kullanıcı girişi" />
        {this.renderContent()}
      </View>
    );
  }
}

export default Plainlogin;
