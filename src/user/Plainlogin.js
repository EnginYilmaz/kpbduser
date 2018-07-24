import React, { Component } from 'react';
import { AsyncStorage, View,Text, StatusBar } from 'react-native';
import { Header, Button, Spinner } from './common';
import LoginForm from './LoginForm.js';
import { Actions } from 'react-native-router-flux';

class Plainlogin extends Component {
  state = { loggedIn: false, oturum: false };

  async componentDidMount() {
    let oturum = await AsyncStorage.getItem('@komsudapiser:oturum');   
    console.log (oturum);
    this.setState({ 
      oturum: oturum,
    });
    if (this.state.oturum == 'basarili') {
      //Actions.mapscreen();
    }
    //Alert.alert(lat);
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
          <StatusBar hidden={true} />
          <Header headerText="Kullanıcı girişi" />
          {this.renderContent()}
        </View>
      );
  }
}

export default Plainlogin;