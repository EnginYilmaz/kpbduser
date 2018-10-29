import React, { Component } from 'react';
import { AsyncStorage, View, StatusBar } from 'react-native';
import { Header, Button, Spinner } from './common';
import LoginForm from './LoginForm.js';
import I18n from 'ex-react-native-i18n';

class Plainlogin extends Component {
  state = { loggedIn: false, oturum: false };

  async componentDidMount() {
    let oturum = await AsyncStorage.getItem('@komsudapiser:oturum');   
    //console.log (oturum);
    this.setState({ 
      oturum: oturum,
    });
    if (this.state.oturum == 'basarili') {
    }
  }

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
          
          <Header headerText={I18n.t('i18n_user_login_information')} />
          {this.renderContent()}
        </View>
      );
  }
}

export default Plainlogin;