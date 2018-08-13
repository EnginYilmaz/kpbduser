import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { Header, Button, Spinner } from './common';
import RegisterForm from './RegisterForm.js';
import I18n from 'ex-react-native-i18n';

class Plainregister extends Component {
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

  async saveKey(key,value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      //console.log("Error saving data" + error);
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
        return <RegisterForm latitude={this.state.latitude} longitude= {this.state.longitude} />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText={I18n.t('i18n_fill_login_information')} />
        {this.renderContent()}
      </View>
    );
  }
}

export default Plainregister;
