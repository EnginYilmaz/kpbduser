import React, { Component } from 'react';
import { Alert, AsyncStorage, View } from 'react-native';
import { Header, Button, Spinner } from './common';
import HesabimForm from './HesabimForm.js';
import {Scene, Router, Actions } from 'react-native-router-flux';
//import { RNCamera } from 'react-native-camera';


class Hesabim extends Component {
  state = { latitude: null, longitude: null, loggedIn: false };
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.saveKey('@komsudapiser:lat', (position.coords.latitude));
        this.saveKey('@komsudapiser:lng', (position.coords.longitude));
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  async saveKey(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error saving data" + error);
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
        return <HesabimForm userpicture={this.props.userpicture}/>;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Bilgilerinizi güncelleyiniz" />
        {this.renderContent()}
      </View>
    );
  }
}

export default Hesabim;