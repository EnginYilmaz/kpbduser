import React, { Component } from 'react';
import { Alert, Platform, Image, AsyncStorage, View } from 'react-native';
import { Header, Button, Spinner } from './common';
import RegisterForm from './RegisterForm.js';
import I18n from 'ex-react-native-i18n';
import { Constants, Location, Permissions } from 'expo';

I18n.initAsync();

if ( I18n.locale== 'en') {
  register= 'Sign up';
} else if (I18n.locale == 'tr') {
  register= 'Kaydol';
}

class Plainregister extends Component {
  static navigationOptions = {
    drawerLabel: register,
    drawerIcon: ({ tintColor }) => (
    <Image
      style={{ width: 30,height: 30}}
      source={require('../../assets/clipboard.png')}
    />
    ),
  }
  state = { latitude:null, longitude:null, loggedIn: false };
  componentDidMount = () => {
  }
  componentWillMount () {
    I18n.initAsync();
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    //Alert.alert(location+'')
    this.setState({ latitude: location.latitude, longitude: location.longitude });
  
  };
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
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default Plainregister;
