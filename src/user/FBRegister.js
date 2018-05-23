import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './common';
import FBRegisterForm from './FBRegisterForm.js';

class FBRegister extends Component {
  state = { latitude:null, longitude:null, loggedIn: false };
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
        	let tmp_lat = position.coords.latitude;
        	let tmp_lng = position.coords.longitude;
          this.saveKey('@komsudapiser:lat',(tmp_lat.toString()));
          this.saveKey('@komsudapiser:lng', (tmp_lng.toString()));         
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

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button>
            Log Out
          </Button>
        );
      case false:
        return <FBRegisterForm latitude={this.state.latitude} longitude= {this.state.longitude} />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Bilgilerinizi giriniz" />
        {this.renderContent()}
      </View>
    );
  }
}

export default FBRegister;
